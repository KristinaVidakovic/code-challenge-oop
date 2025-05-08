import { Position } from '../interfaces/position.interface';
import { Direction } from '../enums/direction.enum';

export class PositionService {
    public static move(position: Position, direction: Direction): Position {
        switch (direction) {
            case Direction.UP:
                return { x: position.x, y: position.y - 1 };
            case Direction.DOWN:
                return { x: position.x, y: position.y + 1 };
            case Direction.LEFT:
                return { x: position.x - 1, y: position.y };
            case Direction.RIGHT:
                return { x: position.x + 1, y: position.y };
        }
    }
}
