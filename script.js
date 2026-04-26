// Quiz Questions in Hungarian
const quizQuestions = [
    {
        question: "Mekkora a négyzet területe, ha egyik oldala 7 cm?",
        options: ["49 cm²", "28 cm²", "14 cm²", "56 cm²"],
        correct: 0,
        explanation: "A négyzet területe: T = a². T = 7² = 49 cm²"
    },
    {
        question: "Egy téglalap hosszúsága 15 cm, szélessége 6 cm. Mekkora a területe?",
        options: ["21 cm²", "42 cm²", "90 cm²", "120 cm²"],
        correct: 2,
        explanation: "A téglalap területe: T = a × b = 15 × 6 = 90 cm²"
    },
    {
        question: "Egy trapéz párhuzamos oldalai 8 cm és 12 cm, magassága 5 cm. Mekkora a területe?",
        options: ["50 cm²", "40 cm²", "60 cm²", "80 cm²"],
        correct: 0,
        explanation: "A trapéz területe: T = ((a + b) × m) / 2 = ((8 + 12) × 5) / 2 = (20 × 5) / 2 = 50 cm²"
    },
    {
        question: "Egy rombusz átlói 10 cm és 8 cm. Mekkora a területe?",
        options: ["80 cm²", "40 cm²", "60 cm²", "45 cm²"],
        correct: 1,
        explanation: "A rombusz területe: T = (d₁ × d₂) / 2 = (10 × 8) / 2 = 40 cm²"
    },
    {
        question: "Egy paralelogramma alap hossza 9 cm, magassága 4 cm. Mekkora a területe?",
        options: ["36 cm²", "26 cm²", "13 cm²", "18 cm²"],
        correct: 0,
        explanation: "A paralelogramma területe: T = a × m = 9 × 4 = 36 cm²"
    },
    {
        question: "Egy paralelogramma területe 72 cm², alapja 12 cm. Mekkora a magassága?",
        options: ["4 cm", "6 cm", "8 cm", "10 cm"],
        correct: 1,
        explanation: "A paralelogramma magassága: m = T / a = 72 / 12 = 6 cm"
    },
    {
        question: "Egy téglalap területe 120 cm², hosszúsága 15 cm. Mekkora a szélessége?",
        options: ["6 cm", "8 cm", "10 cm", "12 cm"],
        correct: 1,
        explanation: "Területből szélesség: b = T / a = 120 / 15 = 8 cm"
    },
    {
        question: "Egy négyzet kerülete 32 cm. Mekkora a területe?",
        options: ["64 cm²", "48 cm²", "256 cm²", "128 cm²"],
        correct: 0,
        explanation: "Kerületből oldal: a = 32 / 4 = 8 cm. Terület: T = a² = 8² = 64 cm²"
    }
];

// State Management
let currentQuestion = 0;
let testActive = false;
let userAnswers = [];
let testStarted = false;

// DOM Elements
const testBtn = document.getElementById('testBtn');
const submitBtn = document.getElementById('submitBtn');
const questionsContainer = document.getElementById('questionsContainer');
const resultsModal = document.getElementById('resultsModal');
const modalClose = document.querySelector('.modal-close');
const btnAgain = document.querySelector('.btn-again');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const progressFill = document.getElementById('progressFill');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    totalQuestionsSpan.textContent = quizQuestions.length;
    setupEventListeners();
    addPageAnimations();
});

// Setup Event Listeners
function setupEventListeners() {
    testBtn.addEventListener('click', startTest);
    submitBtn.addEventListener('click', submitTest);
    modalClose.addEventListener('click', closeResults);
    btnAgain.addEventListener('click', resetTest);
}

// Start Test
function startTest() {
    testActive = true;
    testStarted = true;
    currentQuestion = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // Hide start button, show submit button
    testBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
    
    // Display all questions
    questionsContainer.innerHTML = '';
    displayAllQuestions();
    
    // Animate the container
    questionsContainer.style.animation = 'slideUp 0.5s ease-out';
}

// Display All Questions at Once
function displayAllQuestions() {
    quizQuestions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.style.animationDelay = `${index * 0.1}s`;
        
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = index + 1;
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = question.question;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        // Create options
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('label');
            optionDiv.className = 'option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optionIndex;
            
            // Check if this option was previously selected
            if (userAnswers[index] === optionIndex) {
                input.checked = true;
            }
            
            input.addEventListener('change', function(e) {
                userAnswers[index] = optionIndex;
                updateProgress();
            });
            
            const label = document.createElement('label');
            label.style.margin = '0';
            label.textContent = option;
            
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        questionCard.appendChild(questionNumber);
        questionCard.appendChild(questionText);
        questionCard.appendChild(optionsDiv);
        
        questionsContainer.appendChild(questionCard);
        
        // Add staggered animation to options
        const options = optionsDiv.querySelectorAll('.option');
        options.forEach((opt, idx) => {
            opt.style.animation = `slideUp 0.4s ease-out ${0.1 + idx * 0.1}s both`;
        });
    });
    
    // Update progress
    updateProgress();
}

// Update Progress Bar
function updateProgress() {
    const answeredCount = userAnswers.filter(answer => answer !== null).length;
    const percentage = (answeredCount / quizQuestions.length) * 100;
    
    currentQuestionSpan.textContent = answeredCount;
    progressFill.style.width = percentage + '%';
}

// Submit Test
function submitTest() {
    // Check if all questions are answered
    if (userAnswers.includes(null)) {
        alert('Kérjük, válaszold meg az összes kérdést!');
        return;
    }
    
    // Calculate results
    const results = calculateResults();
    displayResultsInline(results);
    testActive = false;
}

