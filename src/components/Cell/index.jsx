import _ from 'lodash';

import Figure from '../Figure';
import style from './index.module.css';


const Cell = ({ cell, figure, marks, onClick }) =>
    <div className={`${style.cell} ${marks && style.marks}`} onClick={() => onClick(cell)}>
        {figure && <Figure {...figure} />}
    </div>;

export default Cell;
