import { Matrix } from '../matrix/matrix.class';
import { Position } from '../../interfaces/position.interface';
import { END_CHARACTER, START_CHARACTER } from '../../utils/constants';
import { ERRORS } from '../../utils/errors';

export class PathValidator {
    private readonly matrix: Matrix;

    constructor(matrix: Matrix) {
        this.matrix = matrix;
    }

    validateAndGetStartPosition(): Position {
        const startPosition = this.matrix.findCharacterPosition(START_CHARACTER);
        const endPosition = this.matrix.findCharacterPosition(END_CHARACTER);
        if (!startPosition) {
            throw ERRORS.MISSING_START;
        }
        if (!endPosition) {
            throw ERRORS.MISSING_END;
        }
        if (this.matrix.hasMultipleOccurrences(START_CHARACTER)) {
            throw ERRORS.MULTIPLE_STARTS;
        }
        if (this.matrix.hasMultipleOccurrences(END_CHARACTER)) {
            throw ERRORS.MULTIPLE_ENDS;
        }
        return startPosition;
    }
}
