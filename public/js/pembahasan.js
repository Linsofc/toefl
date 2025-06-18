if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = './login.html';
}
document.addEventListener('DOMContentLoaded', function() {
const reviewContainer = document.getElementById('review-container');
const scoreSummaryContainer = document.getElementById('score-summary');

const reviewDataString = sessionStorage.getItem('lastTestReview');
if (!reviewDataString) {
    reviewContainer.innerHTML = '<p>Data pembahasan tidak ditemukan. Silakan selesaikan tes terlebih dahulu.</p>';
    return;
}

const reviewData = JSON.parse(reviewDataString);
const userAnswers = reviewData.userAnswers;
const testResult = reviewData.result;

if (testResult && scoreSummaryContainer) {
    let summaryHTML = `
        <h2>Skor Akhir Anda: ${testResult.finalScore}</h2>
        <p>Tanggal Tes: ${testResult.date}</p>
    `;
    scoreSummaryContainer.innerHTML = summaryHTML;
}

const sections = ['listening', 'structure', 'reading'];

const abcd = (ind) => {
    let huruf;
    switch (ind){
        case 0:
            huruf = 'A'
            break
        case 1:
            huruf = 'B'
            break
        case 2:
            huruf = 'C'
            break
        case 3:
            huruf = 'D'
            break
    }
    return huruf
}

sections.forEach(section => {
if (questions[section] && questions[section].length > 0) {
    questions[section].forEach((question, index) => {
        const questionNumber = index + 1;
        const userAnswer = userAnswers[`${section}_${question.id}`];
        const correctAnswer = question.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;
        let indexAnswer = question.options.findIndex(i => i == userAnswer)
        let hurufUserAnser = abcd(indexAnswer)
        const userAnswerDisplay = userAnswer
            ? `<strong>Jawaban Anda:</strong> ${hurufUserAnser}. ${userAnswer}`
            : '<strong>Jawaban Anda:</strong> <span class="unanswered-text">- (Tidak Dijawab)</span>';

        const card = document.createElement('div');
        card.className = 'review-card';
        
        let optionsHTML = '';
        question.options.forEach((option, ind) => {
            let huruf = abcd(ind)
            let li_class = '';
            let icon = '';

            if (option === correctAnswer) {
                li_class = 'correct-answer';
                icon = '<i class="fas fa-check-circle icon"></i>';
            } 
            else if (option === userAnswer && !isCorrect) {
                li_class = 'incorrect-answer';
                icon = '<i class="fas fa-times-circle icon"></i>';
            }

            optionsHTML += `<li class="${li_class}">${huruf}. ${icon}${option}</li>`;
        });

        card.innerHTML = `
            <div class="review-card-header">
                ${section.charAt(0).toUpperCase() + section.slice(1)} - Soal ${questionNumber}
            </div>
            <div class="review-card-body">
                ${question.passage ? `<div class="passage-area"><p>${question.passage.replace(/\n/g, '<br>')}</p></div>` : ''}
                ${question.audioSrc ? `<div class="audio-player-area"><audio controls src="${question.audioSrc}"></audio></div>` : ''}
                <p class="question-text">${question.question}</p>
                <ul class="options-list">
                    ${optionsHTML}
                </ul>
                
                <div class="user-answer-display">
                    ${userAnswerDisplay}
                </div>

                <div class="explanation-box">
                    <h4><i class="fas fa-lightbulb"></i> Pembahasan</h4>
                    <p>${question.pembahasan}</p>
                </div>
            </div>
        `;

        reviewContainer.appendChild(card);
    });
}
});
})