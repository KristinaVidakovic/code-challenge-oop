import { Matrix } from './matrix.class';
import { StepTracker } from './step-tracker.class';
import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';
import { CORNER_CHARACTER, NO_PATH_CHARACTER } from '../utils/constants';
import { DirectionManager } from './direction-manager.class';

export class CornerHandler {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;
    private readonly directionManager: DirectionManager;

    constructor(matrix: Matrix, stepTracker: StepTracker, directionManager: DirectionManager) {
        this.matrix = matrix;
        this.stepTracker = stepTracker;
        this.directionManager = directionManager;
    }

    public isCorner(character: string, position: Position, direction: Direction): boolean {
        return (
            character === CORNER_CHARACTER ||
            (this.stepTracker.isValidLetter(character) &&
                this.matrix.getCharacterAtPosition(
                    this.directionManager.move(position, direction),
                ) === NO_PATH_CHARACTER)
        );
    }
}
