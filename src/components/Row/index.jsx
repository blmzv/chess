import _ from 'lodash';

import Cell from '../Cell';


const Row = ({ row, figures = [], marks = [], onClick = _.noop }) =>
    <div>
        {row.map((cell, x) =>
            <Cell
                key={`cell-${x}`}
                cell={cell}
                figure={_.find(figures, { x })}
                marks={_.find(marks, { x })}
                onClick={onClick}
            />
        )}
    </div>;

export default Row;
