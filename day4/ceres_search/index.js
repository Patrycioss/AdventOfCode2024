const fs = require('node:fs');

start();

function part1(input) {
    const lines = input.split("\n");

    let grid = [];
    let rows = lines.length;
    let columns = lines[0].trim().length;

    // Initialize grid
    for (let x = 0; x < columns; x++) {
        grid[x] = [];
        for (let y = 0; y < rows; y++) {
            grid[x][y] = lines[y][x];
        }
    }

    function is_valid(x, y) {
        return (x >= 0 && x < columns) && (y >= 0 && y < rows);
    }


    const word = "XMAS";

    function try_direction(fromX, fromY, dirX, dirY) {

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

    function try_all_directions(x, y, onFound) {
        if (try_direction(x, y, -1, -1)) onFound();
        if (try_direction(x, y, 0, -1)) onFound(); // T
        if (try_direction(x, y, 1, -1)) onFound(); // TR
        if (try_direction(x, y, 1, 0)) onFound(); // R
        if (try_direction(x, y, 1, 1)) onFound(); // BR
        if (try_direction(x, y, 0, 1)) onFound(); // B
        if (try_direction(x, y, -1, 1)) onFound(); // BL
        if (try_direction(x, y, -1, 0)) onFound(); // L
    }
    
    let count = 0;

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y] === "X") {
                try_all_directions(x, y, () => {
                    count++;
                });
            }
        }
    }
    console.log(`Part 1 Count: ${count}`);
}

function part2(input) {

}

async function start() {
    await fs.readFile('input.txt', 'utf-8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }

        part1(data);
    });
}





