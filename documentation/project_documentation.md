# Bulgarian Language Learning App - Project Documentation

## Overview
This is a web-based Bulgarian language learning application consisting of HTML, CSS, and JavaScript files. The app helps users practice Bulgarian vocabulary through interactive exercises and manage a personal dictionary.

## Architecture
The application is built using vanilla JavaScript with no external dependencies. It uses:
- HTML for structure
- CSS for styling with CSS variables for theming
- JavaScript for functionality, data loading, and user interactions

## File Descriptions

### Core Files
- **index.html**: Entry point with welcome screen and navigation
- **practice.html**: Interactive practice mode with word display and feedback
- **dictionary.html**: Dictionary management interface
- **data.html**: Contains vocabulary data in a structured format
- **style.css**: Centralized styling with dark theme

### Data Files
- **Bulgarian.txt**: Plain text backup of vocabulary pairs
- **data.html**: Primary data source with words in "Bulgarian - English" format

### Documentation
- **README.md**: Main project README
- **documentation/project_documentation.md**: This detailed documentation

## Key Features

### Practice Mode
- Displays random English words
- Shows Bulgarian translation after 5 seconds
- Success/Fail buttons for user feedback
- Real-time accuracy percentage calculation
- Failed words tracking with copy functionality
- Buttons disabled until translation is revealed

### Dictionary
- Search functionality across Bulgarian and English terms
- Add new word pairs
- Save functionality to download updated data.html for persistence
- Table display with hover effects

### Data Management
- Loads words from data.html
- Parses text format: "bulgarian - english"
- In-memory storage for current session

## Code Structure

### JavaScript Patterns
- Async/await for data loading
- DOM manipulation for dynamic content
- Event listeners for user interactions
- Array methods for data processing

### CSS Architecture
- CSS variables for consistent theming
- Responsive design with media queries
- Hover and active states for interactivity
- Card-based layout with shadows

## Data Flow
1. App loads data from data.html on page load
2. Words parsed into array of objects: {bulgarian, english}
3. Practice mode selects random words from array
4. User interactions update local state (accuracy tracking, failed words)
5. Dictionary operations modify the words array and save to localStorage
6. Failed words are tracked separately for review

## Recent Modifications
- Removed unused code from index.html (practice/dict scripts not needed)
- Added accuracy tracking to practice.html
- Implemented success/fail feedback system
- Created documentation folder
- Updated README with comprehensive project info
- Added localStorage persistence to dictionary.html
- Added failed words tracking and copy functionality to practice.html
- Fixed dictionary loading with localStorage fallback

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
