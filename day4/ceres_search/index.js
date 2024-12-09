const fs = require('node:fs');

class Vector2 {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return (other.x === this.x && this.y === other.y);
    }
}

class Occurrence {
    positions;
    direction = new Vector2(0, 0)

    constructor(length) {
        this.positions = [length];
    }
}


let grid = []
let columns = 0
let rows = 0
let occurrences = []

start();

function make_grid(input) {
    const lines = input.split("\n");

    grid = [];
    rows = lines.length;
    columns = lines[0].trim().length;

    // Initialize grid
    for (let x = 0; x < columns; x++) {
        grid[x] = [];
        for (let y = 0; y < rows; y++) {
            grid[x][y] = lines[y][x];
        }
    }
}

function is_valid(x, y) {
    return (x >= 0 && x < columns) && (y >= 0 && y < rows);
}


function try_direction(fromX, fromY, dirX, dirY, word) {

    for (let index = 1; index < word.length; index++) {
        const x = fromX + (dirX * index);
        const y = fromY + (dirY * index);
        if (is_valid(x, y)) {
            if (!(grid[x][y] === word[index])) {
                return false;
            }
        } else {
            return false;
        }
    }

    return true;
}

function try_direction_and_store(fromX, fromY, dirX, dirY, word) {

    for (let index = 1; index < word.length; index++) {
        const x = fromX + (dirX * index);
        const y = fromY + (dirY * index);
        if (is_valid(x, y)) {
            if (!(grid[x][y] === word[index])) {
                return false;
            }
        } else {
            return false;
        }
    }


    let occurrence = new Occurrence();
    occurrence.direction = new Vector2(dirX, dirY);

    for (let i = 0; i < word.length; i++) {
        occurrence.positions[i] = new Vector2(fromX + i * dirX, fromY + i * dirY);
    }

    occurrences.push(occurrence);
    return true;
}


function try_all_directions(x, y, word, onFound) {
    if (try_direction(x, y, -1, -1, word)) onFound();
    if (try_direction(x, y, 0, -1, word)) onFound(); // T
    if (try_direction(x, y, 1, -1, word)) onFound(); // TR
    if (try_direction(x, y, 1, 0, word)) onFound(); // R
    if (try_direction(x, y, 1, 1, word)) onFound(); // BR
    if (try_direction(x, y, 0, 1, word)) onFound(); // B
    if (try_direction(x, y, -1, 1, word)) onFound(); // BL
    if (try_direction(x, y, -1, 0, word)) onFound(); // L
}

function try_all_directions_and_store(x, y, word, onFound) {
    if (try_direction_and_store(x, y, -1, -1, word)) onFound();
    if (try_direction_and_store(x, y, 0, -1, word)) onFound(); // T
    if (try_direction_and_store(x, y, 1, -1, word)) onFound(); // TR
    if (try_direction_and_store(x, y, 1, 0, word)) onFound(); // R
    if (try_direction_and_store(x, y, 1, 1, word)) onFound(); // BR
    if (try_direction_and_store(x, y, 0, 1, word)) onFound(); // B
    if (try_direction_and_store(x, y, -1, 1, word)) onFound(); // BL
    if (try_direction_and_store(x, y, -1, 0, word)) onFound(); // L
}

function count_word(word) {
    let count = 0;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y] === word[0]) {
                try_all_directions(x, y, word, () => {
                    count++;
                });
            }
        }
    }
    return count;
}

function count_word_and_store(word) {
    let count = 0;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y] === word[0]) {
                try_all_directions_and_store(x, y, word, () => {
                    count++;
                });
            }
        }
    }
    return count;
}

function part1() {
    console.log(`Part 1 Count: ${count_word("XMAS")}`);
    occurrences = [];
}

const DIRECTIONS = {
    BR: new Vector2(1, 1),
    BL: new Vector2(-1, 1),
    TL: new Vector2(-1, -1),
    TR: new Vector2(1, -1),
}

function part2() {

    const word = "MAS";
    count_word_and_store(word)
    const halfLength = Math.floor(word.length / 2);

    let final_count = 0;

    console.log(occurrences[0].direction);
    console.log(occurrences[1].direction);

    for (let i = occurrences.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            const iDirection = occurrences[i].direction;
            const jDirection = occurrences[j].direction;

            if (occurrences[i].positions[halfLength].equals(occurrences[j].positions[halfLength])) {

                for (const chosenDirection in DIRECTIONS) {
                    if (iDirection.equals(DIRECTIONS[chosenDirection])) {
                        for (const otherDirection in DIRECTIONS) {
                            if (otherDirection !== chosenDirection && jDirection.equals(DIRECTIONS[otherDirection])) {
                                final_count++
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(`Part 2 Count: ${final_count}`);
}

async function start() {
    await fs.readFile('input.txt', 'utf-8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }

        make_grid(data)
        // part1();
        part2();
    });
}





