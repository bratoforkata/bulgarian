# Bulgarian Language Learning App - AI Agent Instructions

## Architecture Overview
This is a vanilla JavaScript web app with no build process. Core components:
- **index.html**: Welcome page with tab navigation
- **practice.html**: Intelligent word practice with statistics tracking and language toggle
- **dictionary.html**: Dictionary management with search and download functionality
- **words.json**: Primary data source (Bulgarian-English word pairs with statistics)
- **style.css**: Centralized styling with CSS variables
- **js/wordManager.js**: Word selection algorithm and statistics management
- **js/uiManager.js**: UI interactions, animations, and user preferences

## Essential References
**Always refer to `documentation/project_documentation.md`** for:
- Detailed architecture explanations
- Data flow diagrams and component interactions
- Development procedures and coding standards
- Recent modifications and project history
- Future enhancement plans

## Key Patterns & Conventions

### Data Management
- **Primary data source**: `words.json` contains structured word objects with statistics
- **Data structure**: `{id, bulgarian, english, stats: {attempts, successes, lastShown, successRate}}`
- **Duplicate prevention**: Compare `word.bulgarian.toLowerCase() + '|' + word.english.toLowerCase()`
- **Storage hierarchy**: localStorage (session) → words.json (persistent)
- **Statistics tracking**: Separate session stats from long-term word statistics

### Intelligent Word Selection
- **Priority Algorithm**: Never-shown (50pts) + Error rate (30pts) + Time boost (10pts) - Success rate (20pts)
- **Session tracking**: Prevents word repetition until full cycle completion
- **Weighted selection**: Top 30% priority words for optimal learning variety
- **Session reset**: Automatic reset when all words shown, clears tracking sets

### UI Patterns
- **Tab system**: Use `data-tab` attributes and `.active` class toggling
- **CSS variables**: `--bg`, `--card`, `--accent`, `--accent-2`, `--muted`, `--surface-shadow`, `--radius`
- **Button variants**: `.btn`, `.btn-secondary`, `.btn-ghost`
- **Layout**: `.container` max-width, `.card` components, `.controls` flex containers
- **Language toggle**: Switch between Bulgarian→English and English→Bulgarian modes
- **Progress animations**: 5-second countdown timer for translation reveal
- **Feedback system**: Success/failure/skip messages with auto-fade

### JavaScript Conventions
- **Modular architecture**: Separate WordManager and UIManager classes
- **Async patterns**: Use `async/await` for data operations
- **Error handling**: Try/catch with user-friendly alerts
- **DOM manipulation**: Prefer `classList.toggle()` over inline styles
- **Event listeners**: Use modern arrow functions and proper cleanup
- **State management**: Track current word, language mode, and animation states

### Critical Workflows
- **Practice session**: Start → Word selection → Reveal animation → User feedback → Auto-advance
- **Word prioritization**: Failed words get highest priority, success rate reduces priority
- **Statistics tracking**: Session stats separate from long-term word statistics
- **Language toggle**: Disabled during reveal animation to prevent confusion
- **Skip functionality**: Skip words without penalty, available during reveal animation
- **Loading data**: fetch words.json → parse → merge localStorage → remove duplicates → render
- **Tab navigation**: Initialize with `showTab('welcome')` on page load

### File Download
- **Blob API**: `new Blob([content], { type: 'text/plain;charset=utf-8' })`
- **Download trigger**: `URL.createObjectURL()`, `link.click()`, `URL.revokeObjectURL()`
- **UTF-8 encoding**: Use `btoa(encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))`

## Development Guidelines
- Keep all CSS in `style.css`, avoid inline styles
- Use semantic class names (`.search-controls`, `.download-controls`, `.dictionary-controls`)
- Handle Bulgarian UTF-8 characters properly in all string operations
- Test all functionality with proper error handling
- Maintain data consistency between localStorage and words.json
- Follow modular JavaScript architecture with WordManager and UIManager classes
- Update documentation immediately after any code changes</content>
<parameter name="filePath">c:\Users\FF\source\bulgarian\.github\copilot-instructions.md
