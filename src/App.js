
import { useState } from 'react';
import _ from 'lodash';

import Board from './components/Board';
import { board, Pawn } from './lib/board';



const figures = board.filter(({ type }) => !!type);


const App = () => {
  const [selected, setSelected] = useState();
  const handleClick = (figure) => {
    setSelected(figure);
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
