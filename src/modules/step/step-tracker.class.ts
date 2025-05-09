import { Step } from '../../interfaces/step.interface';
import { Position } from '../../interfaces/position.interface';
import { Direction } from '../../enums/direction.enum';

export class StepTracker {
    private readonly steps: Step[] = [];
    private readonly letters: string[] = [];
    private readonly visited: Position[] = [];

    addStep(character: string, position: Position, direction: Direction | null): void {
        this.steps.push(this.createStep(character, position, direction));
        if (this.isVisitedPosition(position)) {
            return;
        }
        this.trackVisited(position);
        this.collectLetter(character);
    }

    isVisitedPosition(position: Position): boolean {
        return this.visited.some((p) => p.x === position.x && p.y === position.y);
    }

    isValidLetter(char: string): boolean {
        const validLetterRegex: RegExp = new RegExp('^[A-Z]$');
        return validLetterRegex.test(char);
    }

    isValidPathCharacter(char: string): boolean {
        const validCharacterRegex: RegExp = new RegExp('^[A-Z\\-|+@x]$');
        return validCharacterRegex.test(char);
    }

    getSteps(): Step[] {
        return this.steps;
    }

    getLetters(): string {
        return this.letters.join('');
    }

    getPath(): string {
        return this.steps.map((s) => s.char).join('');
    }

    private createStep(character: string, position: Position, direction: Direction | null): Step {
        return { char: character, position: { ...position }, direction };
    }

    private trackVisited(position: Position): void {
        this.visited.push(position);
    }

    private collectLetter(character: string): void {
        if (this.isValidLetter(character)) {
            this.letters.push(character);
        }
    }
}
