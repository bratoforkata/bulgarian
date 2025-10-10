// SentenceManager - Handles sentence selection and multiple choice creation for practice
class SentenceManager {
    constructor() {
        this.sentences = [];
        this.sessionSentences = []; // Array of selected sentences for the session
        this.currentSentenceIndex = 0;
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0
        };
        this.sessionActive = false;
        this.currentLanguage = 'bulgarian'; // 'bulgarian' or 'english' - which language to practice
    }

    // Load sentences from sentences.json
    async loadSentences() {
        try {
            const response = await fetch('data/sentence-practise.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const sentences = await response.json();

            // No need to remove duplicates as the new format has unique ids
            this.sentences = sentences;

            console.log(`Loaded ${this.sentences.length} sentences`);
            return this.sentences;
        } catch (error) {
            console.error('Error loading sentences:', error);
            throw error;
        }
    }

    // Load words for distractors - not needed for new sentence format
    async loadWords() {
        // No longer needed as options are provided in sentences.json
        console.log('Words loading skipped - using pre-defined options');
    }

    // Set practice language
    setLanguage(language) {
        this.currentLanguage = language;
    }

    // Start a new session with random sentences
    startNewSession(numSentences = 20) {
        if (this.sentences.length < numSentences) {
            throw new Error('Not enough sentences available for a session');
        }

        // Shuffle and select sentences
        const shuffled = [...this.sentences].sort(() => Math.random() - 0.5);
        this.sessionSentences = shuffled.slice(0, numSentences);
        this.currentSentenceIndex = 0;
        this.sessionActive = true;

        // Reset session stats
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0
        };

        console.log(`Started new sentence session with ${this.sessionSentences.length} sentences`);
    }

    // Get next sentence with multiple choice
    getNextSentence() {
        if (!this.sessionActive || this.currentSentenceIndex >= this.sessionSentences.length) {
            return null;
        }

        const sentence = this.sessionSentences[this.currentSentenceIndex];
        this.currentSentenceIndex++;

        return {
            id: sentence.id,
            blankedSentence: sentence.question_bg,
            englishTranslation: sentence.translation_en,
            options: sentence.options,
            correctAnswer: sentence.options.indexOf(sentence.answer), // index of correct answer
            fullSentence: sentence.question_bg.replace(/____/g, sentence.answer)
        };
    }

    // Check if session is complete
    isSessionComplete() {
        return this.currentSentenceIndex >= this.sessionSentences.length;
    }

    // Record a result
    recordResult(isCorrect) {
        this.sessionStats.totalAttempts++;
        if (isCorrect) {
            this.sessionStats.successes++;
        } else {
            this.sessionStats.failures++;
        }
    }

    // Record sentence attempt (alias for recordResult)
    recordSentenceAttempt(id, success) {
        this.recordResult(success);
    }

    // Get session accuracy
    getSessionAccuracy() {
        if (this.sessionStats.totalAttempts === 0) return 0;
        return Math.round((this.sessionStats.successes / this.sessionStats.totalAttempts) * 100);
    }

    // Get session stats
    getSessionStats() {
        const attemptedSentences = this.sessionStats.successes + this.sessionStats.failures;
        const accuracyPercentage = attemptedSentences > 0 ? 
            Math.round((this.sessionStats.successes / attemptedSentences) * 100) : 0;

        return {
            ...this.sessionStats,
            accuracy: accuracyPercentage,
            totalSentencesInSession: this.sessionSentences.length,
            sentencesCompleted: this.currentSentenceIndex
        };
    }

    // Get final results
    getFinalResults() {
        return {
            totalSentences: this.sessionSentences.length,
            correct: this.sessionStats.successes,
            incorrect: this.sessionStats.failures,
            accuracy: this.getSessionAccuracy()
        };
    }
}
