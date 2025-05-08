import { Matrix } from './matrix.class';
import { StepTracker } from './step-tracker.class';
import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';
import { CORNER_CHARACTER, NO_PATH_CHARACTER } from '../utils/constants';
import { PositionService } from './position-service.class';

export class CornerHandler {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;

    constructor(matrix: Matrix, stepTracker: StepTracker) {
        this.matrix = matrix;
        this.stepTracker = stepTracker;
    }

    public isCorner(character: string, position: Position, direction: Direction): boolean {
        return (
            character === CORNER_CHARACTER ||
            (this.stepTracker.isValidLetter(character) &&
                this.matrix.getCharacterAtPosition(PositionService.move(position, direction)) ===
                    NO_PATH_CHARACTER)
        );
    }
}
