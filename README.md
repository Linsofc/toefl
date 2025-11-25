# Smart English Orientation (SEO) - Platform Simulasi TOEFL

**Smart English Orientation (SEO)** adalah platform berbasis web yang dirancang untuk membantu pengguna berlatih dan mensimulasikan tes TOEFL ITP. Aplikasi ini menyediakan fitur latihan per bagian (Listening, Structure, Reading), simulasi tes penuh, penghitungan skor otomatis, leaderboard, dan asisten AI yang terintegrasi.

## 🌐 Live Demo / Hosting

Akses aplikasi secara langsung melalui tautan berikut:
👉 **[https://tes-toefl-lins.vercel.app](https://tes-toefl-lins.vercel.app)**

## Tampilan
![Login](images/login.png)
![register](images/register.png)
![beranda](images/beranda.png)
![dashboard](images/dashboard.png)
![leaderboard](images/leaderboard.png)
![chatbot](images/chatbot.png)

## 🌟 Fitur Utama

### 👤 Pengguna (User)

  * **Autentikasi Aman:** Pendaftaran dan Login akun menggunakan enkripsi password (Bcrypt).
  * **Simulasi Tes TOEFL:**
      * **Listening Comprehension:** Audio player terintegrasi untuk soal mendengarkan.
      * **Structure & Written Expression:** Latihan tata bahasa.
      * **Reading Comprehension:** Teks bacaan akademik.
      * **Full Test:** Simulasi lengkap dengan penghitung waktu mundur (Timer) dan navigasi soal.
  * **Sistem Penilaian Otomatis:** Skor dihitung secara instan menggunakan standar konversi skor TOEFL ITP.
  * **Dashboard Pengguna:**
      * Melihat riwayat tes.
      * Edit profil (Nama, Email, Avatar).
      * **Sertifikat:** Unduh sertifikat hasil tes dalam format PDF.
      * Review jawaban dan pembahasan soal.
  * **Leaderboard:** Peringkat pengguna berdasarkan skor tertinggi.
  * **AI Assistant:** Chatbot cerdas (berbasis Google Gemini AI) untuk membantu menjawab pertanyaan pengguna seputar bahasa Inggris.

### 🛡️ Admin

  * **Admin Dashboard:** Panel khusus untuk manajemen aplikasi.
  * **Manajemen Pengguna:** Melihat daftar pengguna, mengedit data pengguna, dan menghapus pengguna.
  * **Manajemen Profil Admin:** Update data profil admin.

## 🛠️ Teknologi yang Digunakan

**Backend:**

  * **Runtime:** Node.js
  * **Framework:** Express.js
  * **Database:** MongoDB (via Mongoose)
  * **AI Integration:** Google Generative AI (Gemini)
  * **Authentication:** Bcryptjs, Express-session

**Frontend:**

  * **Bahasa:** HTML5, CSS3, JavaScript (Vanilla)
  * **Library:** FontAwesome (Ikon), html2canvas & jsPDF (Generasi Sertifikat)

**Deployment:**

  * **Platform:** Vercel

## 📂 Struktur Proyek

```text
hosting-toefl/
├── api/                    # Logika Backend (Serverless Function)
│   └── index.js            # Entry point server, routes, & database connection
├── public/                 # File Frontend Statis
│   ├── admin/              # Halaman & Script khusus Admin
│   ├── assets/             # Gambar dan Audio soal
│   ├── components/         # Komponen HTML (Iframes materi latihan)
│   ├── css/                # Stylesheet CSS
│   ├── js/                 # Script JavaScript Client-side
│   │   ├── questions.js    # Database soal (JSON object)
│   │   ├── cs.js           # Logika AI Chatbot
│   │   └── ...             # Script logika halaman (login, test, dashboard, dll)
│   ├── *.html              # Halaman-halaman utama website
├── .gitignore              # Git ignore file
├── package.json            # Dependensi Node.js
├── vercel.json             # Konfigurasi Deployment Vercel
└── README.md
```

## 🚀 Panduan Instalasi & Menjalankan (Lokal)

Ikuti langkah ini untuk menjalankan proyek di komputer lokal Anda:

### 1\. Prasyarat

  * Node.js terinstal.
  * Akun MongoDB Atlas (untuk database).
  * API Key Google Gemini (untuk fitur Chatbot AI).

### 2\. Clone Repository

```bash
git clone https://github.com/Linsofc/toefl.git
cd hosting-toefl
```

### 3\. Install Dependensi

```bash
npm install
```

### 4\. Konfigurasi Environment Variables (.env)

Buat file bernama `.env` di root folder proyek dan isi dengan konfigurasi berikut (sesuai `api/index.js`):

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nama_database
GEMINI_API_KEY=masukkan_api_key_google_gemini_anda
SESSION_SECRET=rahasia_session_kunci_acak
```

### 5\. Jalankan Aplikasi

```bash
npm start
```

Akses aplikasi di browser melalui: `http://localhost:3000`

## 🔑 Akses Login

  * **Halaman Login User:** `/login.html` (atau klik tombol "Masuk" di beranda).
  * **Halaman Login Admin:** `/admin_login.html`.
      * *Catatan:* Admin memiliki hak akses khusus untuk mengelola data pengguna.

## 📝 Catatan Pengembang

  * **Soal Tes:** Data soal tersimpan di `public/js/questions.js`. Anda dapat menambah atau mengubah soal langsung di file tersebut.
  * **Deployment:** Proyek ini dikonfigurasi untuk berjalan sebagai fungsi serverless di Vercel menggunakan `api/index.js` sebagai entry point.

## 🤝 Kontribusi

Kontribusi dipersilakan\! Silakan fork repository ini dan buat Pull Request untuk perbaikan bug atau penambahan fitur.

## 📜 Lisensi

ISC License.

-----

© 2025 Smart English Orientation (SEO). Created by Saiful Rijal.