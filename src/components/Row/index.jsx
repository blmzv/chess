import _ from 'lodash';

import Cell from '../Cell';


const Row = ({ length, position = {}, marks={} }) =>
    <div>
        {_.times(length, i =>
            <Cell key={`cell-${i}`} figure={position[i]} marks={marks[i]} />
        )}
    </div>;

export default  Row;
