"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionManager = void 0;
const direction_enum_1 = require("../enums/direction.enum");
const errors_1 = require("../utils/errors");
const constants_1 = require("../utils/constants");
class DirectionManager {
    constructor(matrix, stepTracker) {
        this.matrix = matrix;
        this.stepTracker = stepTracker;
    }
    findStartDirection(position) {
        let direction = null;
        const directions = [direction_enum_1.Direction.UP, direction_enum_1.Direction.DOWN, direction_enum_1.Direction.LEFT, direction_enum_1.Direction.RIGHT];
        let count = 0;
        for (const d of directions) {
            const nextPosition = this.move(position, d);
            const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);
            if (this.stepTracker.isValidPathChar(nextCharacter)) {
                count++;
                direction = d;
                if (count > 1) {
                    throw errors_1.ERRORS.MULTIPLE_START_PATHS;
                }
            }
        }
        if (direction === null) {
            throw errors_1.ERRORS.BROKEN_PATH;
        }
        return direction;
    }
    changeDirection(direction, position, steps) {
        const possibleTurns = direction === direction_enum_1.Direction.LEFT || direction === direction_enum_1.Direction.RIGHT
            ? [direction_enum_1.Direction.UP, direction_enum_1.Direction.DOWN]
            : [direction_enum_1.Direction.LEFT, direction_enum_1.Direction.RIGHT];
        let count = 0;
        for (const newDirection of possibleTurns) {
            const testPosition = this.move(position, newDirection);
            const testCharacter = this.matrix.getCharacterAtPosition(testPosition);
            const previousPosition = steps[steps.length - 2].position;
            if (this.stepTracker.isValidPathChar(testCharacter) &&
                testPosition !== previousPosition) {
                count++;
                direction = newDirection;
                if (count > 1) {
                    throw errors_1.ERRORS.FORK_IN_PATH;
                }
            }
        }
        return direction;
    }
    move(position, direction) {
        switch (direction) {
            case direction_enum_1.Direction.UP:
                return { x: position.x, y: position.y - 1 };
            case direction_enum_1.Direction.DOWN:
                return { x: position.x, y: position.y + 1 };
            case direction_enum_1.Direction.LEFT:
                return { x: position.x - 1, y: position.y };
            case direction_enum_1.Direction.RIGHT:
                return { x: position.x + 1, y: position.y };
        }
    }
    areCharAndDirectionSynced(char, direction) {
        switch (direction) {
            case direction_enum_1.Direction.DOWN:
            case direction_enum_1.Direction.UP:
                return char !== constants_1.HORIZONTAL_CHARACTER;
            case direction_enum_1.Direction.LEFT:
            case direction_enum_1.Direction.RIGHT:
                return char !== constants_1.VERTICAL_CHARACTER;
        }
    }
    isFakeTurn(direction, position) {
        const char = this.matrix.getCharacterAtPosition(position);
        const nextPosition = this.move(position, direction);
        const nextCharacter = this.matrix.getCharacterAtPosition(nextPosition);
        return (char === constants_1.CORNER_CHARACTER &&
            nextCharacter !== constants_1.NO_PATH_CHARACTER &&
            !this.stepTracker.isVisited(nextPosition));
    }
}
exports.DirectionManager = DirectionManager;
