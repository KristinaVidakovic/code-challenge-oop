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
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;

    constructor(matrix: Matrix, stepTracker: StepTracker) {
        this.matrix = matrix;
        this.stepTracker = stepTracker;
    }

    findStartDirection(position: Position): Direction {
        const validDirections = this.getValidStartDirections(position);
        if (validDirections.length === 0) {
            throw ERRORS.BROKEN_PATH;
        }
        if (validDirections.length > 1) {
            throw ERRORS.MULTIPLE_START_PATHS;
        }
        return validDirections[0];
    }

    changeDirection(direction: Direction, position: Position, steps: Step[]): Direction {
        const validTurns = this.getValidTurnDirections(position, direction, steps);
        if (validTurns.length > 1) {
            throw ERRORS.FORK_IN_PATH;
        }
        return validTurns[0];
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

    isCorner(character: string, position: Position, direction: Direction): boolean {
        return (
            character === CORNER_CHARACTER ||
            (this.stepTracker.isValidLetter(character) &&
                this.matrix.getCharacterAtPosition(PositionService.move(position, direction)) ===
                    NO_PATH_CHARACTER)
        );
    }

    private getValidTurnDirections(
        position: Position,
        direction: Direction,
        steps: Step[],
    ): Direction[] {
        const orthogonalDirections =
            direction === Direction.LEFT || direction === Direction.RIGHT
                ? [Direction.UP, Direction.DOWN]
                : [Direction.LEFT, Direction.RIGHT];

        const previousPosition = steps[steps.length - 2].position;

        return orthogonalDirections.filter((newDirection) => {
            const testPosition = PositionService.move(position, newDirection);
            const testCharacter = this.matrix.getCharacterAtPosition(testPosition);
            return (
                this.stepTracker.isValidPathCharacter(testCharacter) &&
                testPosition !== previousPosition
            );
        });
    }

    private getValidStartDirections(position: Position): Direction[] {
        return Object.values(Direction).filter((direction) => {
            const nextPosition = PositionService.move(position, direction);
            const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);
            return this.stepTracker.isValidPathCharacter(nextCharacter);
        });
    }
}
