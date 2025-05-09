import { Step } from '../interfaces/step.interface';
import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';

export class StepTracker {
    private readonly steps: Step[] = [];
    private readonly letters: string[] = [];
    private readonly visited: Position[] = [];

    addStep(character: string, position: Position, direction: Direction | null): void {
        this.steps.push(this.createStep(character, position, direction));
        if (!this.isVisitedPosition(position)) {
            this.visited.push(position);
            if (this.isValidLetter(character)) this.letters.push(character);
        }
    }

    isVisitedPosition(position: Position): boolean {
        return this.visited.some((p) => p.x === position.x && p.y === position.y);
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

    isValidPathCharacter(char: string): boolean {
        const validCharacterRegex: RegExp = new RegExp('^[A-Z\\-|+@x]$');
        return validCharacterRegex.test(char);
    }

    isValidLetter(char: string): boolean {
        const validLetterRegex: RegExp = new RegExp('^[A-Z]$');
        return validLetterRegex.test(char);
    }

    private createStep(character: string, position: Position, direction: Direction | null): Step {
        return { char: character, position: { ...position }, direction };
    }
}
