import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChessPawn,
    faChessRook,
    faChessKnight,
    faChessBishop,
    faChessQueen,
    faChessKing
} from "@fortawesome/free-solid-svg-icons";

import style from './index.module.css';


const icons = {
    Pawn: faChessPawn,
    Rook: faChessRook,
    Knight: faChessKnight,
    Bishop: faChessBishop,
    Queen: faChessQueen,
    King: faChessKing
};

const Figure = ({ color, type = {} }) =>
    <FontAwesomeIcon icon={icons[type.constructor.name]} className={`${style.figure} ${style[color]}`} />;

export default Figure;