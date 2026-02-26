import * as vscode from 'vscode';
import { DailyReport } from './reportGenerator';

export function showReportWebview(report: DailyReport) {
  const panel = vscode.window.createWebviewPanel(
    'dailyGitReport',
    'Daily Git Report',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );

  // Sort dates descending (newest first)
  const sortedDates = Object.keys(report).sort((a, b) => b.localeCompare(a));

  let tableRows = '';
  let grandTotal = 0;

  sortedDates.forEach(date => {
    const authors = Object.keys(report[date]).sort();
    let dayTotal = 0;

    authors.forEach(author => {
      const count = report[date][author].commits;
      dayTotal += count;
      grandTotal += count;

      tableRows += `
                <tr>
                    <td>${date}</td>
                    <td>${author}</td>
                    <td style="text-align: center;">${count}</td>
                </tr>`;
    });

    // Optional: add day total row
    tableRows += `
            <tr style="font-weight: bold; background: #f0f0f0;">
                <td>${date}</td>
                <td>Day Total</td>
                <td style="text-align: center;">${dayTotal}</td>
            </tr>`;
  });

  // Simple inline CSS + total
  panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Daily Git Report</title>
            <style>
                body { font-family: var(--vscode-font-family); padding: 16px; color: var(--vscode-foreground); background: var(--vscode-editor-background); }
                h2 { margin-top: 0; color: var(--vscode-textPreformat-foreground); }
                table { border-collapse: collapse; width: 100%; margin-top: 12px; }
                th, td { border: 1px solid var(--vscode-editor-foreground); padding: 8px; text-align: left; }
                th { background: var(--vscode-editor-lineHighlightBackground); }
                tr:nth-child(even) { background: var(--vscode-editor-lineHighlightBorder); }
                .total { font-weight: bold; font-size: 1.1em; margin-top: 16px; }
            </style>
        </head>
        <body>
            <h2>Git Commit Report by Day & Contributor</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Contributor</th>
                        <th>Commits</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>

            <div class="total">
                Grand Total Commits: ${grandTotal}
            </div>
        </body>
        </html>
    `;
}