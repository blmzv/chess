import _ from 'lodash';


const Figure = class {
    constructor(vectors = []) {
        this.vectors = vectors;
    }

    getMovies(position, board) {
        const coordinates = ['x', 'y'];
        const rel = (zero, item) => coordinates.reduce(
            (acc, z) => ({ ...acc, [z]: (item[z] - zero[z]) * (zero.color === "black" ? -1 : 1) }),
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
            ({ x, y }) => Math.abs(x) === 1 && Math.abs(y) === 2,
            ({ x, y }) => Math.abs(x) === 2 && Math.abs(y) === 1,
        ])
    }
};

const Bishop = class extends Figure {
    constructor() {
        super([
            ({ x, y }) => x < 0 && y === x,
            ({ x, y }) => x < 0 && y === x * -1,
            ({ x, y }) => x > 0 && y === x,
            ({ x, y }) => x > 0 && y === x * -1,
        ])
    }
};

const Queen = class extends Figure {
    constructor() {
        super([
            // Rook
            ({ x, y }) => x > 0 && y === 0,
            ({ x, y }) => x < 0 && y === 0,
            ({ x, y }) => y > 0 && x === 0,
            ({ x, y }) => y < 0 && x === 0,

            // Bishop
            ({ x, y }) => x < 0 && y === x,
            ({ x, y }) => x < 0 && y === x * -1,
            ({ x, y }) => x > 0 && y === x,
            ({ x, y }) => x > 0 && y === x * -1,
        ])
    }
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
    [new Rook, new Knight, new Bishop, new King, new Queen, new Bishop, new Knight, new Rook].map(type => ({ type, color: 'white' })),
    _.times(8).map(_ => ({ type: new Pawn, color: 'white' })),
    ..._.times(4).map(e => _.times(8)),
    _.times(8).map(_ => ({ type: new Pawn, color: 'black' })),
    [new Rook, new Knight, new Bishop, new King, new Queen, new Bishop, new Knight, new Rook].map(type => ({ type, color: 'black' })),
]
    .map((row = [], y) => row.map((square = {}, x) => ({ ...square, x, y })))
    .flat();
