const container = document.getElementById("container");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

document.getElementById("register").addEventListener("click", () => container.classList.add("active"));
document.getElementById("login").addEventListener("click", () => container.classList.remove("active"));

// Registrasi
registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch('/api/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        showNotification(data.message, data.type);
        if (data.type === 'success') {
            registerForm.reset();
            container.classList.remove("active"); 
        }
    } catch (error) {
        console.error('Error during registration:', error);
        showNotification("Terjadi kesalahan saat pendaftaran.", 'error');
    }
});


document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        showNotification(data.message, data.type);
        if (data.type === 'success') {
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("loggedInUser", JSON.stringify(data.user));
            window.location.href = "./dashboard.html";
        }
    } catch (error) {
        console.error('Error during login:', error);
        showNotification("Terjadi kesalahan saat login.", 'error');
    }
});

const modal = document.getElementById("forgotPasswordModal");
const resetPasswordForm = document.getElementById("resetPasswordForm");
let emailToReset = "";

document.getElementById("forgotPasswordLink").onclick = () => modal.style.display = "block";
document.querySelector(".close-btn").onclick = () => modal.style.display = "none";

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.getElementById("findAccountBtn").addEventListener("click", async function () { 
    const email = document.getElementById("resetEmail").value;
    if (!email) {
        showNotification("Mohon masukkan email Anda.", 'error');
        return;
    }

    try {
        const response = await fetch('/api/find-account', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), 
        });
        const data = await response.json();

        showNotification(data.message, data.type);
        if (data.type === 'success') {
            emailToReset = email; 
            document.getElementById("emailCheckContainer").style.display = "none";
            document.getElementById("newPasswordContainer").style.display = "block";
        }
    } catch (error) {
        console.error('Error finding account:', error);
        showNotification("Terjadi kesalahan saat mencari akun.", 'error');
    }
});

resetPasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        showNotification("Password baru dan konfirmasi password tidak cocok.", 'error');
        return;
    }

    if (!emailToReset) {
        showNotification("Tidak ada email yang ditentukan untuk reset password.", 'error');
        return;
    }

    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailToReset, newPassword }), 
        });
        const data = await response.json();

        showNotification(data.message, data.type);
        if (data.type === 'success') {
            modal.style.display = "none";
            resetPasswordForm.reset();
            document.getElementById("emailCheckContainer").style.display = "block";
            document.getElementById("newPasswordContainer").style.display = "none";
            emailToReset = ""; 
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        showNotification("Terjadi kesalahan saat mengubah password.", 'error');
    }
});

function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toast.className = 'toast'; 
    toast.classList.add('show'); 

    toastMessage.textContent = message;

    if (type === 'success') {
        toast.classList.add('success');
        toastIcon.className = 'fas fa-check-circle'; 
    } else {
        toast.classList.add('error');
        toastIcon.className = 'fas fa-times-circle'; 
    }
    setTimeout(() => toast.classList.remove('show'), 2000);
}