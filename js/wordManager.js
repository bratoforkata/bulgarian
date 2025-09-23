// WordManager - Handles word selection and session management
class WordManager {
    constructor() {
        this.words = [];
        this.sessionWords = []; // Array of 65 randomly selected words for the session
        this.currentWordIndex = 0; // Index in sessionWords
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0,
            skipped: 0
        };
        this.sessionActive = false;
    }

    // Load words from JSON file
    async loadWords() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            let words = data.words;
            
            // Remove duplicates based on bulgarian|english combination
            const seen = new Set();
            words = words.filter(word => {
                const key = word.bulgarian.toLowerCase() + '|' + word.english.toLowerCase();
                if (seen.has(key)) {
                    console.warn(`Duplicate word removed: ${word.bulgarian} - ${word.english}`);
                    return false;
                }
                seen.add(key);
                return true;
            });
            
            this.words = words;
            
            console.log(`Loaded ${this.words.length} words`);
            return this.words;
        } catch (error) {
            console.error('Error loading words:', error);
            throw error;
        }
    }

    // Start a new session with 65 random words
    startNewSession() {
        if (this.words.length < 65) {
            throw new Error('Not enough words available for a session');
        }

        // Shuffle the words array and take first 65
        const shuffled = [...this.words].sort(() => Math.random() - 0.5);
        this.sessionWords = shuffled.slice(0, 65);
        this.currentWordIndex = 0;
        this.sessionActive = true;

        // Reset session stats
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0,
            skipped: 0
        };

        console.log(`Started new session with ${this.sessionWords.length} words`);
    }

    // Get next word in the session
    getNextWord() {
        if (!this.sessionActive || this.currentWordIndex >= this.sessionWords.length) {
            return null;
        }

        const word = this.sessionWords[this.currentWordIndex];
        this.currentWordIndex++;
        return word;
    }

    // Check if session is complete
    isSessionComplete() {
        return this.sessionActive && this.currentWordIndex >= this.sessionWords.length;
    }

    // Record word attempt result
    recordWordAttempt(wordId, success) {
        if (success) {
            this.sessionStats.successes++;
        } else {
            this.sessionStats.failures++;
        }
        
        this.sessionStats.totalAttempts++;
    }

    // Skip a word
    skipWord(wordId) {
        this.sessionStats.skipped++;
        this.sessionStats.totalAttempts++;
    }

    // Get session statistics
    getSessionStats() {
        const attemptedWords = this.sessionStats.successes + this.sessionStats.failures;
        const accuracyPercentage = attemptedWords > 0 ? 
            Math.round((this.sessionStats.successes / attemptedWords) * 100) : 0;

        return {
            ...this.sessionStats,
            accuracy: accuracyPercentage,
            totalWordsInSession: this.sessionWords.length,
            wordsCompleted: this.currentWordIndex
        };
    }

    // Reset session
    resetSession() {
        this.sessionWords = [];
        this.currentWordIndex = 0;
        this.sessionActive = false;
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0,
            skipped: 0
        };
    }

    // Get final results for completed session
    getFinalResults() {
        if (!this.isSessionComplete()) {
            return null;
        }

        const attemptedWords = this.sessionStats.successes + this.sessionStats.failures;
        const accuracy = attemptedWords > 0 ? 
            Math.round((this.sessionStats.successes / attemptedWords) * 100) : 0;

        return {
            totalWords: this.sessionWords.length,
            correct: this.sessionStats.successes,
            incorrect: this.sessionStats.failures,
            skipped: this.sessionStats.skipped,
            accuracy: accuracy
        };
    }
}
