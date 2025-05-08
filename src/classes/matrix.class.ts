import { Position } from '../interfaces/position.interface';

export class Matrix {
    private readonly matrix: string[][];

    constructor(matrix: string[][]) {
        this.matrix = matrix;
    }

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
}
