import * as vscode from 'vscode';
import { getCommits } from './gitService';
import { generateDailyReport } from './reportGenerator';
import { showReportWebview } from './webview';

export function activate(context: vscode.ExtensionContext) {
    console.log('Daily Git Report extension is now active');

    const disposable = vscode.commands.registerCommand(
        'dailyGitReport.showReport',
        async () => {
            if (!vscode.workspace.workspaceFolders?.length) {
                vscode.window.showErrorMessage('Please open a folder/workspace that contains a Git repository.');
                return;
            }

            const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

            try {
                const commits = await getCommits(rootPath); // uses HEAD/current branch if no branch specified
                const report = generateDailyReport(commits);

                if (Object.keys(report).length === 0) {
                    vscode.window.showInformationMessage('No commits found in the repository history.');
                    return;
                }

                showReportWebview(report); // only report is passed (context removed)
            } catch (err: any) {
                console.error('[Daily Git Report]', err);
                const msg = err.message?.includes('not a git repository')
                    ? 'Current folder is not a Git repository.'
                    : `Error fetching Git data: ${err.message}`;
                vscode.window.showErrorMessage(msg);
            }
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() { }