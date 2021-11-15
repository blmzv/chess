
import { useState } from 'react';
import _ from 'lodash';

import Board from './components/Board';
import { position as startPosition, Board as getBoard, Pawn } from './lib/board';


// doard/square — набор координат, представляющие пространство шахматной доски
// squaries — кабор каких-либо клеток на доске. используется редко
// coordinates/coordinate — координаты x,y
// cheesman — шахматная фигура относительно которой строится логика / выполняется действие 
// position — расстановка фигур на доске 
// figures/figures — набор фигур на доске
// vectors/vector — набор возможных ходов фигуры в одном направлении
// movies/move — возможные ходы фигуры
//
// doard (-> squaries) ->  square
// position -> figures -> figures
// cheesman -> vectors -> vector -> movies -> move

const board = getBoard();

const App = () => {
  const [selected, setSelected] = useState();
  const [position, setPosition] = useState(startPosition);
  const handleClick = (square) => {

    if (selected) {
      const movies = selected.type.getMovies(selected, position, board);

      if(_.find(movies, square)) {
        setPosition(
          _(position)
          .reject(figure => _.isEqual(figure, selected))
          .reject(({ x, y }) => _.isEqual({ x, y }, square))
          .concat({ ...selected, ...square, })        
          .value()
        );
      }
      setSelected();
    } else {
      const figure = _.find(position, square);

      if(figure) {
        setSelected(figure);
      }
    }
  }

  return (
    <Board
      board={board}
      position={position}
      marks={selected?.type.getMovies(selected, position, board)}
      onClick={handleClick}
    />
  );
}

export default App;
