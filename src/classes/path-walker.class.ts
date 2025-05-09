import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';
import { END_CHARACTER, NO_PATH_CHARACTER } from '../utils/constants';
import { ERRORS } from '../utils/errors';
import { Matrix } from './matrix.class';
import { StepTracker } from './step-tracker.class';
import { DirectionManager } from './direction-manager.class';

export class PathWalker {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;
    private readonly directionManager: DirectionManager;

    constructor(matrix: Matrix, stepTracker: StepTracker, directionManager: DirectionManager) {
        this.matrix = matrix;
        this.stepTracker = stepTracker;
        this.directionManager = directionManager;
    }

    walk(position: Position, direction: Direction | null): void {
        while (direction) {
            const nextPosition = this.directionManager.move(position, direction);
            const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);

            this.validateStep(nextCharacter, direction, nextPosition);

            position = nextPosition;
            this.stepTracker.addStep(nextCharacter, position, direction);

            if (nextCharacter === END_CHARACTER) break;

            this.validateFakeTurn(direction, nextPosition);

            if (this.directionManager.isCorner(nextCharacter, position, direction)) {
                direction = this.changeDirection(direction, position);
            }
        }
    }

    private validateStep(character: string, direction: Direction, position: Position): void {
        if (character === NO_PATH_CHARACTER) {
            throw ERRORS.BROKEN_PATH;
        }
        if (!this.stepTracker.isValidPathCharacter(character)) {
            throw ERRORS.INVALID_CHARACTER;
        }
        if (
            !this.directionManager.areCharAndDirectionSynced(character, direction) &&
            !this.stepTracker.isVisitedPosition(position)
        ) {
            throw ERRORS.INVALID_DIRECTION(direction);
        }
    }

    private validateFakeTurn(direction: Direction, position: Position): void {
        if (this.directionManager.isFakeTurn(direction, position)) {
            throw ERRORS.FAKE_TURN;
        }
    }

    private changeDirection(direction: Direction, position: Position): Direction {
        return this.directionManager.changeDirection(
            direction,
            position,
            this.stepTracker.getSteps(),
        );
    }
}
