const chatWidget = document.getElementById('chat-widget');
const openChatBtn = document.querySelector('.cs');
const closeChatBtn = document.getElementById('chat-close-btn');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messagesContainer = document.getElementById('chat-messages');
const ptext = document.querySelector('.message p')
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

ptext.innerHTML = `<p>Halo kak ${loggedInUser.name} 🖐️ ${ucapanSelamat()}. Saya asisten AI SEO Ada yang bisa saya bantu?</p>`

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

function ucapanSelamat() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Asia/Jakarta'
    };
    
    const jakartaTimeFormatter = new Intl.DateTimeFormat('en-US', options);
    const jakartaTimeParts = jakartaTimeFormatter.formatToParts(now);
    
    let hour = 0;
    for (const part of jakartaTimeParts) {
        if (part.type === 'hour') {
            hour = parseInt(part.value, 10);
            break;
        }
    }

    if (hour >= 5 && hour < 12) {
        return "Selamat Pagi 🌄";
    } else if (hour >= 12 && hour < 15) {
        return "Selamat Siang 🌞";
    } else if (hour >= 15 && hour < 18) {
        return "Selamat Sore 🌇";
    } else {
        return "Selamat Malam 🌙";
    }
}

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


async function geminiAi(message){
    try {
        const response = await fetch('/api/gemini-chat', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message }) 
        });

        const data = await response.json();

        if (response.ok && data.success) {
            return data.response; 
        } else {
            console.error('Error dari backend Gemini API:', data.message || 'Unknown error');
            return false;
        }
    } catch (error) {
        console.error('Error fetching from backend Gemini API:', error);
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
    let aiResponse = "Mohon maaf saat ini Ai dalam bermasalah silahkan coba kembali";

    let gemini = await geminiAi(userMessage)
    if (gemini !== false){
        aiResponse = `Gemini: ${gemini}`
    } else {
        let ai = await getBotResponse(userMessage)
        if (ai !== false){
            aiResponse = `Gpt: ${ai}`
        }
    }

    displayMessage(aiResponse, 'ai');
}