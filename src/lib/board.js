
import _ from 'lodash';

const emptyBoard = lenght => (
    (new Array(lenght)).map((_, y) =>
        (new Array(lenght)).map((_, x) => (
            { x, y }
        ))
    )
);

const figure = (vectors = []) => (position, board) => {
    const coordinates = ['x', 'y'];
    const rel = (zero, item) => coordinates.reduce(
        (acc, z) => ({ ...acc, [z]: item[z] - zero[z] }),
        item
    );
    const figures = _.filter(board, 'type');
    const restrictions = (vector = []) =>
        vector.filter(square =>
            true || figures.every(figure =>
                coordinates.every(z =>
                    rel(position, square)[z] <= rel(position, figure)[z]
                )
            )
            //&& _.find(figures, { [z]: square }).color !== color
        );

    return vectors.map(vector =>
        board.filter(square =>
            console.log({
                board,
                is: vector(rel(position, square)),
                position,
                square,
                rel: rel(position, square),
                vector
            }) || vector(rel(position, square))
        )
    ).map(restrictions).flat();
};

export const pawn = figure([
    ({ x, y }) => x === 0 && y === 1,
]);

const rook = figure([
    ({ x, y }) => x > 0 && y === 0,
    ({ x, y }) => x < 0 && y === 0,
    ({ x, y }) => y > 0 && x === 0,
    ({ x, y }) => y < 0 && x === 0,
]);

const knight = figure([
    ({ x, y }) => x === 1 && y === 2,
    ({ x, y }) => x === 1 && y === -2,
    ({ x, y }) => x === 2 && y === 1,
    ({ x, y }) => x === -2 && y === 1,
]);

const bishop = figure([
    ({ x, y }) => x < 0 && y === x,
    ({ x, y }) => x > 0 && y === x,
    ({ x, y }) => y < 0 && y === x,
    ({ x, y }) => y > 0 && y === x,
]);

const queen = (...args) => [
    ...rook(...args),
    ...bishop(...args),
];

const king = figure([
    ({ x, y }) => x === 0 && y === 1,
    ({ x, y }) => x === 1 && y === 1,
    ({ x, y }) => x === 1 && y === 0,
    ({ x, y }) => x === 1 && y === -1,
    ({ x, y }) => x === 0 && y === -1,
    ({ x, y }) => x === -1 && y === -1,
    ({ x, y }) => x === -1 && y === 0,
    ({ x, y }) => x === -1 && y === 1,
]);

export const board = [
    [rook, knight, bishop, king, queen, bishop, knight, rook].map(movies => ({ movies, color: 'black' })),
    _.times(8).map(_ => ({ movies: pawn, color: 'black' })),
    ..._.times(4).map(e => _.times(8).map(e => ({ type: 'empty' }))),
    _.times(8).map(_ => ({ movies: pawn, color: 'white' })),
    [rook, knight, bishop, king, queen, bishop, knight, rook].map(movies => ({ movies, color: 'white' })),
]
    .map((row = [], y) => row.map((square = {}, x) => ({ ...square, x, y, type: 'rook' })))
    .flat();

// export const board = emptyBoard(8);