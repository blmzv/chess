import _ from 'lodash';

import Row from '../Row';
import style from './index.module.css';


const Bord = ({ length = 8, figures = [], marks = [] }) =>
    <div className={style.board}>
        {_.times(length, i => (
            <Row
                key={`row-${i}`}
                length={length}
                figures={_.filter(figures, { y: i })}
                marks={_.filter(marks, { y: i })}
            />
        )).reverse()}
    </div>;

export default Bord;