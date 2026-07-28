// UIManager - Handles user interface updates and interactions
class UIManager {
    constructor() {
        this.isLanguageToggled = false; // false = Bulgarian first, true = English first
        this.currentWord = null;
        this.progressBar = null;
        this.progressTimer = null;
        this.revealDelay = 5000; // 5 seconds
        this.currentSentence = null;
        this.onOptionSelected = null;
    }

    // Initialize UI components
    init() {
        this.loadUserPreferences();
        this.setupProgressBar();
        this.updateLanguageToggleButton();
    }

    // Setup progress bar element
    setupProgressBar() {
        const practiceActions = document.querySelector('.practice-actions');
        if (practiceActions) {
            // Create progress container
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = '<div class="progress-fill"></div>';
            
            const progressText = document.createElement('div');
            progressText.className = 'progress-text';
            progressText.textContent = 'Click "Start Practice" to begin';
            
            progressContainer.appendChild(progressText);
            progressContainer.appendChild(progressBar);
            
            // Insert before the next button
            const nextButton = document.getElementById('next');
            practiceActions.insertBefore(progressContainer, nextButton);
            
            this.progressBar = progressContainer;
        }
    }

    // Display word based on current language mode
    displayWord(word, showTranslation = false) {
        if (!word) return;
        
        this.currentWord = word;
        
        // Show the word practice help text for word practice
        const practiceHelp = document.querySelector('.practice-help');
        if (practiceHelp) {
            practiceHelp.style.display = 'block';
        }
        
        const primaryElement = document.getElementById('word-english');
        const secondaryElement = document.getElementById('word-bulgarian');
        
        if (this.isLanguageToggled) {
            // English first mode
            primaryElement.textContent = word.english;
            secondaryElement.textContent = showTranslation ? word.bulgarian : '...';
        } else {
            // Bulgarian first mode (default)
            primaryElement.textContent = word.bulgarian;
            secondaryElement.textContent = showTranslation ? word.english : '...';
        }
        
        this.updateProgressText();
    }

    // Start word reveal countdown
    startWordReveal(word, onReveal) {
        this.displayWord(word, false);
        
        // Enable both success and fail buttons immediately
        this.setActionButtonsEnabled(true);
        
        // Start progress animation
        this.startProgressAnimation(() => {
            this.displayWord(word, true);
            if (onReveal) onReveal();
        });
    }

    // Start progress bar animation
    startProgressAnimation(onComplete) {
        if (!this.progressBar) return;
        
        const progressFill = this.progressBar.querySelector('.progress-fill');
        const progressText = this.progressBar.querySelector('.progress-text');
        
        // Reset progress bar
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        
        // Force reflow to ensure the reset takes effect
        progressFill.offsetHeight;
        
        // Start animation
        progressFill.style.transition = `width ${this.revealDelay}ms linear`;
        progressFill.style.width = '100%';
        
        // Update countdown text
        let timeLeft = Math.ceil(this.revealDelay / 1000);
        const updateCountdown = () => {
            if (timeLeft > 0) {
                progressText.textContent = `Revealing translation in ${timeLeft}s...`;
                timeLeft--;
                this.progressTimer = setTimeout(updateCountdown, 1000);
            } else {
                progressText.textContent = 'Translation revealed!';
                if (onComplete) onComplete();
            }
        };
        
        updateCountdown();
    }

    // Stop progress animation
    stopProgressAnimation() {
        if (this.progressTimer) {
            clearTimeout(this.progressTimer);
            this.progressTimer = null;
        }
        
        if (this.progressBar) {
            const progressFill = this.progressBar.querySelector('.progress-fill');
            const progressText = this.progressBar.querySelector('.progress-text');
            
            progressFill.style.width = '0%';
            progressText.textContent = 'Ready for next word';
        }
    }

    // Update progress text based on current state
    updateProgressText() {
        if (!this.progressBar) return;
        
        const progressText = this.progressBar.querySelector('.progress-text');
        const mode = this.isLanguageToggled ? 'English → Bulgarian' : 'Bulgarian → English';
        progressText.textContent = `Mode: ${mode}`;
    }

    // Toggle language display mode
    toggleLanguageMode() {
        this.isLanguageToggled = !this.isLanguageToggled;
        this.saveUserPreferences();
        this.updateLanguageToggleButton();
        
        // Redisplay current word if exists
        if (this.currentWord) {
            this.displayWord(this.currentWord, true);
        }
    }

    // Update language toggle button text
    updateLanguageToggleButton(mode = 'words') {
        const toggleButton = document.getElementById('language-toggle');
        if (toggleButton) {
            if (mode === 'words' || mode === 'sentences') {
                toggleButton.disabled = false;
                const modeText = this.isLanguageToggled ? 'English → Bulgarian' : 'Bulgarian → English';
                toggleButton.textContent = `Mode: ${modeText}`;
            } else {
                toggleButton.disabled = true;
                toggleButton.textContent = 'Mode: Bulgarian → English';
            }
            toggleButton.title = 'Click to switch practice mode';
        }
    }

    // Enable/disable action buttons
    setActionButtonsEnabled(enabled) {
        const buttons = ['success-btn', 'fail-btn'];
        buttons.forEach(btnId => {
            const button = document.getElementById(btnId);
            if (button) {
                button.disabled = !enabled;
            }
        });
    }

