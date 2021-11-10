import _ from 'lodash';

import Figure from '../Figure';
import style from './index.module.css';


const Cell = ({ figure, marks }) =>
    <div className={`${style.cell} ${marks && style.marks}`}>
        {figure && <Figure {...figure} />}
    </div>;
 
 export default Cell;
 