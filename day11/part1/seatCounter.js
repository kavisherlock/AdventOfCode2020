const { readLines } = require('../../fileReader')

const isSeatEmpty = (seats, r, c) => {
    const nRows = seats.length;
    const nCols = seats[0].length;

    return r < 0 || r >= nRows || c < 0 || c >= nCols || seats[r][c] !== '#';
}

const countEmptyAdjacentSeats = (seats, r, c) => {
    let emptySeats = 0;
    
    if (isSeatEmpty(seats, r - 1, c - 1)) emptySeats += 1;
    if (isSeatEmpty(seats, r - 1, c)) emptySeats += 1;
    if (isSeatEmpty(seats, r - 1, c + 1)) emptySeats += 1;
    
    if (isSeatEmpty(seats, r, c - 1)) emptySeats += 1;
    if (isSeatEmpty(seats, r, c + 1)) emptySeats += 1;

    if (isSeatEmpty(seats, r + 1, c - 1)) emptySeats += 1;
    if (isSeatEmpty(seats, r + 1, c)) emptySeats += 1;
    if (isSeatEmpty(seats, r + 1, c + 1)) emptySeats += 1;

    return emptySeats;
}

const areSeatDataEqual = (seats1, seats2) => {
    const nRows = seats1.length;
    const nCols = seats1[0].length
    for (let r = 0; r < nRows; r += 1) {
        for (let c = 0; c < nCols; c += 1) {
            if (seats1[r][c] !== seats2[r][c]) return false;
        }
    }

    return true;
}

const runRound = (seats) => {
    const nRows = seats.length;
    const nCols = seats[0].length
    const newSeatData = [];

    for (let r = 0; r < nRows; r += 1) {
        newSeatData.push([]);
        for (let c = 0; c < nCols; c += 1) {
            const seat = seats[r][c];
            if (seat === '.') {
                newSeatData[r].push('.');
            } else if (seat === 'L') {
                if (countEmptyAdjacentSeats(seats, r, c) === 8) {
                    newSeatData[r].push('#');
                } else {
                    newSeatData[r].push('L');
                }
            } else if (seat === '#') {
                if (countEmptyAdjacentSeats(seats, r, c) <= 4) {
                    newSeatData[r].push('L');
                } else {
                    newSeatData[r].push('#');
                }
            }
        }
    }

    return newSeatData;
}

const countOccupiedSeats = (seats) => {
    const nRows = seats.length;
    const nCols = seats[0].length
    let occupiedSeats = 0;
    for (let r = 0; r < nRows; r += 1) {
        for (let c = 0; c < nCols; c += 1) {
            if (seats[r][c] === '#') {
                occupiedSeats += 1;
            }
        }
    }

    return occupiedSeats;
}

async function main() {
    let seatData = await readLines('../input.txt');
    let updatedSeatData = runRound(seatData);
    let roundsRun = 1;
    while (!areSeatDataEqual(updatedSeatData, seatData)) {
        seatData = updatedSeatData;
        updatedSeatData = runRound(seatData);
        roundsRun += 1;
    }

    console.log(countOccupiedSeats(seatData), roundsRun);
}

main();