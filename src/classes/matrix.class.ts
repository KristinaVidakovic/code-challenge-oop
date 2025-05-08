import { Position } from '../interfaces/position.interface';
import { END_CHARACTER, START_CHARACTER } from '../utils/constants';
import { ERRORS } from '../utils/errors';

export class Matrix {
    constructor(public readonly matrix: string[][]) {}

    getCharacterAtPosition(position: Position): string {
        return this.matrix[position.y]?.[position.x] ?? ' ';
    }

    findCharacterPosition(character: string): Position | null {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x] === character) return { x, y };
            }
        }
        return null;
    }

    hasMultipleOccurrences(character: string): boolean {
        let count = 0;
        for (let x = 0; x < this.matrix.length; x++) {
            for (let y = 0; y < this.matrix[x].length; y++) {
                if (this.matrix[x][y] === character) {
                    count++;
                    if (count > 1) return true;
                }
            }
        }
        return false;
    }

    validateAndGetStartPosition(): Position {
        const startPosition = this.findCharacterPosition(START_CHARACTER);
        const endPosition = this.findCharacterPosition(END_CHARACTER);

        if (!startPosition) {
            throw ERRORS.MISSING_START;
        }
        if (!endPosition) {
            throw ERRORS.MISSING_END;
        }
        if (this.hasMultipleOccurrences(START_CHARACTER)) {
            throw ERRORS.MULTIPLE_STARTS;
        }
        if (this.hasMultipleOccurrences(END_CHARACTER)) {
            throw ERRORS.MULTIPLE_ENDS;
        }

        return startPosition;
    }
}
