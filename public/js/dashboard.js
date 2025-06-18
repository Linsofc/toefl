const { jsPDF } = window.jspdf;
const historyContainer = document.getElementById('history-container');
const editModal = document.getElementById('editModal');
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = './login.html';
}

function loadUserProfile() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.querySelector('.profile-card .nama').textContent = loggedInUser.name;
        document.querySelector('.profile-card .email').textContent = loggedInUser.email;

        if (loggedInUser.avatar) {
            document.querySelector('.profile-card .avatar').src = loggedInUser.avatar;
            const certLogo = document.getElementById('certificate-template')?.querySelector('.cert-logo');
            if (certLogo) {
                certLogo.src = loggedInUser.avatar;
            }
        }
    } else {
        window.location.href = 'login.html'; 
    }
}

function loadHistory() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const userName = loggedInUser ? loggedInUser.name : '';
    const history = loggedInUser?.toeflHistory || []; 

    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>Anda belum pernah mengambil tes. Mulai tes pertama Anda sekarang!</p>';
        return;
    }

    history.slice().reverse().forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('history-card', 'animate-on-scroll');

        // Pastikan skor tidak undefined sebelum ditampilkan
        const listeningScore = result.scores?.listening?.converted || 0;
        const structureScore = result.scores?.structure?.converted || 0;
        const readingScore = result.scores?.reading?.converted || 0;

        const listeningRaw = result.scores?.listening?.raw || 0;
        const listeningTotal = result.scores?.listening?.total || 0;
        const structureRaw = result.scores?.structure?.raw || 0;
        const structureTotal = result.scores?.structure?.total || 0;
        const readingRaw = result.scores?.reading?.raw || 0;
        const readingTotal = result.scores?.reading?.total || 0;


        resultCard.innerHTML = `
            <div class="score-summary">
                <p>Skor Akhir:</p>
                <span class="final-score">${result.finalScore || 0}</span>
            </div>
            <div class="score-details">
                <p><strong><i class="fas fa-calendar-alt"></i> Tanggal Tes:</strong> ${result.date}</p>
                <ul>
                    <li><i class="fas fa-headphones"></i> Listening: ${listeningRaw}/${listeningTotal} benar (Score: ${listeningScore})</li>
                    <li><i class="fas fa-puzzle-piece"></i> Structure: ${structureRaw}/${structureTotal} benar (Score: ${structureScore})</li>
                    <li><i class="fas fa-book-open"></i> Reading: ${readingRaw}/${readingTotal} benar (Score: ${readingScore})</li>
                </ul>
                <div class="history-actions">
                    <button class="btn-certificate"
                        data-date="${result.date}"
                        data-name="${userName}"
                        data-listeningscore="${listeningScore}"
                        data-structurescore="${structureScore}"
                        data-readingscore="${readingScore}"
                        data-finalscore="${result.finalScore || 0}">
                        <i class="fas fa-download"></i> Unduh Sertifikat
                    </button>
                    <button class="btn-review" data-date="${result.date}"><i class="fas fa-search"></i> Lihat Jawaban</button>
                </div>
            </div>
        `;
        historyContainer.appendChild(resultCard);
    });

    addReviewButtonListeners();
    addCertificateButtonListeners();
}

function addCertificateButtonListeners() {
    document.querySelectorAll('.btn-certificate').forEach(button => {
        button.addEventListener('click', () => {
            console.log('button data:', button.dataset); 
            generateCertificate(button.dataset);
        });
    });
}

function addReviewButtonListeners() {
    document.querySelectorAll('.btn-review').forEach(button => {
        button.addEventListener('click', function() {
            const testDate = this.getAttribute('data-date');
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

            const specificTest = loggedInUser?.toeflHistory?.find(test => test.date === testDate);

            if (specificTest) {
                const reviewData = {
                    userAnswers: specificTest.userAnswers,
                    result: specificTest,
                };
                sessionStorage.setItem('lastTestReview', JSON.stringify(reviewData));
                window.location.href = 'pembahasan.html';
            } else {
                showNotification('Data untuk tes ini tidak ditemukan.', 'error');
            }
        });
    });
}

