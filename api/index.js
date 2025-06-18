const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; 
require('dotenv').config(); 

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI tidak ditemukan di environment variables.');
    console.error('Pastikan Anda telah membuat file .env di root proyek Anda dengan MONGODB_URI.');
    process.exit(1); 
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Terhubung ke MongoDB Atlas dengan sukses!'))
    .catch(err => {
        console.error('Gagal terhubung ke MongoDB Atlas:', err.message);
        process.exit(1);
    });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    toeflHistory: [ 
        {
            date: { type: String, required: true },
            scores: {
                listening: { raw: Number, total: Number, converted: Number },
                structure: { raw: Number, total: Number, converted: Number },
                reading: { raw: Number, total: Number, converted: Number }
            },
            finalScore: { type: Number, required: true },
            userAnswers: { type: Object } 
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Definisi Semua Endpoint API Anda (Menggunakan Mongoose) ---
// Urutan ini SANGAT PENTING: API routes harus sebelum static file serving.

// Endpoint API untuk Registrasi Pengguna
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email sudah terdaftar.', type: 'error' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save(); // Simpan pengguna baru ke MongoDB
        res.status(201).json({ message: 'Pendaftaran berhasil! Silakan masuk.', type: 'success' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat pendaftaran.', type: 'error' });
    }
});

// Endpoint API untuk Login Pengguna
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password });
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
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.', type: 'error' });
    }
});

// Endpoint API untuk Mencari Akun (Reset Password - Langkah 1)
app.post('/api/find-account', async (req, res) => {
    const { email } = req.body;
    try {
        const userExists = await User.exists({ email: email });
        if (userExists) {
            res.status(200).json({ message: 'Akun ditemukan. Silakan masukkan password baru Anda.', type: 'success' });
        } else {
            res.status(404).json({ message: 'Email tidak ditemukan!', type: 'error' });
        }
    } catch (error) {
        console.error('Error finding account:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mencari akun.', type: 'error' });
    }
});

// Endpoint API untuk Reset Password
app.post('/api/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { password: newPassword } },
            { new: true } // Mengembalikan dokumen yang sudah diperbarui
        );
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }
        res.status(200).json({ message: 'Password berhasil diubah! Silakan login dengan password baru Anda.', type: 'success' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mereset password.', type: 'error' });
    }
});

// Endpoint API untuk Menyimpan Hasil Tes
app.post('/api/save-test-result', async (req, res) => {
    const { email, testResult } = req.body;
    if (!email || !testResult) {
        return res.status(400).json({ message: 'Data yang tidak lengkap untuk menyimpan hasil tes.', type: 'error' });
    }
    try {
        const user = await User.findOneAndUpdate(
            { email: email },
            { $push: { toeflHistory: testResult } }, // Menambahkan ke array toeflHistory
            { new: true, upsert: false } // Mengembalikan dokumen yang diperbarui, jangan buat jika tidak ada
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
        console.error('Error saving test result:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat menyimpan hasil tes.', type: 'error' });
    }
});

// Endpoint API untuk Update Profil Pengguna
app.post('/api/update-profile', async (req, res) => {
    const { currentEmail, newName, newEmail, newAvatar } = req.body;
    if (!currentEmail || !newName || !newEmail) {
        return res.status(400).json({ message: 'Data yang tidak lengkap untuk memperbarui profil.', type: 'error' });
    }
    try {
        // Cek apakah email baru sudah terdaftar oleh pengguna lain (jika email berubah)
        if (currentEmail !== newEmail) {
            const existingUserWithNewEmail = await User.findOne({ email: newEmail });
            if (existingUserWithNewEmail) {
                return res.status(409).json({ message: 'Email baru sudah terdaftar oleh pengguna lain.', type: 'error' });
            }
        }

        const user = await User.findOneAndUpdate(
            { email: currentEmail },
            { $set: { name: newName, email: newEmail, avatar: newAvatar } }, // Gunakan $set untuk memperbarui field
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
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat memperbarui profil.', type: 'error' });
    }
});

// Endpoint API untuk mendapatkan semua data pengguna (untuk Leaderboard)
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Hanya ambil field yang relevan dan hindari mengirim password
        const users = await User.find({}, 'name email avatar toeflHistory');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users for leaderboard:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data leaderboard.', type: 'error' });
    }
});

// --- Melayani File Statis ---
// Ini HARUS ditempatkan DI PALING AKHIR setelah SEMUA DEFINISI API ENDPOINTS Anda.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); // Perbaikan jalur ini
});

// --- 4. MELAYANI FILE STATIS ---
// Ini HARUS ditempatkan DI PALING AKHIR setelah SEMUA DEFINISI API ENDPOINTS DAN RUTE KHUSUS ANDA.
app.use(express.static(path.join(__dirname, '../public')))

// --- Memulai Server ---
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});