"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pathfinder = void 0;
const matrix_class_1 = require("./matrix.class");
const step_tracker_class_1 = require("./step-tracker.class");
const direction_manager_class_1 = require("./direction-manager.class");
const constants_1 = require("../utils/constants");
const errors_1 = require("../utils/errors");
class Pathfinder {
    constructor(matrix) {
        this.matrix = new matrix_class_1.Matrix(matrix);
        this.stepTracker = new step_tracker_class_1.StepTracker();
        this.directionManager = new direction_manager_class_1.DirectionManager(this.matrix, this.stepTracker);
    }
    findPath() {
        let position = this.matrix.validateAndGetStartPosition();
        let direction = this.directionManager.findStartDirection(position);
        this.stepTracker.addStep(constants_1.START_CHARACTER, position, null);
        while (direction) {
            const nextPosition = this.directionManager.move(position, direction);
            const nextChar = this.matrix.getCharacterAtPosition(nextPosition);
            if (nextChar === constants_1.NO_PATH_CHARACTER)
                throw errors_1.ERRORS.BROKEN_PATH;
            if (!this.stepTracker.isValidPathChar(nextChar))
                throw errors_1.ERRORS.INVALID_CHARACTER;
            if (!this.directionManager.areCharAndDirectionSynced(nextChar, direction) &&
                !this.stepTracker.isVisited(nextPosition)) {
                throw errors_1.ERRORS.INVALID_DIRECTION(direction);
            }
            position = nextPosition;
            this.stepTracker.addStep(nextChar, position, direction);
            if (nextChar === constants_1.END_CHARACTER)
                break;
            if (this.directionManager.isFakeTurn(direction, position)) {
                throw errors_1.ERRORS.FAKE_TURN;
            }
            if (nextChar === constants_1.CORNER_CHARACTER ||
                (this.stepTracker.isValidLetter(nextChar) &&
                    this.matrix.getCharacterAtPosition(this.directionManager.move(position, direction)) === constants_1.NO_PATH_CHARACTER)) {
                direction = this.directionManager.changeDirection(direction, position, this.stepTracker.getSteps());
            }
        }
        return this.getFinalPath();
    }
    getFinalPath() {
        const letters = this.stepTracker.getLetters();
        const path = this.stepTracker.getPath();
        return { letters, path };
    }
}
exports.Pathfinder = Pathfinder;
