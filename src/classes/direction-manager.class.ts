import { Matrix } from './matrix.class';
import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';
import { ERRORS } from '../utils/errors';
import {
    CORNER_CHARACTER,
    HORIZONTAL_CHARACTER,
    NO_PATH_CHARACTER,
    VERTICAL_CHARACTER,
} from '../utils/constants';
import { StepTracker } from './step-tracker.class';
import { Step } from '../interfaces/step.interface';
import { PositionService } from './position-service.class';

export class DirectionManager {
    private matrix: Matrix;
    private stepTracker: StepTracker;

    constructor(matrix: Matrix, stepTracker: StepTracker) {
        this.matrix = matrix;
        this.stepTracker = stepTracker;
    }

    findStartDirection(position: Position): Direction {
        let direction: Direction | null = null;
        const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
        let count = 0;
        for (const d of directions) {
            const nextPosition = PositionService.move(position, d);
            const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);
            if (this.stepTracker.isValidPathCharacter(nextCharacter)) {
                count++;
                direction = d;
                if (count > 1) {
                    throw ERRORS.MULTIPLE_START_PATHS;
                }
            }
        }
        if (direction === null) {
            throw ERRORS.BROKEN_PATH;
        }
        return direction;
    }

    changeDirection(direction: Direction, position: Position, steps: Step[]): Direction {
        const possibleTurns: Direction[] =
            direction === Direction.LEFT || direction === Direction.RIGHT
                ? [Direction.UP, Direction.DOWN]
                : [Direction.LEFT, Direction.RIGHT];
        let count = 0;
        for (const newDirection of possibleTurns) {
            const testPosition = PositionService.move(position, newDirection);
            const testCharacter = this.matrix.getCharacterAtPosition(testPosition);
            const previousPosition = steps[steps.length - 2].position;
            if (
                this.stepTracker.isValidPathCharacter(testCharacter) &&
                testPosition !== previousPosition
            ) {
                count++;
                direction = newDirection;
                if (count > 1) {
                    throw ERRORS.FORK_IN_PATH;
                }
            }
        }

        return direction;
    }

    areCharAndDirectionSynced(character: string, direction: Direction): boolean {
        switch (direction) {
            case Direction.DOWN:
            case Direction.UP:
                return character !== HORIZONTAL_CHARACTER;
            case Direction.LEFT:
            case Direction.RIGHT:
                return character !== VERTICAL_CHARACTER;
        }
    }

    isFakeTurn(direction: Direction, position: Position): boolean {
        const character = this.matrix.getCharacterAtPosition(position);
        const nextPosition = PositionService.move(position, direction);
        const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);
        return (
            character === CORNER_CHARACTER &&
            nextCharacter !== NO_PATH_CHARACTER &&
            !this.stepTracker.isVisited(nextPosition)
        );
    }
}
