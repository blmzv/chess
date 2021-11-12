import _ from 'lodash';

import Cell from '../Cell';


const Row = ({ length, figures = [], marks = [] }) =>
    <div>
        {_.times(length, i =>
            <Cell
                key={`cell-${i}`}
                figure={_.find(figures, { x: i })}
                marks={_.find(marks, { x: i })}
            />
        )}
    </div>;

export default Row;
