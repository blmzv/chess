import _ from 'lodash';

import Row from '../Row';
import style from './index.module.css';


const Bord = ({ length = 8, position = {}, marks={} }) =>
    <div className={style.board}>
        {_.times(length, i => (
            <Row key={`row-${i}`} length={length} position={position[i]} marks={marks[i]} />
        )).reverse()}
    </div>;

export default Bord;