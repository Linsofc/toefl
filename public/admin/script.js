document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari submit secara default

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Contoh validasi sederhana
    if (username === 'admin' && password === 'password123') {
        errorMessage.textContent = ''; // Kosongkan pesan error jika berhasil
        errorMessage.classList.remove('show');
        alert('Login Berhasil! Selamat datang, Admin.'); // Ganti dengan redirect ke halaman admin
        window.location.href = '../admin.html'; // Contoh redirect
    } else {
        errorMessage.textContent = 'Username atau password salah.';
        errorMessage.classList.add('show');
        usernameInput.value = ''; // Mengosongkan field
        passwordInput.value = '';
        usernameInput.focus(); // Mengarahkan fokus kembali ke username
    }
});