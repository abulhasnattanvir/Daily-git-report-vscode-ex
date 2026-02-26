"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommits = getCommits;
exports.getCurrentBranch = getCurrentBranch;
const simple_git_1 = __importDefault(require("simple-git"));
async function getCommits(repoPath) {
    const git = (0, simple_git_1.default)(repoPath);
    try {
        const log = await git.log([
            '-n', '500',
            '--pretty=format:%h|%an|%ad|%s',
            '--date=iso',
            '--no-merges'
        ]);
        return log.all.map(item => `${item.hash}|${item.author_name}|${item.date}|${item.message}`);
    }
    catch (err) {
        if (err.message.includes('not a git repository')) {
            throw new Error('not a git repository');
        }
        throw err;
    }
}
async function getCurrentBranch(repoPath) {
    const git = (0, simple_git_1.default)(repoPath);
    return await git.branchLocal().then(r => r.current);
}
//# sourceMappingURL=gitService.js.map