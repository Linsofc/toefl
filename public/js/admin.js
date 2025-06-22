const userTableBody = document.getElementById("userTableBody");
const editUserModal = document.getElementById("editUserModal");
const closeEditModalBtn = document.getElementById("closeEditModal");
const cancelEditModalBtn = document.getElementById("cancelEditModal");
const editUserForm = document.getElementById("editUserForm");
const editUserId = document.getElementById("editUserId");
const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPassword = document.getElementById("editPassword");
const editAvatarFile = document.getElementById("editAvatarFile");
const editAvatarPreview = document.getElementById("editAvatarPreview");
const editIsAdmin = document.getElementById("editIsAdmin");
const adminNameDisplay = document.getElementById("adminNameDisplay");
const adminAvatarDisplay = document.getElementById("adminAvatarDisplay");
const editAdminProfileBtn = document.getElementById("editAdminProfileBtn");
const logoutBtn = document.getElementById("logoutBtn");
const editAdminProfileModal = document.getElementById("editAdminProfileModal");
const closeEditAdminModalBtn = document.getElementById("closeEditAdminModal");
const cancelEditAdminModalBtn = document.getElementById("cancelEditAdminModal");
const editAdminProfileForm = document.getElementById("editAdminProfileForm");
const editAdminId = document.getElementById("editAdminId");
const editAdminName = document.getElementById("editAdminName");
const editAdminEmail = document.getElementById("editAdminEmail");
const editAdminPassword = document.getElementById("editAdminPassword");
const editAdminAvatarFile = document.getElementById("editAdminAvatarFile");
const editAdminAvatarPreview = document.getElementById(
    "editAdminAvatarPreview"
);
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const closeDeleteConfirmModalBtn = document.getElementById(
    "closeDeleteConfirmModal"
);
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const deleteUserNameSpan = document.getElementById("deleteUserName");
const messageBox = document.getElementById("messageBox");
const loadingOverlay = document.getElementById("loadingOverlay");

let userToDeleteId = null;
let currentAvatarBase64 = null; 
let currentAdminAvatarBase64 = null; 
let loggedInAdminData = null; 
function showMessage(message, type = "success") {
    messageBox.textContent = message;
    messageBox.className = "message-box show";
    if (type === "error") {
        messageBox.classList.add("error");
    } else {
        messageBox.classList.remove("error");
    }
    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 3000);
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.add("show");
    } else {
        loadingOverlay.classList.remove("show");
    }
}

function readFileAsBase64(file, previewElement, callback) {
    if (!file) {
        previewElement.src =
            "https://placehold.co/100x100/E2E8F0/64748B?text=No+Avatar";
        callback(null);
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        showMessage("Ukuran gambar terlalu besar! Maksimal 2MB.", "error");
        previewElement.src =
            "https://placehold.co/100x100/EF4444/FFFFFF?text=Too+Large";
        callback(null);
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewElement.src = e.target.result;
        callback(e.target.result);
    };
    reader.onerror = () => {
        showMessage("Gagal membaca file gambar.", "error");
        previewElement.src =
            "https://placehold.co/100x100/EF4444/FFFFFF?text=Error";
        callback(null);
    };
    reader.readAsDataURL(file);
}

async function fetchCurrentAdminData() {
    try {
        const response = await fetch("/api/current-user");
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to fetch current admin:", errorData.message);
            return null;
        }
        const admin = await response.json();
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        loggedInAdminData = admin?.name !== undefined ? admin : loggedInUser;
        adminNameDisplay.textContent = admin.name;
        adminAvatarDisplay.src =
            admin.avatar || "https://placehold.co/40x40/E2E8F0/64748B?text=A";
        return admin;
    } catch (error) {
        console.error("Error fetching current admin data:", error);
        return null;
    }
}

async function fetchUsers() {
    showLoading(true);
    try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Gagal mengambil data pengguna."
            );
        }
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        showMessage(error.message, "error");
        userTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 1.5rem; color: #ef4444;">Error: ${error.message}</td></tr>`;
    } finally {
        showLoading(false);
    }
}

