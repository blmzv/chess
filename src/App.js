import _ from 'lodash';

import Board from './components/Board';


const positions = [
  [[0, 1], { color: 'white', piece: 'rook' }],
  [[0, 3], { color: 'black', piece: 'pawn' }],
  [[2, 6], { color: 'black', piece: 'pawn' }]
];

const possitinsSetter = (x, y) => _.flow([
  positions => positions.find(
    ([position]) => _.isEqual(position, [x, y])
  ),
  ([, vall] = []) => vall
])(positions);

const getBoardCoordinates = (length = 8) => (
  _.flatten(
    _.times(length, x =>
      _.times(length, y => [x, y])
    )
  )
);

const add = (absVal, relVal, invert) => absVal + (invert ? -1 * relVal : relVal);

const pawn = ([x, y], positions = []) => _.flow([
  getBoardCoordinates,
  moves => moves.filter(move =>
    [
      _.isEqual(move, [x, add(y, 1)]),
      y === 1 && _.isEqual(move, [x, add(y, 2)])
    ].some(e => e)
  ),
  moves => moves.filter(
    move => {
      console.log(move, positions, positions.find(([[, y]]) => move[1] === y));

      return move;
    }
  ),
  moves => moves.filter(
    move => !positions.some(([[, y]]) => move[1] === y)
  ),
])();

const rook = ([x, y], positions = []) => _.flow([
  getBoardCoordinates,
  moves => moves.filter(move => !_.isEqual(move, [x, y]) && (move[0] === x || move[1] === y)),
  moves => moves.filter(move => positions.filter(([[,yy]]) => yy === y)),
])();

const getMoves = (piece, position, positions = []) => piece(position, positions);
const setAtPosition = (positions, setter = _.noop) => positions.reduce(
  (acc, [x, y]) => _.merge(
    acc,
    {
      [y]: {
        [x]: setter(x, y)
      }
    }
  ), {}
);


const marks = setAtPosition(getMoves(rook, [0, 1], positions), () => true);

function App() {
  return (
    <Board
      position={setAtPosition(getBoardCoordinates(), possitinsSetter)}
      marks={marks}
    />
  );
}

export default App;
