const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    errorMessage.textContent = ''; 
    errorMessage.classList.remove('show');

    if (!email || !password) {
        errorMessage.textContent = 'Email dan password tidak boleh kosong.';
        errorMessage.classList.add('show');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.type === 'success') {
            if (data.user.isAdmin === true) {
                window.location.href = '/admin.html';
            } else {
                errorMessage.textContent = 'Login berhasil, tetapi Anda bukan admin. Akses dashboard admin ditolak.';
                errorMessage.classList.add('show');
            }
        } else {
            errorMessage.textContent = data.message || 'Login gagal. Silakan coba lagi.';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Error saat login:', error);
        errorMessage.textContent = 'Terjadi kesalahan jaringan. Silakan coba lagi nanti.';
        errorMessage.classList.add('show');
    } finally {
        passwordInput.value = ''; 
    }
});
