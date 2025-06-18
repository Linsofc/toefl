const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Gunakan process.env.PORT untuk Vercel
require('dotenv').config(); // Opsional: untuk membaca .env file

// --- Konfigurasi MongoDB ---
// Ganti dengan connection string MongoDB Atlas Anda
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://linsofc:<db_password>@cluster0.obvnn7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Terhubung ke MongoDB Atlas'))
    .catch(err => console.error('Gagal terhubung ke MongoDB Atlas:', err));

// --- Definisi Schema dan Model Pengguna ---
// Ini akan mendefinisikan struktur dokumen pengguna di MongoDB
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    toeflHistory: [ // Array untuk menyimpan riwayat tes
        {
            date: { type: String, required: true },
            scores: { // Objek skor per bagian
                listening: { raw: Number, total: Number, converted: Number },
                structure: { raw: Number, total: Number, converted: Number },
                reading: { raw: Number, total: Number, converted: Number }
            },
            finalScore: { type: Number, required: true },
            userAnswers: { type: Object } // Menyimpan jawaban pengguna untuk ulasan
        }
    ]
}, { timestamps: true }); // Menambahkan createdAt dan updatedAt secara otomatis

const User = mongoose.model('User', userSchema); // Model 'User' akan berinteraksi dengan koleksi 'users' di MongoDB


// --- 1. Middleware Global (JSON Body Parser & URL-encoded) ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- 2. Helper Functions (getUsers, saveUsers) - TIDAK DIPERLUKAN LAGI UNTUK users.json ---
// Anda bisa menghapus fungsi getUsers dan saveUsers yang sebelumnya berinteraksi dengan fs/users.json
// karena sekarang kita akan berinteraksi langsung dengan MongoDB melalui Mongoose.
// const usersFilePath = path.join(__dirname, 'databases', 'users.json');
// function getUsers() { /* ... */ } // HAPUS INI
// function saveUsers(users) { /* ... */ } // HAPUS INI


// --- 3. DEFINISI SEMUA ENDPOINT API ANDA DI SINI ---
// Sekarang menggunakan Model 'User' untuk berinteraksi dengan MongoDB.

// Endpoint API untuk Registrasi Pengguna
app.post('/api/register', async (req, res) => { // Tambahkan 'async'
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email }); // Cari di MongoDB
        if (existingUser) {
            return res.status(409).json({ message: 'Email sudah terdaftar.', type: 'error' });
        }
        const newUser = new User({ name, email, password }); // Buat instance User baru
        await newUser.save(); // Simpan ke MongoDB
        res.status(201).json({ message: 'Pendaftaran berhasil! Silakan masuk.', type: 'success' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat pendaftaran.', type: 'error' });
    }
});

// Endpoint API untuk Login Pengguna
app.post('/api/login', async (req, res) => { // Tambahkan 'async'
    const { email, password } = req.body;
    try {
        // Cari pengguna berdasarkan email dan password
        const user = await User.findOne({ email: email, password: password }); // Cari di MongoDB
        if (user) {
            console.log(`[${new Date().toISOString()}] Login berhasil untuk pengguna: ${user.name}`);
            res.status(200).json({
                message: `Login berhasil! Selamat datang, ${user.name}`,
                user: user, // Kirim objek user lengkap dari MongoDB
                type: 'success'
            });
        } else {
            console.log(`[${new Date().toISOString()}] Login gagal: Email atau password tidak valid untuk email: ${email}`);
            res.status(401).json({ message: 'Email atau password salah.', type: 'error' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.', type: 'error' });
    }
});

// Endpoint API untuk Mencari Akun (Reset Password - Langkah 1)
app.post('/api/find-account', async (req, res) => { // Tambahkan 'async'
    const { email } = req.body;
    try {
        const userExists = await User.exists({ email: email }); // Cek keberadaan pengguna di MongoDB
        if (userExists) {
            res.status(200).json({ message: 'Akun ditemukan. Silakan masukkan password baru Anda.', type: 'success' });
        } else {
            res.status(404).json({ message: 'Email tidak ditemukan!', type: 'error' });
        }
    } catch (error) {
        console.error('Error finding account:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mencari akun.', type: 'error' });
    }
});

// Endpoint API untuk Reset Password
app.post('/api/reset-password', async (req, res) => { // Tambahkan 'async'
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOneAndUpdate( // Temukan dan perbarui di MongoDB
            { email: email },
            { $set: { password: newPassword } },
            { new: true } // Mengembalikan dokumen yang sudah diperbarui
        );
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }
        res.status(200).json({ message: 'Password berhasil diubah! Silakan login dengan password baru Anda.', type: 'success' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mereset password.', type: 'error' });
    }
});

// Endpoint API untuk Menyimpan Hasil Tes
app.post('/api/save-test-result', async (req, res) => { // Tambahkan 'async'
    const { email, testResult } = req.body;
    if (!email || !testResult) {
        return res.status(400).json({ message: 'Data yang tidak lengkap untuk menyimpan hasil tes.', type: 'error' });
    }
    try {
        const user = await User.findOneAndUpdate( // Temukan dan perbarui di MongoDB
            { email: email },
            { $push: { toeflHistory: testResult } }, // Menambahkan ke array toeflHistory
            { new: true, upsert: false } // Mengembalikan dokumen yang diperbarui
        );
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }
        res.status(200).json({
            message: 'Hasil tes berhasil disimpan!',
            type: 'success',
            updatedUser: user // Kirim objek user yang sudah diupdate dari MongoDB
        });
    } catch (error) {
        console.error('Error saving test result:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat menyimpan hasil tes.', type: 'error' });
    }
});

// Endpoint API untuk Update Profil Pengguna
app.post('/api/update-profile', async (req, res) => { // Tambahkan 'async'
    const { currentEmail, newName, newEmail, newAvatar } = req.body;
    if (!currentEmail || !newName || !newEmail) {
        return res.status(400).json({ message: 'Data yang tidak lengkap untuk memperbarui profil.', type: 'error' });
    }
    try {
        // Cek apakah email baru sudah terdaftar oleh pengguna lain
        if (currentEmail !== newEmail) { // Hanya cek jika email berubah
            const existingUserWithNewEmail = await User.findOne({ email: newEmail });
            if (existingUserWithNewEmail) {
                return res.status(409).json({ message: 'Email baru sudah terdaftar oleh pengguna lain.', type: 'error' });
            }
        }

        const user = await User.findOneAndUpdate( // Temukan dan perbarui di MongoDB
            { email: currentEmail },
            { $set: { name: newName, email: newEmail, avatar: newAvatar } },
            { new: true } // Mengembalikan dokumen yang sudah diperbarui
        );

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }

        res.status(200).json({
            message: 'Profil berhasil diperbarui!',
            type: 'success',
            updatedUser: user // Kirim objek user yang sudah diupdate dari MongoDB
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat memperbarui profil.', type: 'error' });
    }
});

// Endpoint API untuk mendapatkan semua data pengguna (untuk Leaderboard)
app.get('/api/leaderboard', async (req, res) => { // Tambahkan 'async'
    try {
        const users = await User.find({}, 'name email avatar toeflHistory'); // Ambil semua pengguna dari MongoDB, hanya field yang relevan
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users for leaderboard:', error);
        res.status(500).json({ message: 'Gagal mengambil data leaderboard.', type: 'error' });
    }
});


// --- 4. MELAYANI FILE STATIS ---
// Ini HARUS ditempatkan DI PALING AKHIR setelah SEMUA DEFINISI API ENDPOINTS Anda.
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'components')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));


// --- 5. START SERVER ---
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});