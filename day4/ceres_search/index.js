const fs = require('node:fs');

start();

function part1(input) {
    const lines = input.split("\n");

    for (const line in lines) {
        console.log(lines[line]);
    }

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
        let works = (x >= 0 && x < columns) && (y >= 0 && y < rows);
        console.log(`x: ${x} y: ${y} works? ${works}`);
        return works;
    }

    function try_location(x, y, letter, onFound) {
        if (is_valid(x, y)) {
            console.log(grid[x][y])
            console.log(letter)
            if (grid[x][y] === letter) {
                console.log("Found letter!")
                onFound(x, y)
            }
        }
    }

    const word = "XMAS";

    function try_direction(fromX, fromY, dirX, dirY) {

        for (let index = 1; index < word.length; index++) {
            const x = fromX + (dirX * index);
            const y = fromY + (dirY * index);
            if (is_valid(x, y)) {
                if (!(grid[x][y] === word[index])){
                    return false;
                } 
            }
            else {
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


    function look_around(fromX, fromY, letter, onFound) {
        try_location(fromX - 1, fromY - 1, letter, onFound); // TL
        try_location(fromX, fromY - 1, letter, onFound); // T
        try_location(fromX + 1, fromY - 1, letter, onFound); // TR
        try_location(fromX + 1, fromY, letter, onFound); // R
        try_location(fromX + 1, fromY + 1, letter, onFound); // BR
        try_location(fromX, fromY + 1, letter, onFound); // B
        try_location(fromX - 1, fromY + 1, letter, onFound); // BL
        try_location(fromX - 1, fromY, letter, onFound); // L
    }

    // look_for(0, 0, "M", (x, y) => {
    //     look_for(x, y, "A", (x, y) => {
    //         look_for(x, y, "S", () => {
    //             console.log("Found something!");
    //         })
    //     })
    // });

    let count = 0;

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // console.log(`${x}, ${y}: ${grid[x][y]}`)

            if (grid[x][y] === "X") {
                try_all_directions(x, y, () => {
                    console.log("found");
                    count++;
                });
            }
        }
    }

    console.log(`Count: ${count}`);


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