function generateCertificate(data) {
    document.getElementById('cert-name').innerText = data.name;
    document.getElementById('cert-date').innerText = data.date.split('pukul')[0];
    document.getElementById('cert-listening-score').innerText = data.listeningscore;
    document.getElementById('cert-structure-score').innerText = data.structurescore;
    document.getElementById('cert-reading-score').innerText = data.readingscore;
    document.getElementById('cert-final-score').innerText = data.finalscore;

    const certificateElement = document.getElementById('certificate-template');
    if (!certificateElement) {
        console.error('Error: Certificate template element not found.');
        showNotification('Gagal membuat sertifikat: template tidak ditemukan.', 'error');
        return;
    }

    html2canvas(certificateElement, { scale: 2 }).then(canvas => {
        let w = certificateElement.offsetWidth;
        let h = certificateElement.offsetHeight;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [w, h]
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, h, w);
        pdf.save(`Certificate_TOEFL_${data.name}.pdf`);
    }).catch(error => {
        console.error('Error generating certificate:', error);
        showNotification('Gagal membuat sertifikat. Terjadi kesalahan.', 'error');
    });
}

function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toast.className = 'toast';
    toastMessage.textContent = message;

    if (type === 'success') {
        toast.classList.add('success');
        toastIcon.className = 'fas fa-check-circle';
    } else {
        toast.classList.add('error');
        toastIcon.className = 'fas fa-times-circle';
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- EVENT LISTENERS ---
document.querySelector('.edit').addEventListener('click', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById("edit-name").value = loggedInUser.name;
        document.getElementById("edit-email").value = loggedInUser.email;
        const editAvatarPreview = document.getElementById("edit-avatar-preview");
        if (loggedInUser.avatar && editAvatarPreview) {
            editAvatarPreview.src = loggedInUser.avatar;
            editAvatarPreview.style.display = 'block';
        } else if (editAvatarPreview) {
            editAvatarPreview.style.display = 'none';
        }
    }
    editModal.style.display = "flex";
});

document.getElementById('editForm').addEventListener('submit', async function(e) { 
    e.preventDefault();
    const newName = document.getElementById("edit-name").value;
    const newEmail = document.getElementById("edit-email").value;
    const imageFile = document.getElementById("edit-image").files[0];

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        showNotification("Error: Tidak ada sesi login yang aktif. Silakan login kembali.", 'error');
        return;
    }

    let imageBase64 = loggedInUser.avatar || null;

    if (imageFile) {
        try {
            imageBase64 = await compressImage(imageFile, {
                quality: 0.7,
                maxWidth: 400,
                maxHeight: 400
            });
            const editAvatarPreview = document.getElementById("edit-avatar-preview");
            if (editAvatarPreview) {
                editAvatarPreview.src = imageBase64;
                editAvatarPreview.style.display = 'block';
            }
        } catch (error) {
            console.error('Error reading or compressing image file:', error);
            showNotification('Gagal memuat atau mengkompres gambar profil.', 'error');
            return;
        }
    }

    const updateData = {
        currentEmail: loggedInUser.email, 
        newName: newName,
        newEmail: newEmail,
        newAvatar: imageBase64 
    };

    try {
        const response = await fetch('/api/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.updatedUser));
            document.querySelector(".nama").textContent = newName;
            document.querySelector(".email").textContent = newEmail;
            if (data.updatedUser.avatar) {
                document.querySelector(".profile-card .avatar").src = data.updatedUser.avatar;
            } else {
                 document.querySelector(".profile-card .avatar").src = './assets/images/avatar.png';
            }

            document.getElementById("edit-image").value = '';
            editModal.style.display = "none"; 
            showNotification('Profil berhasil diperbarui!', 'success');
        } else {
            console.error('Server error response:', data);
            showNotification(data.message || 'Gagal memperbarui profil.', 'error');
        }
    } catch (error) {
        console.error('Error updating profile (network/server):', error);
        showNotification('Terjadi kesalahan saat memperbarui profil (jaringan/server).', 'error');
    }
});

async function compressImage(file, { quality = 0.8, maxWidth = 800, maxHeight = 800 } = {}) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const elem = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                resolve(ctx.canvas.toDataURL(file.type, quality));
            };
            img.onerror = error => reject(error);
        };
        reader.onerror = error => reject(error);
    });
}


document.querySelector('.out').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        sessionStorage.clear(); 
        window.location.href = './login.html';
    }
});

document.getElementById('cancelEdit').addEventListener('click', () => editModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === editModal) editModal.style.display = 'none';
});

const menu = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const faBars = document.querySelector('.hamburger .bars');
const faClose = document.querySelector('.hamburger .close');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');

    const isOpen = menu.classList.contains('open');

    if (isOpen) {
        faBars.style.display = 'none';
        faClose.style.display = 'block';
    } else {
        faBars.style.display = 'block';
        faClose.style.display = 'none';
    }
});

loadUserProfile();
loadHistory();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));