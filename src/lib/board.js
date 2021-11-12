import _ from 'lodash';


const Figure = class {
    constructor(vectors = []) {
        this.vectors = vectors;
    }

    getMovies(position, board) {
        const rel = (zero, item) => ['x', 'y'].reduce(
            (acc, z) => {
                let val = item[z] - zero[z];

                if (zero.color === "black") {
                    val = -1 * val;
                }
                return { ...acc, [z]: val };
            }, item);
        const figures = _.filter(board, 'type');
        const toRel = (vector) => (square) => vector(rel(position, square));
        const restrictions = (vector = []) => {
            const v = position.color === "black" ? vector.reverse() : vector;
            const exclOpp = _.takeWhile(v, square => !_.find(figures, square));
            const incOpp = _.takeWhile(v, square => !_.find(figures, { ...square, color: position.color }));

            return _.take(incOpp, exclOpp.length + 1);
        };

        return this.vectors.map(toRel).map(v => board.filter(v)).map(restrictions).flat();
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