function renderUsers(users) {
    userTableBody.innerHTML = "";
    if (users.length === 0) {
        userTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 1.5rem; color: #9ca3af;">Tidak ada pengguna ditemukan.</td></tr>`;
        return;
    }

    users.forEach((user) => {
        const row = document.createElement("tr");
        const avatarSrc =
            user.avatar || "https://placehold.co/40x40/E2E8F0/64748B?text=A";

        row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <img src="${avatarSrc}" alt="Avatar" class="w-10 h-10 rounded-full object-cover" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-accent-blue); box-shadow: var(--shadow-subtle);">
                </td>
                <td>${new Date(user.updatedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</td>
                <td>
                    ${
                        user.toeflHistory && user.toeflHistory.length > 0
                            ? `Tes terakhir: ${
                                  user.toeflHistory[
                                      user.toeflHistory.length - 1
                                  ].finalScore
                              } <br> (${user.toeflHistory.length} total)`
                            : "Belum ada tes"
                    }
                </td>
                <td class="action-buttons-cell">
                    <button class="action-btn edit" data-id="${user._id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" data-id="${
                        user._id
                    }" data-name="${user.name}">
                        <i class="fas fa-trash-alt"></i> Hapus
                    </button>
                </td>
            `;
        userTableBody.appendChild(row);
    });

    document.querySelectorAll(".action-btn.edit").forEach((button) => {
        button.addEventListener("click", (e) =>
            openEditModal(e.currentTarget.dataset.id)
        );
    });
    document.querySelectorAll(".action-btn.delete").forEach((button) => {
        button.addEventListener("click", (e) =>
            openDeleteConfirmModal(
                e.currentTarget.dataset.id,
                e.currentTarget.dataset.name
            )
        );
    });
}

async function openEditModal(userId) {
    showLoading(true);
    try {
        const response = await fetch(`/api/admin/users/${userId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    "Gagal mengambil data pengguna untuk diedit."
            );
        }
        const user = await response.json();

        editUserId.value = user._id;
        editName.value = user.name;
        editEmail.value = user.email;
        editPassword.value = ""; 
        editIsAdmin.checked = user.isAdmin || false; 

        if (user.avatar) {
            editAvatarPreview.src = user.avatar;
            currentAvatarBase64 = user.avatar;
        } else {
            editAvatarPreview.src =
                "https://placehold.co/100x100/E2E8F0/64748B?text=No+Avatar";
            currentAvatarBase64 = null;
        }
        editAvatarFile.value = "";
        editUserModal.classList.add("open");
    } catch (error) {
        console.error("Error opening edit user modal:", error);
        showMessage(error.message, "error");
    } finally {
        showLoading(false);
    }
}

function closeEditModal() {
    editUserModal.classList.remove("open");
    editUserForm.reset();
    editAvatarPreview.src =
        "https://placehold.co/100x100/E2E8F0/64748B?text=No+Avatar";
    currentAvatarBase64 = null;
    editIsAdmin.checked = false; 
}

editAvatarFile.addEventListener("change", (event) => {
    readFileAsBase64(event.target.files[0], editAvatarPreview, (base64) => {
        currentAvatarBase64 = base64;
    });
});


editUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoading(true);

    const userId = editUserId.value;
    const updatedData = {
        name: editName.value,
        email: editEmail.value,
        avatar: currentAvatarBase64,
        isAdmin: editIsAdmin.checked, 
    };

    if (editPassword.value.trim() !== "") {
        updatedData.password = editPassword.value;
    }

    try {
        const response = await fetch(`/api/admin/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Gagal memperbarui pengguna.");
        }

        const result = await response.json();
        showMessage(result.message, "success");
        closeEditModal();
        fetchUsers();
    } catch (error) {
        console.error("Error updating user:", error);
        showMessage(error.message, "error");
    } finally {
        showLoading(false);
    }
});

function openDeleteConfirmModal(userId, userName) {
    userToDeleteId = userId;
    deleteUserNameSpan.textContent = userName;
    deleteConfirmModal.classList.add("open");
}

function closeDeleteConfirmModal() {
    deleteConfirmModal.classList.remove("open");
    userToDeleteId = null;
}

confirmDeleteBtn.addEventListener("click", async () => {
    if (!userToDeleteId) return;

    showLoading(true);
    try {
        const response = await fetch(`/api/admin/users/${userToDeleteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Gagal menghapus pengguna.");
        }

        const result = await response.json();
        showMessage(result.message, "success");
        closeDeleteConfirmModal();
        fetchUsers();
    } catch (error) {
        console.error("Error deleting user:", error);
        showMessage(error.message, "error");
    } finally {
        showLoading(false);
    }
});