    // Update statistics display
    updateStatsDisplay(stats) {
        // Update accuracy display
        const accuracyDisplay = document.querySelector('.accuracy-display');
        if (accuracyDisplay) {
            accuracyDisplay.textContent = `Accuracy: ${stats.accuracy}%`;
        }

        // Update detailed stats
        const statsContainer = document.querySelector('.stats-details');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Success:</span>
                    <span class="stat-value">${stats.successes}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Failed:</span>
                    <span class="stat-value">${stats.failures}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Attempted:</span>
                    <span class="stat-value">${stats.successes + stats.failures}</span>
                </div>
            `;
        }
    }

    // Show success feedback
    showSuccessFeedback() {
        this.showFeedback('✓ Correct!', 'success');
    }

    // Show failure feedback
    showFailureFeedback() {
        this.showFeedback('✗ Try again next time', 'failure');
    }

    // Show sentence result feedback
    showSentenceResult(success) {
        const message = success ? '✓ Correct!' : '✗ Incorrect';
        const type = success ? 'success' : 'failure';
        this.showFeedback(message, type);
    }

    // Show feedback message
    showFeedback(message, type) {
        const feedbackElement = document.getElementById('feedback-message');
        if (feedbackElement) {
            feedbackElement.textContent = message;
            feedbackElement.className = `feedback-message ${type}`;
            feedbackElement.style.opacity = '1';
            
            setTimeout(() => {
                feedbackElement.style.opacity = '0';
            }, 2000);
        }
    }

    // Save user preferences to localStorage
    saveUserPreferences() {
        try {
            const preferences = {
                isLanguageToggled: this.isLanguageToggled,
                revealDelay: this.revealDelay
            };
            localStorage.setItem('bulgarianAppPreferences', JSON.stringify(preferences));
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    }

    // Load user preferences from localStorage
    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('bulgarianAppPreferences');
            if (saved) {
                const preferences = JSON.parse(saved);
                this.isLanguageToggled = preferences.isLanguageToggled || false;
                this.revealDelay = preferences.revealDelay || 5000;
            }
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    }

    // Auto-advance to next word after user action
    autoAdvanceAfterAction(onNextWord) {
        this.stopProgressAnimation();
        this.setActionButtonsEnabled(false);
        
        // Brief delay before advancing
        setTimeout(() => {
            if (onNextWord) onNextWord();
        }, 1500);
    }

    // Display sentence with multiple choice options
    displaySentence(sentenceData) {
        const primaryElement = document.getElementById('word-english');
        const secondaryElement = document.getElementById('word-bulgarian');
        const practiceActions = document.querySelector('.practice-actions');

        // Clear previous content
        primaryElement.innerHTML = '';
        secondaryElement.innerHTML = '';
        if (practiceActions) practiceActions.innerHTML = '';

        // Hide the word practice help text for sentence practice
        const practiceHelp = document.querySelector('.practice-help');
        if (practiceHelp) {
            practiceHelp.style.display = 'none';
        }

        const sentenceText = sentenceData.blankedSentence;
        const translationText = sentenceData.englishTranslation;

        // Display blanked sentence
        primaryElement.textContent = sentenceText;

        // Display translation
        secondaryElement.textContent = translationText;

        // Create option buttons in practice-actions
        if (practiceActions) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'sentence-options';
            const cyrillicLetters = ['А', 'Б', 'В'];
            optionsContainer.innerHTML = sentenceData.options.map((option, index) =>
                `<button class="option-btn" data-index="${index}">${cyrillicLetters[index]}. ${option}</button>`
            ).join('');
            practiceActions.appendChild(optionsContainer);
        }

        this.currentSentence = sentenceData;
        this.updateProgressText();
    }

    // Start sentence reveal (for sentences, show options immediately)
    startSentenceReveal(sentenceData, onReady) {
        this.displaySentence(sentenceData);

        // Enable action buttons (but hide them for multiple choice)
        this.setActionButtonsEnabled(false);

        // Enable skip button for sentences
        const skipButton = document.getElementById('skip-btn');
        if (skipButton) {
            skipButton.disabled = false;
        }

        // Add click handlers to options
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleOptionClick(btn, sentenceData.correctAnswer, sentenceData));
        });

        if (onReady) onReady();
    }

    // Handle option button click
    handleOptionClick(button, correctIndex, sentenceData) {
        const selectedIndex = parseInt(button.dataset.index);
        const isCorrect = selectedIndex === correctIndex;

        // Disable all buttons
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(btn => {
            btn.disabled = true;
            const btnIndex = parseInt(btn.dataset.index);
            if (btnIndex === correctIndex) {
                btn.classList.add('correct');
            } else if (btnIndex === selectedIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Show completed sentence
        const primaryElement = document.getElementById('word-english');
        if (primaryElement && sentenceData.fullSentence) {
            primaryElement.textContent = sentenceData.fullSentence;
        }

        // Trigger result after a delay
        setTimeout(() => {
            if (this.onOptionSelected) {
                this.onOptionSelected(isCorrect);
            }
        }, 1500);
    }

    // Set callback for option selection
    setOptionCallback(callback) {
        this.onOptionSelected = callback;
    }

    // Clear sentence options
    clearSentenceOptions() {
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
    }
}
