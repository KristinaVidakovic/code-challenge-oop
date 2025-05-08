"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepTracker = void 0;
class StepTracker {
    constructor() {
        this.steps = [];
        this.letters = [];
        this.visited = [];
    }
    addStep(char, pos, dir) {
        this.steps.push({ char, position: Object.assign({}, pos), direction: dir });
        if (!this.isVisited(pos)) {
            this.visited.push(pos);
            if (this.isValidLetter(char))
                this.letters.push(char);
        }
    }
    isVisited(pos) {
        return this.visited.some((p) => p.x === pos.x && p.y === pos.y);
    }
    getPath() {
        return this.steps.map((s) => s.char).join('');
    }
    getLetters() {
        return this.letters.join('');
    }
    getSteps() {
        return this.steps;
    }
    isValidPathChar(char) {
        const validCharacterRegex = new RegExp('^[A-Z\\-|+@x]$');
        return validCharacterRegex.test(char);
    }
    isValidLetter(char) {
        const validLetterRegex = new RegExp('^[A-Z]$');
        return validLetterRegex.test(char);
    }
}
exports.StepTracker = StepTracker;
