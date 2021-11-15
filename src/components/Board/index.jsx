import _ from 'lodash';

import { Board } from '../../lib/board';
import Row from '../Row';
import style from './index.module.css';


const Bord = ({ board = Board(), position = [], marks = [], onClick = _.noop }) =>
    <div className={style.board}>
        {board.map((row, y) =>
            <Row
                key={`row-${y}`}
                row={row}
                figures={_.filter(position.flat(), { y })}
                marks={_.filter(marks, { y })}
                onClick={onClick}
            />
        ).reverse()}
    </div>;

export default Bord;