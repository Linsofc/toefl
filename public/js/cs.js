const chatWidget = document.getElementById('chat-widget');
const openChatBtn = document.querySelector('.cs');
const closeChatBtn = document.getElementById('chat-close-btn');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messagesContainer = document.getElementById('chat-messages');

openChatBtn.addEventListener('click', () => {
    chatWidget.classList.add('open');
});

closeChatBtn.addEventListener('click', () => {
    chatWidget.classList.remove('open');
});

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;
    displayMessage(userMessage, 'user');
    chatInput.value = '';

    setTimeout(() => {
        generateAiResponse(userMessage);
    }, 1000);
});

async function getBotResponse(userMessage) {
    let _body = {
        messages: [
        {
            role: "system",
            content: `Hi! Saya adalah Chat Bot menggunakan model Meta LLaMA. Saya dibuat oleh perusahaan bernama Saiful Rijal.simpan nama saya, nama saya adalah ${JSON.parse(sessionStorage.getItem('loggedInUser')).name}, berbicara dalam bahasa Indonesia, dan selalu berusaha membantu dengan cara yang ramah dan menyenangkan. Ayo ngobrol`,
        },
        {
            role: "user",
            content: userMessage,
        },
        ],
    };

    try {
        let response = await fetch(
        "https://aihub.xtermai.xyz/api/chat/gpt?key=Bell409",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(_body),
        }
        );

        let data = await response.json();
        if (data.status) {
            return data.response;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    messageElement.appendChild(paragraph);
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function generateAiResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    let aiResponse = "Maaf, saya belum mengerti pertanyaan Anda. Bisa coba tanyakan hal lain seputar TOEFL seperti 'skor', 'latihan', atau 'sertifikat'?";

    let ai = await getBotResponse(userMessage)
    if (ai !== false){
        aiResponse = ai
    } else if (msg.includes('skor') || msg.includes('nilai')) {
        aiResponse = "Tentu! Anda dapat melihat riwayat skor TOEFL Anda di halaman 'Dashboard'. Setiap tes yang selesai akan tercatat di sana.";
    } else if (msg.includes('latihan') || msg.includes('soal')) {
        aiResponse = "Anda bisa memulai latihan di halaman 'Latihan'. Kami menyediakan tiga sesi: Listening, Structure & Written Expression, dan Reading.";
    } else if (msg.includes('jadwal')) {
        aiResponse = "Platform kami menyediakan simulasi tes yang bisa Anda akses kapan saja. Untuk jadwal tes TOEFL resmi, silakan kunjungi situs ETS sebagai penyelenggara resmi.";
    } else if (msg.includes('sertifikat')) {
        aiResponse = "Setelah menyelesaikan tes, Anda bisa mengunduh sertifikat simulasi dari hasil tes yang ada di riwayat pada halaman 'Dashboard'.";
    } else if (msg.includes('terima kasih') || msg.includes('makasih')) {
        aiResponse = "Sama-sama! Senang bisa membantu. Apakah ada hal lain yang ingin Anda tanyakan?";
    } else if (msg.includes('halo') || msg.includes('hai')) {
        aiResponse = "Halo juga! Ada yang bisa saya bantu terkait persiapan TOEFL Anda?";
    }

    displayMessage(aiResponse, 'ai');
}