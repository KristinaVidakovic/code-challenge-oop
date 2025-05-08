import { Matrix } from './matrix.class';
import { StepTracker } from './step-tracker.class';
import { DirectionManager } from './direction-manager.class';
import { FinalPath } from '../interfaces/final-path.interface';
import {
    CORNER_CHARACTER,
    END_CHARACTER,
    NO_PATH_CHARACTER,
    START_CHARACTER,
} from '../utils/constants';
import { ERRORS } from '../utils/errors';
import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';

export class Pathfinder {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;
    private directionManager: DirectionManager;

    constructor(matrix: string[][]) {
        this.matrix = new Matrix(matrix);
        this.stepTracker = new StepTracker();
        this.directionManager = new DirectionManager(this.matrix, this.stepTracker);
    }

    public findPath(): FinalPath {
        let position = this.matrix.validateAndGetStartPosition();
        let direction = this.directionManager.findStartDirection(position);

        this.stepTracker.addStep(START_CHARACTER, position, null);

        while (direction) {
            const nextPosition = this.directionManager.move(position, direction);
            const nextChar = this.matrix.getCharacterAtPosition(nextPosition);

            if (nextChar === END_CHARACTER) break;
            if (nextChar === NO_PATH_CHARACTER) throw ERRORS.BROKEN_PATH;
            if (!this.stepTracker.isValidPathChar(nextChar)) throw ERRORS.INVALID_CHARACTER;
            if (
                !this.directionManager.areCharAndDirectionSynced(nextChar, direction) &&
                !this.stepTracker.isVisited(nextPosition)
            ) {
                throw ERRORS.INVALID_DIRECTION(direction);
            }

            position = nextPosition;
            this.stepTracker.addStep(nextChar, position, direction);

            if (this.directionManager.isFakeTurn(direction, position)) {
                throw ERRORS.FAKE_TURN;
            }

            if (this.isCorner(nextChar, position, direction)) {
                direction = this.directionManager.changeDirection(
                    direction,
                    position,
                    this.stepTracker.getSteps(),
                );
            }
        }

        return this.getFinalPath();
    }

    isCorner(char: string, position: Position, direction: Direction): boolean {
        return (
            char === CORNER_CHARACTER ||
            (this.stepTracker.isValidLetter(char) &&
                this.matrix.getCharacterAtPosition(
                    this.directionManager.move(position, direction),
                ) === NO_PATH_CHARACTER)
        );
    }

    getFinalPath(): FinalPath {
        const letters = this.stepTracker.getLetters();
        const path = this.stepTracker.getPath();
        return { letters, path };
    }
}
