const questions = [
    {
        question: "Wat is de hoofdstad van de Filipijnen?",
        answers: ["Manila", "Cebu", "Davao", "Quezon City"],
        correct: 0
    },
    {
        question: "Hoeveel eilanden heeft de Filipijnen ongeveer?",
        answers: ["500", "1000", "2000", "3000"],
        correct: 3
    },
    {
        question: "Welk land koloniseerde de Filipijnen het langst?",
        answers: ["Nederland", "Spanje", "Amerika", "Engeland"],
        correct: 1
    },
    {
        question: "Wat is een belangrijk export product van de Filipijnen?",
        answers: ["Koffie", "Cacao", "Kokosnoten", "Thee"],
        correct: 2
    },
    {
        question: "Wat is het geloof van de meerderheid in de Filipijnen?",
        answers: ["Boeddhisme", "Katholiek Christendom", "Islam", "Protestantisme"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = [false, false, false, false, false];
let selectedAnswers = [-1, -1, -1, -1, -1];

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionCounter').textContent = `Vraag ${currentQuestion + 1} van ${questions.length}`;
    document.getElementById('questionText').textContent = question.question;

    const answerOptions = document.getElementById('answerOptions');
    answerOptions.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        
        if (answered[currentQuestion] && index === selectedAnswers[currentQuestion]) {
            button.classList.add('selected');
            if (index === question.correct) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        }

        answerOptions.appendChild(button);
    });

    updateProgressBar();
    updateButtons();
    
    if (answered[currentQuestion]) {
        showFeedback();
    } else {
        document.getElementById('feedback').classList.remove('show');
    }
}

function selectAnswer(index) {
    if (answered[currentQuestion]) return;

    const question = questions[currentQuestion];
    selectedAnswers[currentQuestion] = index;
    answered[currentQuestion] = true;

    if (index === question.correct) {
        score++;
    }

    loadQuestion();
    showFeedback();
}

function showFeedback() {
    const question = questions[currentQuestion];
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedAnswers[currentQuestion] === question.correct;

    feedback.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.textContent = isCorrect 
        ? '✓ Juist! Goed gedaan!' 
        : '✗ Jammer! Het juiste antwoord was: ' + question.answers[question.correct];
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function updateButtons() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').disabled = !answered[currentQuestion];
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('restartBtn').classList.remove('hidden');

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.classList.add('show');
    
    document.getElementById('scoreCircle').textContent = `${score}/${questions.length}`;
    
    let message = '';
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
        message = 'Perfecte score! Je bent een Filipijnen expert! ';
    } else if (percentage >= 80) {
        message = 'Uitstekend! Je weet veel over de Filipijnen! ';
    } else if (percentage >= 60) {
        message = 'Goed gedaan! Je hebt veel geleerd! ';
    } else if (percentage >= 40) {
        message = 'Aardig geprobeerd! Er is nog veel te ontdekken! ';
    } else {
        message = 'Volgende keer beter! Lees meer over de Filipijnen! ';
    }
    
    document.getElementById('scoreMessage').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = [false, false, false, false, false];
    selectedAnswers = [-1, -1, -1, -1, -1];

    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('prevBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('restartBtn').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('show');

    loadQuestion();
}

window.addEventListener('load', loadQuestion);
