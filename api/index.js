const express = require('express');
const { GoogleGenAI } = require("@google/genai");
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs'); 
const session = require('express-session');
const { log } = require('console');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecretkey_for_dev'; 

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI tidak ditemukan di environment variables.');
    console.error('Pastikan Anda telah membuat file .env di root proyek Anda dengan MONGODB_URI.');
    process.exit(1);
}
if (!GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY tidak ditemukan di environment variables.');
    console.error('Pastikan Anda telah membuat file .env di root proyek Anda dengan GEMINI_API_KEY.');
    process.exit(1);
}
if (process.env.SESSION_SECRET === undefined) {
    console.warn('PERINGATAN: SESSION_SECRET tidak diatur di environment variables. Menggunakan nilai default. HARAP SET DI PRODUKSI!');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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
    isAdmin: { type: Boolean, default: false },
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

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); 
    }
    next();
});

const User = mongoose.model('User', userSchema);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: false,
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production'
    }
}));

function verifyAdmin(req, res, next) {
    console.log(req)
    if (req?.session?.user?.isAdmin === true) {
        next();
    } else {
        if (req.originalUrl.startsWith('/api/admin') || req.originalUrl === '/api/current-user') {
            return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin.', type: 'error' });
        } else {
            return res.redirect('/admin_login.html');
        }
    }
}

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email sudah terdaftar.', type: 'error' });
        }
        const newUser = new User({ name, email, password }); 
        await newUser.save();
        res.status(201).json({ message: 'Pendaftaran berhasil! Silakan masuk.', type: 'success' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat pendaftaran.', type: 'error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log(`[${new Date().toISOString()}] Login gagal: Email tidak ditemukan untuk: ${email}`);
            return res.status(401).json({ message: 'Email atau password salah.', type: 'error' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log(`[${new Date().toISOString()}] Login berhasil untuk pengguna: ${user.name}`);
            
            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin 
            };

            res.status(200).json({
                message: `Login berhasil! Selamat datang, ${user.name}`,
                user: user,
                session: req.session.user,
                type: 'success'
            });
        } else {
            console.log(`[${new Date().toISOString()}] Login gagal: Password salah untuk email: ${email}`);
            res.status(401).json({ message: 'Email atau password salah.', type: 'error' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.', type: 'error' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Gagal logout.', type: 'error' });
        }
        res.clearCookie('connect.sid'); 
        res.status(200).json({ message: 'Logout berhasil!', type: 'success' });
    });
});


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

app.post('/api/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } }, 
            { new: true }
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

app.post('/api/save-test-result', async (req, res) => {
    const { email, testResult } = req.body;
    if (!email || !testResult) {
        return res.status(400).json({ message: 'Data yang tidak lengkap untuk menyimpan hasil tes.', type: 'error' });
    }
    try {
        const user = await User.findOneAndUpdate(
            { email: email },
            { $push: { toeflHistory: testResult } },
            { new: true, upsert: false }
        );
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }
        res.status(200).json({
            message: 'Hasil tes berhasil disimpan!',
            type: 'success',
            updatedUser: user
        });
    } catch (error) {
        console.error('Error saving test result:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat menyimpan hasil tes.', type: 'error' });
    }
});

app.post('/api/update-profile', async (req, res) => {
    const { currentEmail, newName, newEmail, newAvatar, newPassword } = req.body;
    
    if (!currentEmail || !newName || !newEmail) {
        return res.status(400).json({ message: 'Data yang tidak lengkap untuk memperbarui profil.', type: 'error' });
    }

    try {
        const userToUpdate = await User.findOne({ email: currentEmail });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }

        if (currentEmail !== newEmail) {
            const existingUserWithNewEmail = await User.findOne({ email: newEmail });
            if (existingUserWithNewEmail && String(existingUserWithNewEmail._id) !== String(userToUpdate._id)) {
                return res.status(409).json({ message: 'Email baru sudah terdaftar oleh pengguna lain.', type: 'error' });
            }
        }

        const updateFields = {
            name: newName,
            email: newEmail,
            avatar: newAvatar
        };

        if (newPassword && newPassword.trim() !== '') {
            updateFields.password = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: currentEmail },
            { $set: updateFields },
            { new: true, runValidators: true, select: '-password' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan setelah update.', type: 'error' });
        }

        if (req.session.user && String(req.session.user.id) === String(updatedUser._id)) {
            req.session.user.name = updatedUser.name;
            req.session.user.email = updatedUser.email;
        }

        res.status(200).json({
            message: 'Profil berhasil diperbarui!',
            type: 'success',
            updatedUser: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Terjadi kesalahan server saat memperbarui profil.', type: 'error' });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const users = await User.find({}, 'name email avatar toeflHistory');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users for leaderboard:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data leaderboard.', type: 'error' });
    }
});

