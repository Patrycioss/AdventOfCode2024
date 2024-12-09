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

const DIRECTIONS = {
    BR: new Vector2(1, 1),
    BL: new Vector2(-1, 1),
    TL: new Vector2(-1, -1),
    TR: new Vector2(1, -1),
}

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

function is_valid(pos) {
    return (pos.x >= 0 && pos.x < columns) && (pos.y >= 0 && pos.y < rows);
}

function doesOccur(pos, dir, word, occurrences) {

    for (let i = 1; i < word.length; i++) {
        const newPos = new Vector2(pos.x + i * dir.x, pos.y + i * dir.y);
        if (is_valid(newPos)) {
            if (!(grid[newPos.x][newPos.y] === word[i])) {
                return;
            }
        } else {
            return;
        }
    }

    let occurrence = new Occurrence();
    occurrence.direction = new Vector2(dir.x, dir.y);

    for (let i = 0; i < word.length; i++) {
        occurrence.positions[i] = new Vector2(pos.x + i * dir.x, pos.y + i * dir.y);
    }

    occurrences.push(occurrence);
}

function find_all_occurrences(pos, word, occurrences) {
    doesOccur(pos, new Vector2(-1, -1), word, occurrences);
    doesOccur(pos, new Vector2(0, -1), word, occurrences); // T
    doesOccur(pos, new Vector2(1, -1), word, occurrences); // TR
    doesOccur(pos, new Vector2(1, 0), word, occurrences); // R
    doesOccur(pos, new Vector2(1, 1), word, occurrences); // BR
    doesOccur(pos, new Vector2(0, 1), word, occurrences); // B
    doesOccur(pos, new Vector2(-1, 1), word, occurrences); // BL
    doesOccur(pos, new Vector2(-1, 0), word, occurrences); // L
}

function find_occurrences(word) {
    let occurrences = [];
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y] === word[0]) {
                find_all_occurrences(new Vector2(x, y), word, occurrences);
            }
        }
    }
    return occurrences;
}

function part1() {
    console.log(`Part 1 Count: ${find_occurrences("XMAS").length}`);
}

function part2() {
    const word = "MAS";
    const occurrences = find_occurrences(word)
    const halfLength = Math.floor(word.length / 2);

    let final_count = 0;

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
        part1();
        part2();
    });
}