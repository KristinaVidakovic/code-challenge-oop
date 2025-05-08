import { StepTracker } from './step-tracker.class';
import { FinalPath } from '../interfaces/final-path.interface';

export class PathBuilder {
    private readonly stepTracker: StepTracker;

    constructor(stepTracker: StepTracker) {
        this.stepTracker = stepTracker;
    }

    buildFinalPath(): FinalPath {
        return {
            letters: this.stepTracker.getLetters(),
            path: this.stepTracker.getPath(),
        };
    }
}