app.post('/api/gemini-chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ success: false, message: 'Pesan tidak boleh kosong.' });
    }

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });
        let responseText = response.text;

        res.status(200).json({ success: true, response: responseText });
    } catch (error) {
        console.error('Error calling Gemini AI:', error);
        res.status(500).json({ success: false, message: 'Gagal mendapatkan respons dari Gemini AI.', error: error.message });
    }
});

app.get('/api/current-user', verifyAdmin, async (req, res) => {
    try {
        if (req.session.user) {
            const user = await User.findById(req.session.user.id, '-password');
            if (!user) {
                return res.status(404).json({ message: 'Pengguna sesi tidak ditemukan di database.', type: 'error' });
            }
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(401).json({ message: 'Tidak ada pengguna yang login.', type: 'error' });
        }
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data pengguna yang login.', type: 'error' });
    }
});


app.get('/api/admin/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password'); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users for admin:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data pengguna.', type: 'error' });
    }
});

app.get('/api/admin/users/:id', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password'); 
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching single user for admin:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID pengguna tidak valid.', type: 'error' });
        }
        res.status(500).json({ message: 'Terjadi kesalahan server.', type: 'error' });
    }
});


app.put('/api/admin/users/:id', verifyAdmin, async (req, res) => {
    const { name, email, password, avatar, isAdmin } = req.body; 
    const userId = req.params.id;

    try {
        if (String(req.session.user.id) === String(userId)) {
            // Belum Diperlukan Saat Ini
        }

        if (email) {
            const existingUserWithEmail = await User.findOne({ email: email, _id: { $ne: userId } });
            if (existingUserWithEmail) {
                return res.status(409).json({ message: 'Email sudah terdaftar untuk pengguna lain.', type: 'error' });
            }
        }

        const updateData = { name, email, avatar, isAdmin }; 
        if (password && password.trim() !== '') {
            updateData.password = await bcrypt.hash(password, 10); 
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true, select: '-password' } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }

        if (req.session.user && String(req.session.user.id) === String(updatedUser._id)) {
            req.session.user.name = updatedUser.name;
            req.session.user.email = updatedUser.email;
            req.session.user.isAdmin = updatedUser.isAdmin; 
        }

        res.status(200).json({ message: 'Pengguna berhasil diperbarui!', type: 'success', updatedUser });
    } catch (error) {
        console.error('Error updating user by admin:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID pengguna tidak valid.', type: 'error' });
        }
        res.status(500).json({ message: 'Terjadi kesalahan server saat memperbarui pengguna.', type: 'error' });
    }
});

app.delete('/api/admin/users/:id', verifyAdmin, async (req, res) => {
    try {
        if (req.session.user && String(req.session.user.id) === String(req.params.id)) {
            return res.status(403).json({ message: 'Admin tidak bisa menghapus akunnya sendiri.', type: 'error' });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.', type: 'error' });
        }
        res.status(200).json({ message: 'Pengguna berhasil dihapus!', type: 'success' });
    } catch (error) {
        console.error('Error deleting user by admin:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID pengguna tidak valid.', type: 'error' });
        }
        res.status(500).json({ message: 'Terjadi kesalahan server saat menghapus pengguna.', type: 'error' });
    }
});

app.get('/admin_login.html', (req, res) => {
    if (req.session.user && req.session.user.isAdmin) {
        return res.redirect('/admin.html');
    }
    res.sendFile(path.join(__dirname, '../public/admin_login.html'));
});

app.get('/admin.html', verifyAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/admin', (req, res) => {
    res.redirect('/admin.html');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Akses Login Admin di: http://localhost:${PORT}/admin_login.html`);
});
