# Bulgarian Language Learning App - Project Documentation

## Overview
A web-based Bulgarian language learning application built with vanilla JavaScript. Features intelligent word prioritization, progress tracking, and seamless vocabulary management.

## Architecture
- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Data**: JSON-based word storage with statistics tracking
- **Storage**: localStorage for persistence + optional GitHub sync
- **Theme**: Dark mode with modern UI components

## File Structure

### Core Application Files
- **index.html**: Welcome page and navigation
- **practice.html**: Interactive practice mode with intelligent word selection
- **dictionary.html**: Word management (add, search, download)
- **style.css**: Centralized styling with CSS variables

### JavaScript Modules
- **js/wordManager.js**: Word selection, prioritization, and statistics
- **js/uiManager.js**: UI interactions, animations, and user preferences

### Data Files
- **data.json**: Primary vocabulary database (154+ Bulgarian-English word pairs)

### Documentation
- **README.md**: Project overview
- **documentation/project_documentation.md**: Technical documentation

## Key Features

### Intelligent Practice Mode
- **Smart Word Selection**: Prioritizes difficult words, deprioritizes mastered ones
- **Language Toggle**: Switch between Bulgarian→English and English→Bulgarian modes
- **Progress Tracking**: Success/Fail/Skip statistics with accuracy percentage
- **Auto-Advancement**: Automatic progression after user feedback
- **Skip Functionality**: Skip words without penalty, see them again later
- **Visual Progress**: Animated countdown timer for translation reveal

### Enhanced Dictionary
- **Clean Interface**: Focus on words without distracting statistics
- **Fast Search**: Real-time filtering across Bulgarian and English terms
- **Easy Add**: Add new word pairs with duplicate detection
- **Export**: Download complete vocabulary as text file
- **GitHub Sync**: Optional cloud synchronization

### Data Intelligence
- **Priority Algorithm**: 
  - Never-shown words: Highest priority
  - High error rate words: Increased priority
  - High success rate words: Decreased priority
  - Time-based boost for words not seen recently
- **Statistics Tracking**: Success rate, attempts, last shown date per word
- **Session Management**: Track current session separately from long-term stats

## User Experience Flow

### Practice Session
1. **Start Practice** → Intelligent word selection begins
2. **Word Display** → Primary language shown with progress bar
3. **Translation Reveal** → Secondary language appears after 5 seconds
4. **User Feedback** → Choose Success ✓ / Fail ✗ / Skip ⏭
5. **Auto-Advance** → Next word selected intelligently, cycle repeats

### Word Management
- **Dictionary View** → Browse all vocabulary with search
- **Add Words** → Simple Bulgarian-English input with validation
- **Download** → Export personal vocabulary for backup/sharing

## Technical Implementation

### Word Prioritization Algorithm
```javascript
Priority = BaseWeight(10) + NeverShown(50) + ErrorRate(30) + 
           TimeBoost(10) - SuccessRate(20)
```

### Data Persistence
- **localStorage**: Word statistics, user preferences, session data
- **JSON Format**: Structured data with metadata for each word
- **GitHub API**: Optional cloud sync for vocabulary updates

### Performance Features
- **Weighted Random Selection**: Top 30% priority words for variety
- **Session Tracking**: Prevents repetition until full vocabulary cycle
- **Smart Reset**: Automatic session refresh when all words shown

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
- Works as static files (can be hosted on GitHub Pages, Netlify, etc.)
- Add word functionality works locally via localStorage
- GitHub sync requires PAT token for write access to repository
- All data persists in browser localStorage for offline functionality
- Implemented success/fail feedback system
- Created documentation folder
- Updated README with comprehensive project info
- Added localStorage persistence to dictionary.html
- Added failed words tracking and copy functionality to practice.html
- Fixed dictionary loading with localStorage fallback
- Implemented GitHub API integration for updating data.html
- Added duplicate prevention in dictionary additions
- Removed hardcoded branch names and unnecessary files
- Cleaned up code across all files

## Future Enhancements
- Persistent storage (localStorage/IndexedDB)
- User progress tracking
- Multiple difficulty levels
- Audio pronunciation
- Export/import functionality

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
