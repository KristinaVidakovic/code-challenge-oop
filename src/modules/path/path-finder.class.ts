import { Matrix } from '../matrix/matrix.class';
import { StepTracker } from '../step/step-tracker.class';
import { DirectionManager } from '../direction/direction-manager.class';
import { FinalPath } from '../../interfaces/final-path.interface';
import { START_CHARACTER } from '../../utils/constants';
import { PathValidator } from './path-validator.class';
import { PathBuilder } from './path-builder.class';
import { PathWalker } from './path-walker.class';

export class PathFinder {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;
    private readonly directionManager: DirectionManager;
    private readonly pathValidator: PathValidator;
    private readonly pathBuilder: PathBuilder;
    private readonly pathWalker: PathWalker;

    constructor(matrix: string[][]) {
        this.matrix = new Matrix(matrix);
        this.stepTracker = new StepTracker();
        this.directionManager = new DirectionManager(this.matrix, this.stepTracker);
        this.pathValidator = new PathValidator(this.matrix);
        this.pathBuilder = new PathBuilder(this.stepTracker);
        this.pathWalker = new PathWalker(this.matrix, this.stepTracker, this.directionManager);
    }

    public findPath(): FinalPath {
        let position = this.pathValidator.validateAndGetStartPosition();
        let direction = this.directionManager.findStartDirection(position);
        this.stepTracker.addStep(START_CHARACTER, position, null);
        this.pathWalker.walk(position, direction);
        return this.pathBuilder.buildFinalPath();
    }
}
