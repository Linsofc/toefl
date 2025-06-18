const optionsContainerEl = document.getElementById('options-container');
const passageAreaEl = document.getElementById('passage-area');
const audioPlayerAreaEl = document.getElementById('audio-player-area');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishSectionBtn = document.getElementById('finish-section-btn');
const questionNavModal = document.getElementById('question-nav-modal');
const questionGrid = document.getElementById('question-grid');

// Cek login
if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = './login.html';
}

let currentSectionIndex = 0;
let currentQuestionIndex = 0;
const sections = ['listening', 'structure', 'reading'];
const timeLimits = { listening: 30 * 60, structure: 40 * 60, reading: 50 * 60 };
const cnv = {
    listening: { min: 24, max: 68 },
    structure: { min: 20, max: 68 },
    reading: { min: 21, max: 67 }
};
let userAnswers = {};
let timerInterval;

function start() {
    document.getElementById('start-test-btn').addEventListener('click', () => {
        document.getElementById('welcome-modal').style.display = 'none';
        currentSectionIndex = 0;
        currentQuestionIndex = 0;
        userAnswers = {}; 
        loadSection();
    });
}

function loadSection() {
    const sectionName = sections[currentSectionIndex];
    document.getElementById('section-title').textContent = `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Section`;
    currentQuestionIndex = 0;
    renderQuestion();
    startTimer(timeLimits[sectionName]);
}

function renderQuestion() {
    const sectionName = sections[currentSectionIndex];
    const sectionQuestions = questions[sectionName];

    if (!sectionQuestions || sectionQuestions.length === 0 || currentQuestionIndex >= sectionQuestions.length) {
        console.error(`Error: No questions found for section '${sectionName}' or invalid question index ${currentQuestionIndex}.`);
        showNotification('Gagal memuat pertanyaan. Silakan coba sesi lain atau hubungi dukungan.', 'error');
        return;
    }

    const questionData = sectionQuestions[currentQuestionIndex];
    const totalQuestions = sectionQuestions.length;

    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    document.getElementById('question-text').textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;

    optionsContainerEl.innerHTML = ''; 
    passageAreaEl.style.display = 'none';
    audioPlayerAreaEl.style.display = 'none';

    if (questionData.passage) {
        passageAreaEl.style.display = 'block';
        passageAreaEl.innerHTML = `<p>${questionData.passage}</p>`;
    }

    if (questionData.audioSrc) {
        audioPlayerAreaEl.style.display = 'block';
        audioPlayerAreaEl.innerHTML = `<audio controls src="${questionData.audioSrc}"></audio>`;
    }

    questionData.options.forEach((option, ind) => {
        let huruf;
        switch (ind) {
            case 0: huruf = 'A'; break;
            case 1: huruf = 'B'; break;
            case 2: huruf = 'C'; break;
            case 3: huruf = 'D'; break;
        }
        const optionEl = document.createElement('div');
        optionEl.classList.add('option');
        const optionId = `option-${sectionName}-${questionData.id}-${ind}`;
        optionEl.innerHTML = `
            <input type="radio" id="${optionId}" name="option" value="${option}">
            <label for="${optionId}">${huruf}. ${option}</label>
        `;
        optionsContainerEl.appendChild(optionEl);
    });

    const answerKey = `${sectionName}_${questionData.id}`;
    if (userAnswers[answerKey]) {
        const previouslySelectedOption = document.querySelector(`input[name="option"][value="${userAnswers[answerKey]}"]`);
        if (previouslySelectedOption) {
            previouslySelectedOption.checked = true;
        }
    }

    updateNavButtons();
}

function startTimer(duration) {
    let timer = duration;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById('time').textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            alert("Waktu habis! Pindah ke sesi berikutnya.");
            moveToNextSection();
        }
    }, 1000);
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const sectionName = sections[currentSectionIndex];
        const questionId = questions[sectionName][currentQuestionIndex].id;
        userAnswers[`${sectionName}_${questionId}`] = selectedOption.value;
    }
}

function moveToNextSection() {
    clearInterval(timerInterval);
    currentSectionIndex++;

    if (currentSectionIndex < sections.length) {
        showNotification(`Sesi ${sections[currentSectionIndex - 1].charAt(0).toUpperCase() + sections[currentSectionIndex - 1].slice(1)} selesai. Lanjut ke sesi ${sections[currentSectionIndex].charAt(0).toUpperCase() + sections[currentSectionIndex].slice(1)}.`, 'success');
        loadSection();
    } else {
        finishTest();
    }
}

async function finishTest() {
    alert("Tes Selesai! Skor Anda sedang dihitung.");
    const scores = {};

    sections.forEach(section => {
        let correctCount = 0;
        const sectionQuestions = questions[section];

        if (sectionQuestions && sectionQuestions.length > 0) {
            sectionQuestions.forEach(q => {
                const answerKey = `${section}_${q.id}`;
                if (userAnswers[answerKey] === q.correctAnswer) {
                    correctCount++;
                }
            });

            const { min, max } = cnv[section];
            scores[section] = {
                raw: correctCount,
                total: sectionQuestions.length,
                converted: sectionQuestions.length > 0 ? Math.round(
                    ((correctCount / sectionQuestions.length) * (max - min)) + min
                ) : min
            };
        } else {
            scores[section] = {
                raw: 0,
                total: 0,
                converted: cnv[section].min 
            };
        }
    });

    const totalConvertedScore = Object.values(scores).reduce((sum, s) => sum + (s.converted || 0), 0);
    const finalScore = Math.round((totalConvertedScore * 10) / 3);

    const testResult = {
        date: new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }),
        scores,
        finalScore,
        userAnswers
    };

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    try {
        const response = await fetch('/api/save-test-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loggedInUser.email, 
                testResult: testResult
            }),
        });

        const data = await response.json();
        if (response.ok) {
            showNotification(data.message, 'success');
            sessionStorage.setItem('loggedInUser', JSON.stringify(data.updatedUser));

            const reviewData = {
                userAnswers,
                result: testResult,
                questions 
            };
            sessionStorage.setItem('lastTestReview', JSON.stringify(reviewData));
            window.location.href = 'pembahasan.html';
        } else {
            console.error('Server error response:', data);
            showNotification(data.message || 'Gagal menyimpan hasil tes.', 'error');
        }
    } catch (error) {
        console.error('Error saving test result (network/parsing issue):', error);
        showNotification('Terjadi kesalahan saat menyimpan hasil tes. Coba cek koneksi internet Anda.', 'error');
    }
}

