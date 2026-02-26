"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDailyReport = generateDailyReport;
function generateDailyReport(commits) {
    const report = {};
    commits.forEach(line => {
        const parts = line.split('|');
        if (parts.length < 4)
            return; // skip malformed lines
        const [, author, date,] = parts; // hash, author, date, message
        const day = date.split('T')[0]; // YYYY-MM-DD
        if (!report[day]) {
            report[day] = {};
        }
        if (!report[day][author]) {
            report[day][author] = { commits: 0 };
        }
        report[day][author].commits += 1;
    });
    return report;
}
//# sourceMappingURL=reportGenerator.js.map