import _ from 'lodash';


const Figure = class {
    constructor(vectors = []) {
        this.vectors = vectors;
    }

    getMovies(cheesman, position, board) {
        const rel = (zero, item) => ['x', 'y'].reduce(
            (acc, z) => {
                let val = item[z] - zero[z];

                if (zero.color === "black") {
                    val = -1 * val;
                }
                return { ...acc, [z]: val };
            }, item);
        const toRel = (vector) => (square) => vector(rel(cheesman, square));
        const orderByCheesman = (a, b) => {
            const toRel = square => _.mapValues(rel(cheesman, square), Math.abs);

            return ['x', 'y'].some(z => toRel(a)[z] > toRel(b)[z]) ? 1 : -1;
        };
        const restrictions = (vector = []) => {
            const exclOpp = _.takeWhile(vector, square => !_.find(position, square));
            const incOpp = _.takeWhile(vector, square => !_.find(position, { ...square, color: cheesman.color }));

            return _.take(incOpp, exclOpp.length + 1);
        };

        return (
            this.vectors
                .map(toRel)
                .map(vector => board.flat().filter(vector).sort(orderByCheesman))
                .map(restrictions)
                .flat()
        );
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

export const Board = (length = 8) => (
    new Array(length).fill().map((row, y) =>
        new Array(length).fill().map((cell, x) =>
            ({ x, y })
        )
    )
)

export const position = _.flattenDeep([
    [{ y: 0, color: 'white' }, { y: 7, color: 'black' }].map(params =>
        [new Rook, new Knight, new Bishop, new King, new Queen, new Bishop, new Knight, new Rook].map((type, x) => (
            { type, x, ...params }
        ))
    ),
    [{ y: 1, color: 'white' }, { y: 6, color: 'black' }].map(params =>
        new Array(8).fill().map((cell, x) => (
            { x, type: new Pawn, ...params }
        ))
    ),
]);