async function openEditAdminProfileModal() {
    if (!loggedInAdminData) {
        showMessage(
            "Data admin tidak tersedia. Silakan refresh halaman.",
            "error"
        );
        return;
    }

    editAdminId.value = loggedInAdminData._id;
    editAdminName.value = loggedInAdminData.name;
    editAdminEmail.value = loggedInAdminData.email;
    editAdminPassword.value = ""; 

    if (loggedInAdminData.avatar) {
        editAdminAvatarPreview.src = loggedInAdminData.avatar;
        currentAdminAvatarBase64 = loggedInAdminData.avatar;
    } else {
        editAdminAvatarPreview.src =
            "https://placehold.co/100x100/E2E8F0/64748B?text=A";
        currentAdminAvatarBase64 = null;
    }
    editAdminAvatarFile.value = "";

    editAdminProfileModal.classList.add("open");
}

function closeEditAdminProfileModal() {
    editAdminProfileModal.classList.remove("open");
    editAdminProfileForm.reset();
    editAdminAvatarPreview.src =
        "https://placehold.co/100x100/E2E8F0/64748B?text=A";
    currentAdminAvatarBase64 = null;
}

editAdminAvatarFile.addEventListener("change", (event) => {
    readFileAsBase64(
        event.target.files[0],
        editAdminAvatarPreview,
        (base64) => {
            currentAdminAvatarBase64 = base64;
        }
    );
});

editAdminProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoading(true);
    const updatedData = {
        currentEmail: loggedInAdminData.email,
        newName: editAdminName.value,
        newEmail: editAdminEmail.value,
        newAvatar: currentAdminAvatarBase64,
        newPassword: editAdminPassword.value, 
    };

    try {
        const response = await fetch(`/api/update-profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();

        if (response.ok && data.type === "success") {
            showMessage(data.message, "success");
            closeEditAdminProfileModal();
            await fetchCurrentAdminData();
        } else {
            throw new Error(data.message || "Gagal memperbarui profil admin.");
        }
    } catch (error) {
        console.error("Error updating admin profile:", error);
        showMessage(error.message, "error");
    } finally {
        showLoading(false);
    }
});

async function handleLogout() {
    showLoading(true);
    try {
        const response = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok && data.type === "success") {
            showMessage("Logout berhasil.", "success");
            setTimeout(() => {
                window.location.href = "/admin_login.html"; 
            }, 1000);
        } else {
            throw new Error(data.message || "Gagal logout.");
        }
    } catch (error) {
        console.error("Error during logout:", error);
        showMessage(error.message, "error");
    } finally {
        showLoading(false);
    }
}
closeEditModalBtn.addEventListener("click", closeEditModal);
cancelEditModalBtn.addEventListener("click", closeEditModal);

closeDeleteConfirmModalBtn.addEventListener("click", closeDeleteConfirmModal);
cancelDeleteBtn.addEventListener("click", closeDeleteConfirmModal);

editAdminProfileBtn.addEventListener("click", openEditAdminProfileModal);
closeEditAdminModalBtn.addEventListener("click", closeEditAdminProfileModal);
cancelEditAdminModalBtn.addEventListener("click", closeEditAdminProfileModal);

logoutBtn.addEventListener("click", handleLogout);

window.addEventListener("click", (e) => {
    if (e.target === editUserModal) {
        closeEditModal();
    }
    if (e.target === deleteConfirmModal) {
        closeDeleteConfirmModal();
    }
    if (e.target === editAdminProfileModal) {
        closeEditAdminProfileModal();
    }
});

fetchCurrentAdminData();
fetchUsers();
