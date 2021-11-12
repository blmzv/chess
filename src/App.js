import _ from 'lodash';

import Board from './components/Board';
import { board, Pawn } from './lib/board';

const figures = board.filter(({ type }) => !!type);

function App() {
  return (
    <Board
      figures={figures}
      marks={(new Pawn).getMovies(figures[10], board)}
    />
  );
}

export default App;
