// WordManager - Handles word selection, prioritization, and tracking
class WordManager {
    constructor() {
        this.words = [];
        this.shownWordsInSession = new Set();
        this.skippedWordsInSession = new Set(); // Track skipped words
        this.failedWordsInSession = new Set(); // Track failed words in current session
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0,
            skipped: 0
        };
    }

    // Load words from JSON file
    async loadWords() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            this.words = data.words;
            
            console.log(`Loaded ${this.words.length} words`);
            return this.words;
        } catch (error) {
            console.error('Error loading words:', error);
            throw error;
        }
    }

    // Get next word using intelligent prioritization
    getNextWord() {
        if (this.words.length === 0) return null;

        // Reset session if all words have been shown (including skipped ones)
        if (this.shownWordsInSession.size >= this.words.length) {
            this.shownWordsInSession.clear();
            this.skippedWordsInSession.clear();
        }

        // Filter out recently shown words, but include previously skipped words if we're running low
        let availableWords = this.words.filter(word => !this.shownWordsInSession.has(word.id));
        
        // If no available words, include skipped words from this session
        if (availableWords.length === 0) {
            availableWords = this.words.filter(word => this.skippedWordsInSession.has(word.id));
            // Clear skipped tracking since we're revisiting them
            this.skippedWordsInSession.clear();
        }
        
        if (availableWords.length === 0) return null;

        // Calculate priorities for available words
        const wordPriorities = availableWords.map(word => ({
            word,
            priority: this.calculateWordPriority(word)
        }));

        // Sort by priority (higher priority first)
        wordPriorities.sort((a, b) => b.priority - a.priority);

        // Use weighted random selection from top 30% of prioritized words
        const topWordsCount = Math.max(1, Math.floor(wordPriorities.length * 0.3));
        const topWords = wordPriorities.slice(0, topWordsCount);
        
        // Weighted random selection
        const totalWeight = topWords.reduce((sum, item) => sum + item.priority, 0);
        const randomValue = Math.random() * totalWeight;
        
        let cumulativeWeight = 0;
        for (const item of topWords) {
            cumulativeWeight += item.priority;
            if (randomValue <= cumulativeWeight) {
                const selectedWord = item.word;
                this.shownWordsInSession.add(selectedWord.id);
                return selectedWord;
            }
        }

        // Fallback to first word
        const fallbackWord = topWords[0].word;
        this.shownWordsInSession.add(fallbackWord.id);
        return fallbackWord;
    }

    // Calculate word priority based on various factors
    calculateWordPriority(word) {
        let priority = 10; // Base priority

        // Never shown words get highest priority
        if (word.stats.attempts === 0) {
            priority += 50;
        } else {
            // Calculate error rate
            const errorRate = word.stats.attempts > 0 ? 
                (word.stats.attempts - word.stats.successes) / word.stats.attempts : 0;
            
            // Higher error rate = higher priority
            priority += errorRate * 30;
            
            // Lower success rate = higher priority
            const successRate = word.stats.attempts > 0 ? 
                word.stats.successes / word.stats.attempts : 0;
            priority -= successRate * 20;
            
            // Words shown long ago get slight priority boost
            if (word.stats.lastShown) {
                const daysSinceShown = (Date.now() - new Date(word.stats.lastShown).getTime()) / (1000 * 60 * 60 * 24);
                priority += Math.min(daysSinceShown * 2, 10);
            }
        }

        return Math.max(1, priority); // Minimum priority of 1
    }

    // Record word attempt result
    recordWordAttempt(wordId, success) {
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;

        word.stats.attempts++;
        if (success) {
            word.stats.successes++;
            this.sessionStats.successes++;
        } else {
            this.sessionStats.failures++;
            // Add to current session failed words
            this.failedWordsInSession.add(wordId);
        }
        
        word.stats.lastShown = new Date().toISOString();
        word.stats.successRate = word.stats.attempts > 0 ? 
            word.stats.successes / word.stats.attempts : 0;

        this.sessionStats.totalAttempts++;

        // Save to localStorage
        this.saveStatsToStorage();
    }

    // Skip a word (doesn't affect stats)
    skipWord(wordId) {
        this.skippedWordsInSession.add(wordId);
        this.sessionStats.skipped++;
        // Remove from shown words so it can come back later
        this.shownWordsInSession.delete(wordId);
    }

    // Get session statistics
    getSessionStats() {
        const accuracyPercentage = this.sessionStats.totalAttempts > 0 ? 
            Math.round((this.sessionStats.successes / this.sessionStats.totalAttempts) * 100) : 0;

        return {
            ...this.sessionStats,
            accuracy: accuracyPercentage,
            totalWords: this.words.length,
            wordsShownThisSession: this.shownWordsInSession.size
        };
    }

    // Reset session stats
    resetSessionStats() {
        this.sessionStats = {
            totalAttempts: 0,
            successes: 0,
            failures: 0,
            skipped: 0
        };
        this.shownWordsInSession.clear();
        this.skippedWordsInSession.clear();
        this.failedWordsInSession.clear(); // Clear failed words for current session
    }

    // Load stats from localStorage
    loadStatsFromStorage() {
        try {
            const savedStats = localStorage.getItem('bulgarianWordsStats');
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                
                // Merge saved stats with current words
                this.words.forEach(word => {
                    const savedWord = parsedStats[word.id];
                    if (savedWord) {
                        word.stats = {
                            ...word.stats,
                            ...savedWord
                        };
                    }
                });
            }
        } catch (error) {
            console.error('Error loading stats from localStorage:', error);
        }
    }

    // Save stats to localStorage
    saveStatsToStorage() {
        try {
            const statsToSave = {};
            this.words.forEach(word => {
                statsToSave[word.id] = word.stats;
            });
            
            localStorage.setItem('bulgarianWordsStats', JSON.stringify(statsToSave));
        } catch (error) {
            console.error('Error saving stats to localStorage:', error);
        }
    }

    // Get words that were failed in current session
    getFailedWordsInSession() {
        return this.words.filter(word => this.failedWordsInSession.has(word.id));
    }

    // Export all word data
    exportData() {
        return {
            words: this.words,
            exportDate: new Date().toISOString(),
            sessionStats: this.sessionStats
        };
    }
}
