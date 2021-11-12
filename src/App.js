import _ from 'lodash';

import Board from './components/Board';
import { board, pawn } from './lib/board';

const figures = board.filter(({ movies }) => !!movies);

console.log({ board });

function App() {
  return (
    <Board
      figures={figures}
      marks={pawn(figures[10], board)}
    />
  );
}

export default App;
