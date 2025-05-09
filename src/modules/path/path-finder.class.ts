import { Matrix } from '../matrix/matrix.class';
import { StepTracker } from '../step/step-tracker.class';
import { DirectionManager } from '../direction/direction-manager.class';
import { FinalPath } from '../../interfaces/final-path.interface';
import { START_CHARACTER } from '../../utils/constants';
import { PathBuilder } from './path-builder.class';
import { PathWalker } from './path-walker.class';
import { MatrixValidator } from '../matrix/matrix-validator.class';

export class PathFinder {
    private readonly matrix: Matrix;
    private readonly stepTracker: StepTracker;
    private readonly directionManager: DirectionManager;
    private readonly matrixValidator: MatrixValidator;
    private readonly pathBuilder: PathBuilder;
    private readonly pathWalker: PathWalker;
    private readonly finalPath: FinalPath;

    constructor(matrix: string[][]) {
        this.matrix = new Matrix(matrix);
        this.stepTracker = new StepTracker();
        this.directionManager = new DirectionManager(this.matrix, this.stepTracker);
        this.matrixValidator = new MatrixValidator(this.matrix);
        this.pathBuilder = new PathBuilder(this.stepTracker);
        this.pathWalker = new PathWalker(this.matrix, this.stepTracker, this.directionManager);

        this.finalPath = this.run();
    }

    private run(): FinalPath {
        let position = this.matrixValidator.validateAndGetStartPosition();
        let direction = this.directionManager.findStartDirection(position);
        this.stepTracker.addStep(START_CHARACTER, position, null);
        this.pathWalker.walk(position, direction);
        return this.pathBuilder.buildFinalPath();
    }

    get letters(): string {
        return this.finalPath.letters;
    }

    get path(): string {
        return this.finalPath.path;
    }
}
