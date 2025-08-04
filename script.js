class PronunciationApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.audio = null;
        this.isPlaying = false;
        
        this.initializeElements();
        this.loadQuestions();
        this.setupEventListeners();
    }

    initializeElements() {
        this.sentenceBefore = document.getElementById('sentence-before');
        this.sentenceAfter = document.getElementById('sentence-after');
        this.answerInput = document.getElementById('answer-input');
        this.playButton = document.getElementById('play-button');
        this.checkButton = document.getElementById('check-button');
        this.nextButton = document.getElementById('next-button');
        this.feedback = document.getElementById('feedback');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.accentName = document.getElementById('accent-name');
    }

    async loadQuestions() {
        try {
            const response = await fetch('questions.json');
            const data = await response.json();
            this.questions = data.questions;
            this.totalQuestionsSpan.textContent = this.questions.length;
            this.displayQuestion();
        } catch (error) {
            console.error('Error loading questions:', error);
            this.feedback.textContent = 'Error loading questions. Please check if questions.json exists.';
            this.feedback.className = 'feedback incorrect';
        }
    }

    setupEventListeners() {
        this.playButton.addEventListener('click', () => this.toggleAudio());
        this.checkButton.addEventListener('click', () => this.checkAnswer());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
    }

    displayQuestion() {
        if (this.questions.length === 0) return;

        const question = this.questions[this.currentQuestionIndex];
        this.sentenceBefore.textContent = question.sentenceBefore;
        this.sentenceAfter.textContent = question.sentenceAfter;
        this.answerInput.value = '';
        this.answerInput.focus();
        
        // Display accent information
        this.accentName.textContent = question.accent || 'Unknown';
        
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        
        this.checkButton.style.display = 'inline-flex';
        this.nextButton.style.display = 'none';
        
        // Preload audio
        this.loadAudio(question.audioFile);
    }

    loadAudio(audioFile) {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        
        this.audio = new Audio(audioFile);
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.feedback.textContent = 'Error loading audio file.';
            this.feedback.className = 'feedback incorrect';
        });
    }

    toggleAudio() {
        if (!this.audio) return;

        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play();
            this.isPlaying = true;
        }
        
        this.updatePlayButton();
    }

    updatePlayButton() {
        const playIcon = this.playButton.querySelector('.play-icon');
        const playText = this.playButton.querySelector('.play-text');
        
        if (this.isPlaying) {
            playIcon.textContent = '⏸';
            playText.textContent = 'Pause';
            this.playButton.classList.add('playing');
        } else {
            playIcon.textContent = '▶';
            playText.textContent = 'Play Audio';
            this.playButton.classList.remove('playing');
        }
    }

    checkAnswer() {
        const userAnswer = this.answerInput.value.trim().toLowerCase();
        const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            this.feedback.textContent = 'Correct! Well done! 🎉';
            this.feedback.className = 'feedback correct';
        } else {
            this.feedback.textContent = `Incorrect. The correct answer is: "${this.questions[this.currentQuestionIndex].correctAnswer}"`;
            this.feedback.className = 'feedback incorrect';
        }
        
        this.checkButton.style.display = 'none';
        this.nextButton.style.display = 'inline-flex';
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            // Quiz completed
            this.feedback.textContent = 'Congratulations! You have completed all questions! 🎊';
            this.feedback.className = 'feedback correct';
            this.checkButton.style.display = 'none';
            this.nextButton.style.display = 'none';
            this.answerInput.disabled = true;
            return;
        }
        
        this.displayQuestion();
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PronunciationApp();
}); 