function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toast.className = 'toast';
    toastMessage.textContent = message;

    if (type === 'success') {
        toast.classList.add('success');
        toastIcon.className = 'fas fa-check-circle'; 
    } else {
        toast.classList.add('error');
        toastIcon.className = 'fas fa-times-circle';
    }
    toast.classList.add('show'); 
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateNavButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === 0) {
        prevBtn.style.backgroundColor = '#ddd';
        prevBtn.style.color = '#0f0f0f';
    } else {
        prevBtn.style.backgroundColor = 'rgb(216, 29, 29)'; 
        prevBtn.style.color = '#ddd'; 
    }

    const sectionName = sections[currentSectionIndex];
    const totalQuestions = questions[sectionName]?.length || 0;

    if (currentQuestionIndex === totalQuestions - 1) {
        nextBtn.style.display = 'none';
        finishSectionBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        finishSectionBtn.style.display = 'none';
    }
}

function openQuestionNav() {
    const sectionName = sections[currentSectionIndex];
    const totalQuestions = questions[sectionName]?.length || 0; 
    questionGrid.innerHTML = '';

    for (let i = 0; i < totalQuestions; i++) {
        const qId = questions[sectionName][i].id;
        const answerKey = `${sectionName}_${qId}`;

        const button = document.createElement('button');
        button.textContent = i + 1;
        button.classList.add('question-nav-btn');
        button.dataset.questionIndex = i;

        if (i === currentQuestionIndex) {
            button.classList.add('current'); 
        }

        if (userAnswers[answerKey]) {
            button.classList.add('answered');
        }

        questionGrid.appendChild(button);
    }
    questionNavModal.style.display = 'flex';
}

function jumpToQuestion(questionIndex) {
    saveAnswer();
    currentQuestionIndex = questionIndex;
    renderQuestion();
    questionNavModal.style.display = 'none';
}

function calculateTemporaryScores() {
    const scores = {};

    sections.forEach(section => {
        const sectionQuestions = questions[section] || [];
        const totalQuestionsInSection = sectionQuestions.length;

        if (totalQuestionsInSection === 0) {
            scores[section] = cnv[section].min; 
            return;
        }

        let correctCount = 0;
        sectionQuestions.forEach(q => {
            const answerKey = `${section}_${q.id}`;
            if (userAnswers[answerKey] === q.correctAnswer) {
                correctCount++;
            }
        });

        const { min, max } = cnv[section];
        scores[section] = Math.round(
            ((correctCount / totalQuestionsInSection) * (max - min)) + min
        );
    });
    return scores;
}

start();

nextBtn.addEventListener('click', () => {
    saveAnswer();
    currentQuestionIndex++;
    renderQuestion();
});

prevBtn.addEventListener('click', () => {
    saveAnswer();
    currentQuestionIndex--;
    renderQuestion();
});

finishSectionBtn.addEventListener('click', () => {
    saveAnswer(); 

    const tempScores = calculateTemporaryScores();
    let scoreDisplay = "Skor Sementara Anda:\n";
    sections.forEach(section => {
        const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
        scoreDisplay += `- ${sectionTitle}: ${tempScores[section] || cnv[section].min}\n`;
    });

    const sectionName = sections[currentSectionIndex];
    const totalQuestionsInSection = questions[sectionName]?.length || 0;
    const answeredCountInSection = Object.keys(userAnswers).filter(key => key.startsWith(sectionName + '_')).length;
    const unansweredCount = totalQuestionsInSection - answeredCountInSection;

    let warningMessage = 'Anda yakin ingin menyelesaikan dan melanjutkan ke sesi berikutnya?';
    if (unansweredCount > 0) {
        warningMessage = `Terdapat ${unansweredCount} pertanyaan yang belum Anda jawab di sesi ini. Apakah Anda yakin ingin melanjutkan?`;
    }

    const finalMessage = `${scoreDisplay}\n${warningMessage}`;

    if (confirm(finalMessage)) {
        moveToNextSection();
    }
});

document.getElementById('jump-to-btn').addEventListener('click', openQuestionNav);
document.getElementById('close-nav-modal-btn').addEventListener('click', () => questionNavModal.style.display = 'none');

questionNavModal.addEventListener('click', (e) => {
    if (e.target === questionNavModal) { 
        questionNavModal.style.display = 'none';
    }
});

questionGrid.addEventListener('click', (e) => {
    if (e.target && e.target.dataset.questionIndex) {
        const index = parseInt(e.target.dataset.questionIndex, 10);
        jumpToQuestion(index);
    }
});