// Calculate Results
function calculateResults() {
    let score = 0;
    const details = [];
    
    quizQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        if (isCorrect) score++;
        
        details.push({
            question: question.question,
            userAnswer: question.options[userAnswers[index]],
            correctAnswer: question.options[question.correct],
            isCorrect: isCorrect,
            explanation: question.explanation
        });
    });
    
    return { score, details };
}

// Display Results Inline (Below the test)
function displayResultsInline(results) {
    // Hide the test buttons
    submitBtn.style.display = 'none';
    
    // Create results section
    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-inline';
    resultsSection.style.animation = 'slideUp 0.6s ease-out';
    
    // Score summary
    const scoreSummary = document.createElement('div');
    scoreSummary.className = 'results-summary';
    
    const percentage = (results.score / quizQuestions.length) * 100;
    
    // Determine feedback message
    let feedbackMessage = '';
    let feedbackEmoji = '';
    
    if (percentage === 100) {
        feedbackMessage = 'Tökéletes! Kiváló munkavégzés!';
        feedbackEmoji = '🌟';
    } else if (percentage >= 80) {
        feedbackMessage = 'Nagyon jó! Szinte minden helyes volt!';
        feedbackEmoji = '🎉';
    } else if (percentage >= 60) {
        feedbackMessage = 'Jó! Többnyire jól tudtad a válaszokat!';
        feedbackEmoji = '😊';
    } else if (percentage >= 40) {
        feedbackMessage = 'Próbálkozz újra! Tanulj meg még egy kicsit!';
        feedbackEmoji = '💪';
    } else {
        feedbackMessage = 'Ajánlott a képleteket újra átnézni!';
        feedbackEmoji = '📚';
    }
    
    scoreSummary.innerHTML = `
        <div class="score-circle">
            <div class="score-number">${results.score}</div>
            <div class="score-total">a 8-ból</div>
        </div>
        <div class="score-details">
            <h3>${Math.round(percentage)}%</h3>
            <p class="feedback-message">${feedbackEmoji} ${feedbackMessage}</p>
        </div>
    `;
    
    resultsSection.appendChild(scoreSummary);
    
    // Detailed answers
    const detailedAnswers = document.createElement('div');
    detailedAnswers.className = 'results-detailed';
    detailedAnswers.innerHTML = '<h4>Részletes Eredmények</h4>';
    
    results.details.forEach((detail, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${detail.isCorrect ? 'correct' : 'incorrect'}`;
        resultItem.style.animation = `slideUp 0.5s ease-out ${0.1 + index * 0.05}s both`;
        resultItem.style.opacity = '0';
        resultItem.style.animationFillMode = 'forwards';
        
        const statusIcon = detail.isCorrect ? '✓' : '✗';
        const statusColor = detail.isCorrect ? '#10b981' : '#ef4444';
        
        resultItem.innerHTML = `
            <div class="result-header">
                <span class="result-icon" style="color: ${statusColor};">${statusIcon} Kérdés ${index + 1}</span>
                <span class="result-question">${detail.question}</span>
            </div>
            <div class="result-body">
                ${!detail.isCorrect ? `
                    <div class="answer-row">
                        <span class="answer-label">Válaszod:</span>
                        <span class="answer-text your-answer">${detail.userAnswer}</span>
                    </div>
                ` : ''}
                <div class="answer-row">
                    <span class="answer-label">Helyes válasz:</span>
                    <span class="answer-text correct-answer">${detail.correctAnswer}</span>
                </div>
                <div class="explanation">
                    <strong>Magyarázat:</strong> ${detail.explanation}
                </div>
            </div>
        `;
        
        detailedAnswers.appendChild(resultItem);
    });
    
    resultsSection.appendChild(detailedAnswers);
    
    // Add button to try again
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.className = 'btn btn-primary btn-try-again';
    tryAgainBtn.textContent = 'Újra Próbálkozom';
    tryAgainBtn.addEventListener('click', resetTest);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'try-again-container';
    buttonContainer.appendChild(tryAgainBtn);
    
    resultsSection.appendChild(buttonContainer);
    
    // Add results section after questions
    questionsContainer.parentNode.insertBefore(resultsSection, questionsContainer.nextSibling);
}

// Close Results
function closeResults() {
    resultsModal.classList.remove('show');
}

// Reset Test
function resetTest() {
    testBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
    testActive = false;
    testStarted = false;
    currentQuestion = 0;
    userAnswers = [];
    questionsContainer.innerHTML = '';
    currentQuestionSpan.textContent = '0';
    progressFill.style.width = '0%';
    
    // Remove inline results if they exist
    const resultsInline = document.querySelector('.results-inline');
    if (resultsInline) {
        resultsInline.remove();
    }
    
    // Scroll to test section
    document.getElementById('test').scrollIntoView({ behavior: 'smooth' });
}

// Add page animations on scroll
function addPageAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe formula cards
    document.querySelectorAll('.formula-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe example cards
    document.querySelectorAll('.example-card').forEach(card => {
        observer.observe(card);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth parallax effect to hero shapes
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const parallaxOffset = scrollPosition * (0.5 + index * 0.1);
        shape.style.transform = `translateY(${parallaxOffset}px)`;
    });
});

// Console message
console.log('%c🎓 Négyszög Tanulási Platform', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cTanulj meg a négyszögek területéről!', 'font-size: 14px; color: #64748b;');
