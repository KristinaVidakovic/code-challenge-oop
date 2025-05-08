import { Matrix } from './matrix.class';
import { StepTracker } from './step-tracker.class';
import { DirectionManager } from './direction-manager.class';
import { FinalPath } from '../interfaces/final-path.interface';
import { END_CHARACTER, NO_PATH_CHARACTER, START_CHARACTER } from '../utils/constants';
import { ERRORS } from '../utils/errors';
import { CornerHandler } from './corner-handler.class';
import { PathValidator } from './path-validator.class';
import { PositionService } from './position-service.class';

export class Pathfinder {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;
    private readonly directionManager: DirectionManager;
    private cornerHandler: CornerHandler;
    private pathValidator: PathValidator;

    constructor(matrix: string[][]) {
        this.matrix = new Matrix(matrix);
        this.stepTracker = new StepTracker();
        this.directionManager = new DirectionManager(this.matrix, this.stepTracker);
        this.cornerHandler = new CornerHandler(this.matrix, this.stepTracker);
        this.pathValidator = new PathValidator(this.matrix);
    }

    public findPath(): FinalPath {
        let position = this.pathValidator.validateAndGetStartPosition();
        let direction = this.directionManager.findStartDirection(position);

        this.stepTracker.addStep(START_CHARACTER, position, null);

        while (direction) {
            const nextPosition = PositionService.move(position, direction);
            const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);

            if (nextCharacter === NO_PATH_CHARACTER) throw ERRORS.BROKEN_PATH;
            if (!this.stepTracker.isValidPathCharacter(nextCharacter))
                throw ERRORS.INVALID_CHARACTER;
            if (
                !this.directionManager.areCharAndDirectionSynced(nextCharacter, direction) &&
                !this.stepTracker.isVisited(nextPosition)
            ) {
                throw ERRORS.INVALID_DIRECTION(direction);
            }

            position = nextPosition;
            this.stepTracker.addStep(nextCharacter, position, direction);

            if (nextCharacter === END_CHARACTER) break;

            if (this.directionManager.isFakeTurn(direction, position)) {
                throw ERRORS.FAKE_TURN;
            }

            if (this.cornerHandler.isCorner(nextCharacter, position, direction)) {
                direction = this.directionManager.changeDirection(
                    direction,
                    position,
                    this.stepTracker.getSteps(),
                );
            }
        }

        return this.getFinalPath();
    }

    getFinalPath(): FinalPath {
        const letters = this.stepTracker.getLetters();
        const path = this.stepTracker.getPath();
        return { letters, path };
    }
}
