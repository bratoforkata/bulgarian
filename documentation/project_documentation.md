# Bulgarian Language Learning App - Project Documentation

## Overview
A web-based Bulgarian language learning application built with vanilla JavaScript. Features intelligent word prioritization, progress tracking, language toggle, and seamless vocabulary management with modular architecture.

## Architecture
- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Data**: JSON-based word storage with comprehensive statistics tracking
- **Storage**: localStorage for persistence + optional GitHub sync
- **Theme**: Dark mode with modern UI components
- **Architecture**: Modular JavaScript with WordManager and UIManager classes

## File Structure

### Core Application Files
- **index.html**: Welcome page and navigation
- **practice.html**: Interactive practice mode with intelligent word selection
- **dictionary.html**: Word management (search, download) with improved layout
- **style.css**: Centralized styling with CSS variables

### JavaScript Modules
- **js/wordManager.js**: Word selection algorithm, prioritization, and statistics management
- **js/uiManager.js**: UI interactions, animations, language toggle, and user preferences

### Data Files
- **data.json**: Primary vocabulary database (154+ Bulgarian-English word pairs with statistics)

### Documentation
- **README.md**: Project overview and usage instructions
- **documentation/project_documentation.md**: Technical documentation
- **.github/copilot-instructions.md**: AI assistant guidelines

## Key Features

### Intelligent Practice Mode
- **Smart Word Selection**: Prioritizes difficult words, deprioritizes mastered ones using weighted algorithm
- **Language Toggle**: Switch between Bulgarian→English and English→Bulgarian modes (disabled during animations)
- **Progress Tracking**: Success/Fail/Skip statistics with accuracy percentage and session management
- **Auto-Advancement**: Automatic progression after user feedback with smooth animations
- **Skip Functionality**: Skip words without penalty, works during reveal animation
- **Visual Progress**: Animated 5-second countdown timer for translation reveal
- **Session Management**: Separate session stats from long-term progress, reset functionality

### Enhanced Dictionary
- **Clean Interface**: Focus on words without distracting statistics, improved layout
- **Fast Search**: Real-time filtering across Bulgarian and English terms
- **Export**: Download complete vocabulary as text file
- **Optimized Layout**: Search and download controls on same line, larger table view (15+ words)

### Data Intelligence
- **Priority Algorithm**:
  - Never-shown words: +50 points (highest priority)
  - High error rate words: +30 points (increased priority)
  - High success rate words: -20 points (decreased priority)
  - Time-based boost: +10 points for words not seen recently
- **Statistics Tracking**: Success rate, attempts, last shown date per word
- **Session Management**: Track current session separately from long-term stats
- **Weighted Selection**: Top 30% priority words for optimal learning variety
  - High error rate words: Increased priority
  - High success rate words: Decreased priority
  - Time-based boost for words not seen recently
- **Statistics Tracking**: Success rate, attempts, last shown date per word
- **Session Management**: Track current session separately from long-term stats

## User Experience Flow

### Practice Session
1. **Start Practice** → Intelligent word selection begins based on priority algorithm
2. **Word Display** → Primary language shown with 5-second progress bar animation
3. **Translation Reveal** → Secondary language appears after countdown (language toggle disabled)
4. **User Feedback** → Choose Success ✓ / Fail ✗ / Skip ⏭ (skip works during animation)
5. **Auto-Advance** → Next word selected intelligently, cycle repeats
6. **Session Management** → Reset session stats without affecting long-term progress

### Word Management
- **Dictionary View** → Browse all vocabulary with real-time search
- **Download** → Export personal vocabulary for backup/sharing
- **Layout Optimization** → Controls aligned on single line, expanded table view

## Technical Implementation

### Word Prioritization Algorithm
```javascript
Priority = BaseWeight(10) + NeverShown(50) + ErrorRate(30) + 
           TimeBoost(10) - SuccessRate(20)
```

### Data Persistence
- **localStorage**: Word statistics, user preferences, session data
- **JSON Format**: Structured data with metadata for each word
- **Session Tracking**: Separate session stats from long-term statistics

### Performance Features
- **Weighted Random Selection**: Top 30% priority words for variety
- **Session Tracking**: Prevents repetition until full vocabulary cycle
- **Smart Reset**: Automatic session refresh when all words shown
- **Animation Management**: Smooth transitions with proper state management

## Browser Compatibility
- Modern browsers with ES6+ support
- localStorage API required
- fetch API for data loading
- CSS Grid and Flexbox for layout

## Development Notes
- No build process required - direct file serving
- Modular JavaScript architecture for maintainability
- CSS variables for consistent theming
- Responsive design for mobile/desktop use

## Hosting & Deployment
- Works as static files (can be hosted on GitHub Pages, Netlify, Vercel, etc.)
- All data persists in browser localStorage for offline functionality
- No build process required - direct file serving
- Modular JavaScript architecture for easy maintenance
- Responsive design works on mobile and desktop

## Recent Major Updates
- ✅ **Data Migration**: Converted from HTML to structured JSON format with statistics
- ✅ **Intelligent Prioritization**: Implemented weighted algorithm for optimal word selection
- ✅ **Language Toggle**: Added Bulgarian↔English mode switching with proper state management
- ✅ **Skip Functionality**: Skip words during reveal animation without penalty
- ✅ **Enhanced UI**: Improved dictionary layout, button states, and progress animations
- ✅ **Modular Architecture**: Separated WordManager and UIManager classes
- ✅ **Statistics Tracking**: Separate session and long-term statistics with proper persistence
- ✅ **Animation Management**: Smooth transitions with proper state control
- ✅ **Documentation Updates**: Comprehensive documentation reflecting current architecture

## Future Enhancements
- Audio pronunciation for words
- User accounts and progress synchronization
- Multiple difficulty levels and categories
- Study streaks and achievement system
- Import/export functionality for custom word lists

## Development Procedures

### Standard Operating Procedures for Code Changes

**Important**: These procedures must be followed every time the code is changed to maintain project integrity and documentation accuracy.

1. **After each code modification**:
   - Update the relevant documentation immediately
   - Ensure documentation reflects the current state of the code
   - Add details about new features, changes, or fixes

2. **Respect Documentation**:
   - Always keep documentation current and accurate
   - Use clear, consistent language in documentation
   - Include technical details that would help other developers or LLMs understand the code

3. **Follow Standard Operating Procedures**:
   - Test changes before documenting
   - Document both what was changed and why
   - Update file descriptions, architecture notes, and usage instructions as needed
   - Maintain consistency across all documentation files

### Documentation Update Checklist
- [ ] Update README.md with new features or changes
- [ ] Update project_documentation.md with technical details
- [ ] Add changelog entries for significant changes
- [ ] Ensure all code comments are current
- [ ] Verify documentation builds/validates correctly

Failure to follow these procedures may result in outdated documentation and confusion for future development.
