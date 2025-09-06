# Bulgarian Language Learning App - AI Agent Instructions

## Architecture Overview
This is a vanilla JavaScript web app with no build process. Core components:
- **index.html**: Welcome page with tab navigation
- **practice.html**: Word practice with accuracy tracking
- **dictionary.html**: Dictionary management with GitHub integration
- **data.html**: Primary data source (Bulgarian-English word pairs)
- **style.css**: Centralized styling with CSS variables

## Essential References
**Always refer to `documentation/project_documentation.md`** for:
- Detailed architecture explanations
- Data flow diagrams and component interactions
- Development procedures and coding standards
- Recent modifications and project history
- Future enhancement plans

## Key Patterns & Conventions

### Data Management
- **Primary data source**: `data.html` contains words in `<div id="dictionary-data">` as "bulgarian - english" lines
- **Data parsing**: Use `parseText()` function to split lines and create `{bulgarian, english}` objects
- **Duplicate prevention**: Compare `word.bulgarian.toLowerCase() + '|' + word.english.toLowerCase()`
- **Storage hierarchy**: localStorage (session) → data.html (persistent) → GitHub (remote)

### GitHub Integration
- **API endpoint**: `https://api.github.com/repos/bratoforkata/bulgarian/contents/data.html`
- **Authentication**: Prompt user for PAT token, use `Authorization: token ${pat}`
- **UTF-8 encoding**: Use `btoa(encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))`
- **File updates**: GET current SHA, PUT with new content + SHA + commit message

### UI Patterns
- **Tab system**: Use `data-tab` attributes and `.active` class toggling
- **CSS variables**: `--bg`, `--card`, `--accent`, `--accent-2`, `--muted`, `--surface-shadow`, `--radius`
- **Button variants**: `.btn`, `.btn-secondary`, `.btn-ghost`
- **Layout**: `.container` max-width, `.card` components, `.controls` flex containers

### JavaScript Conventions
- **Async patterns**: Use `async/await` for fetch operations
- **Error handling**: Try/catch with user-friendly alerts
- **DOM manipulation**: Prefer `classList.toggle()` over inline styles
- **Event listeners**: Use modern arrow functions and proper cleanup

### File Download
- **Blob API**: `new Blob([content], { type: 'text/plain;charset=utf-8' })`
- **Download trigger**: `URL.createObjectURL()`, `link.click()`, `URL.revokeObjectURL()`

### Critical Workflows
- **Adding words**: Check duplicates → update localStorage → update GitHub → clear inputs
- **Loading data**: fetch data.html → parse → merge localStorage → remove duplicates → render
- **Tab navigation**: Initialize with `showTab('welcome')` on page load

## Development Guidelines
- Keep all CSS in `style.css`, avoid inline styles
- Use semantic class names (`.search-controls`, `.download-controls`)
- Handle Bulgarian UTF-8 characters properly in all string operations
- Test GitHub API calls with proper error handling
- Maintain data consistency between localStorage, data.html, and GitHub</content>
<parameter name="filePath">c:\Users\FF\source\bulgarian\.github\copilot-instructions.md
