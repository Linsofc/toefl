// Cek login
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = './login.html';
}

const leaderboardList = document.getElementById('leaderboard-list');
async function loadLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const users = await response.json(); 

        if (!Array.isArray(users)) {
            throw new Error('Data yang diterima dari server bukan format yang diharapkan (array pengguna).');
        }

        const leaderboardData = users.map(user => {
            if (user.toeflHistory && user.toeflHistory.length > 0) {
                const validScores = user.toeflHistory
                    .map(test => test.finalScore)
                    .filter(score => typeof score === 'number' && !isNaN(score));

                if (validScores.length > 0) {
                    const highestScore = Math.max(...validScores);
                    return {
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar || './assets/images/avatar.png',
                        highestScore: highestScore
                    };
                }
            }
            return null; 
        }).filter(data => data !== null); 

        leaderboardData.sort((a, b) => b.highestScore - a.highestScore);
        setTimeout(() => {
            leaderboardList.innerHTML = '';

            if (leaderboardData.length === 0) {
                leaderboardList.innerHTML = '<p style="text-align: center; color: #777;">Belum ada skor yang tercatat. Jadilah yang pertama!</p>';
                return;
            }

            leaderboardData.forEach((player, index) => {
                const rank = index + 1;
                const rankItem = document.createElement('div');
                rankItem.classList.add('rank-item');

                let medalIcon = '';
                if (rank === 1) medalIcon = '<i class="fas fa-medal gold"></i>'; // Tambahkan kelas untuk warna medali
                else if (rank === 2) medalIcon = '<i class="fas fa-medal silver"></i>';
                else if (rank === 3) medalIcon = '<i class="fas fa-medal bronze"></i>';

                rankItem.innerHTML = `
                    <span class="rank-number">${rank}</span>
                    <img src="${player.avatar}" alt="Avatar" class="rank-avatar">
                    <div class="rank-user">
                        <p class="user-name">${player.name}</p>
                    </div>
                    <div class="rank-score">
                        ${medalIcon}
                        <span>${player.highestScore}</span>
                    </div>
                `;

                if (rank === 1) rankItem.classList.add('rank-1');
                if (rank === 2) rankItem.classList.add('rank-2');
                if (rank === 3) rankItem.classList.add('rank-3');

                leaderboardList.appendChild(rankItem);
            });
        }, 1000)

    } catch (error) {
        console.error('Error memuat leaderboard:', error);
        leaderboardList.innerHTML = '<p style="text-align: center; color: #f00;">Gagal memuat leaderboard. Silakan coba lagi nanti.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadLeaderboard);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
});
document.querySelectorAll('.animate-on-scroll').forEach(element => observer.observe(element));


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