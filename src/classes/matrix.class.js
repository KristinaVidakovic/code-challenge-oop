"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
const constants_1 = require("../utils/constants");
const errors_1 = require("../utils/errors");
class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
    }
    getCharacterAtPosition(pos) {
        var _a, _b;
        return (_b = (_a = this.matrix[pos.y]) === null || _a === void 0 ? void 0 : _a[pos.x]) !== null && _b !== void 0 ? _b : ' ';
    }
    findCharacterPosition(char) {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x] === char)
                    return { x, y };
            }
        }
        return null;
    }
    hasMultipleOccurrences(char) {
        let count = 0;
        for (let x = 0; x < this.matrix.length; x++) {
            for (let y = 0; y < this.matrix[x].length; y++) {
                if (this.matrix[x][y] === char) {
                    count++;
                    if (count > 1)
                        return true;
                }
            }
        }
        return false;
    }
    validateAndGetStartPosition() {
        const startPosition = this.findCharacterPosition(constants_1.START_CHARACTER);
        const endPosition = this.findCharacterPosition(constants_1.END_CHARACTER);
        if (!startPosition) {
            throw errors_1.ERRORS.MISSING_START;
        }
        if (!endPosition) {
            throw errors_1.ERRORS.MISSING_END;
        }
        if (this.hasMultipleOccurrences(constants_1.START_CHARACTER)) {
            throw errors_1.ERRORS.MULTIPLE_STARTS;
        }
        if (this.hasMultipleOccurrences(constants_1.END_CHARACTER)) {
            throw errors_1.ERRORS.MULTIPLE_ENDS;
        }
        return startPosition;
    }
}
exports.Matrix = Matrix;
