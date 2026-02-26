import simpleGit from 'simple-git';

export async function getCommits(repoPath: string): Promise<string[]> {
    const git = simpleGit(repoPath);

    try {
        const log = await git.log([
            '-n', '500',
            '--pretty=format:%h|%an|%ad|%s',
            '--date=iso',
            '--no-merges'
        ]);

        return log.all.map(item =>
            `${item.hash}|${item.author_name}|${item.date}|${item.message}`
        );
    } catch (err: any) {
        if (err.message.includes('not a git repository')) {
            throw new Error('not a git repository');
        }
        throw err;
    }
}

export async function getCurrentBranch(repoPath: string): Promise<string> {
    const git = simpleGit(repoPath);
    return await git.branchLocal().then(r => r.current);
}