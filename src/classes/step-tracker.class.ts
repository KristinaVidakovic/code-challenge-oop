import { Step } from '../interfaces/step.interface';
import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';

export class StepTracker {
    private steps: Step[] = [];
    private letters: string[] = [];
    private visited: Position[] = [];

    addStep(char: string, pos: Position, dir: Direction | null): void {
        this.steps.push({ char, position: { ...pos }, direction: dir });
        if (!this.isVisited(pos)) {
            this.visited.push(pos);
            if (this.isValidLetter(char)) this.letters.push(char);
        }
    }

    isVisited(pos: Position): boolean {
        return this.visited.some((p) => p.x === pos.x && p.y === pos.y);
    }

    getPath(): string {
        return this.steps.map((s) => s.char).join('');
    }

    getLetters(): string {
        return this.letters.join('');
    }

    getSteps(): Step[] {
        return this.steps;
    }

    isValidPathChar(char: string): boolean {
        const validCharacterRegex: RegExp = new RegExp('^[A-Z\\-|+@x]$');
        return validCharacterRegex.test(char);
    }

    isValidLetter(char: string): boolean {
        const validLetterRegex: RegExp = new RegExp('^[A-Z]$');
        return validLetterRegex.test(char);
    }
}
