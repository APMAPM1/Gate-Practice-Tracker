export function calcAccuracy(total, correct) {
    if (!total || total === 0) return 0;
    return Math.round(((correct / total) * 100) * 10) / 10;
}