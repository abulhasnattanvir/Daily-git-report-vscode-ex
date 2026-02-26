"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const gitService_1 = require("./gitService");
const reportGenerator_1 = require("./reportGenerator");
const webview_1 = require("./webview");
function activate(context) {
    console.log('Daily Git Report extension is now active');
    const disposable = vscode.commands.registerCommand('dailyGitReport.showReport', async () => {
        if (!vscode.workspace.workspaceFolders?.length) {
            vscode.window.showErrorMessage('Please open a folder/workspace that contains a Git repository.');
            return;
        }
        const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        try {
            const commits = await (0, gitService_1.getCommits)(rootPath); // uses HEAD/current branch if no branch specified
            const report = (0, reportGenerator_1.generateDailyReport)(commits);
            if (Object.keys(report).length === 0) {
                vscode.window.showInformationMessage('No commits found in the repository history.');
                return;
            }
            (0, webview_1.showReportWebview)(report); // only report is passed (context removed)
        }
        catch (err) {
            console.error('[Daily Git Report]', err);
            const msg = err.message?.includes('not a git repository')
                ? 'Current folder is not a Git repository.'
                : `Error fetching Git data: ${err.message}`;
            vscode.window.showErrorMessage(msg);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map