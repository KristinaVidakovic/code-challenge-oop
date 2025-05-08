import { Position } from './position.interface';
import { Direction } from '../enums/direction.enum';

export interface Step {
    char: string;
    position: Position;
    direction: Direction | null;
}
