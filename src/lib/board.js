
import _ from 'lodash';

const emptyBoard = lenght => (
    (new Array(lenght)).map((_, y) =>
        (new Array(lenght)).map((_, x) => (
            { x, y }
        ))
    )
);

const Figure = class {
    constructor(vectors = []) {
        this.vectors = vectors;
    }

    getMovies(position, board) {
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

        return this.vectors.map(vector =>
            board.filter(square =>
                vector(rel(position, square))
            )
        ).map(restrictions).flat();
    }
};

export const Pawn = class extends Figure {
    constructor() {
        super([
            ({ x, y }) => x === 0 && y === 1,
        ])
    }
};

const Rook = class extends Figure {
    constructor() {
        super([
            ({ x, y }) => x > 0 && y === 0,
            ({ x, y }) => x < 0 && y === 0,
            ({ x, y }) => y > 0 && x === 0,
            ({ x, y }) => y < 0 && x === 0,
        ])
    }
};

const Knight = class extends Figure {
    constructor() {
        super([
            ({ x, y }) => x === 1 && y === 2,
            ({ x, y }) => x === 1 && y === -2,
            ({ x, y }) => x === 2 && y === 1,
            ({ x, y }) => x === -2 && y === 1,
        ])
    }
};

const Bishop = class extends Figure {
    constructor() {
        super([
            ({ x, y }) => x < 0 && y === x,
            ({ x, y }) => x > 0 && y === x,
            ({ x, y }) => y < 0 && y === x,
            ({ x, y }) => y > 0 && y === x,
        ])
    }
};

const Queen = class extends Figure {
    // ...rook(...args),
    // ...bishop(...args),
};

const King = class extends Figure {
    constructor() {
        super([
            ({ x, y }) => x === 0 && y === 1,
            ({ x, y }) => x === 1 && y === 1,
            ({ x, y }) => x === 1 && y === 0,
            ({ x, y }) => x === 1 && y === -1,
            ({ x, y }) => x === 0 && y === -1,
            ({ x, y }) => x === -1 && y === -1,
            ({ x, y }) => x === -1 && y === 0,
            ({ x, y }) => x === -1 && y === 1,
        ])
    }
};

export const board = [
    [new Rook, new Knight, new Bishop, new King, new Queen, new Bishop, new Knight, new Rook].map(type => ({ type, color: 'black' })),
    _.times(8).map(_ => ({ type: new Pawn, color: 'black' })),
    ..._.times(4).map(e => _.times(8).map(e => ({ type: 'empty' }))),
    _.times(8).map(_ => ({ type: new Pawn, color: 'white' })),
    [new Rook, new Knight, new Bishop, new King, new Queen, new Bishop, new Knight, new Rook].map(type => ({ type, color: 'white' })),
]
    .map((row = [], y) => row.map((square = {}, x) => ({ ...square, x, y })))
    .flat();

// export const board = emptyBoard(8);