# Daily Git Report

**Daily Git Report** is a VS Code extension that shows daily Git commits per contributor in a simple table format. It helps teams track who is working on which branch and how much work they are doing each day.

---

## Features

- Display daily commits per contributor
- Show commit count in a clean table inside VS Code
- Works with any Git repository opened in VS Code
- Tracks default branch (`main`) or configurable branches
- Easy to view team contributions without leaving VS Code

---

## Installation

### From VSIX

1. Download the `.vsix` file after building the extension.
2. Open VS Code → Extensions → Install from VSIX.
3. Select the downloaded `.vsix` file and install.

### From Marketplace

> Coming soon when published.

---

## Usage

1. Open a Git repository folder in VS Code.
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Palette.
3. Type `Show Daily Git Report` and select it.
4. A Webview panel opens showing a table of daily commits per contributor.

Example table:

| Date       | Contributor | Commits |
|------------|------------|---------|
| 2026-02-26 | Tanvir     | 3       |
| 2026-02-26 | Partner    | 2       |

---

## Requirements

- VS Code 1.80 or higher
- Node.js 18+ (for building the extension)
- Git installed and accessible from your system PATH

---

## Extension Settings

Currently, this extension uses the default branch `main`.  
Future versions may allow you to:

- Select branches to track
- Show lines added/deleted per commit
- Export report to CSV

---

## Contributing

Contributions are welcome! You can:

1. Fork the repository
2. Make your changes
3. Submit a Pull Request

---

## License

MIT License © 2026 Your Name

---

## Screenshots

![Daily Git Report Webview](https://user-images.githubusercontent.com/yourusername/daily-git-report-screenshot.png)

---

**Tip:** Use this extension to monitor daily team contributions and stay on top of ongoing development without leaving VS Code.