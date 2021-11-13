
import { useState } from 'react';
import _ from 'lodash';

import Board from './components/Board';
import { board, Pawn } from './lib/board';



// const figures = ;


const App = () => {
  const [selected, setSelected] = useState();
  const [figures, setFigures] = useState(board);
  const handleClick = (square) => {
    if (_.has(selected, 'type')) {
      setFigures(
        _(figures)
        .reject(figure => _.eq(selected, figure))
        .concat({ ...selected, type: null, })
        .reject(figure => _.eq(square, figure))
        .concat({ ...selected, ...square, })        
        .value()
      );
      setSelected();
    } else {
      setSelected(square);
    }
    
  }

  return (
    <Board
      figures={figures}
      marks={selected?.type.getMovies(selected, board)}
      onClick={handleClick}
    />
  );
}

export default App;
