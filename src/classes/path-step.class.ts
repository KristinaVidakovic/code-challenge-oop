import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';
import { Step } from '../interfaces/step.interface';

export class PathStep {
    static createStep(character: string, position: Position, direction: Direction | null): Step {
        return { char: character, position: { ...position }, direction };
    }
}
