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
    pawn: faChessPawn,
    rook: faChessRook,
    knight: faChessKnight,
    bishop: faChessBishop,
    queen: faChessQueen,
    king: faChessKing
};

const Figure = ({ color, type }) =>
    <FontAwesomeIcon icon={icons[type]} className={`${style.figure} ${style[color]}`} />;

export default Figure;