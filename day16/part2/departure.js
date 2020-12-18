const { readLines } = require('../../fileReader')

const MAX_VALUE = 1000;

async function main() {
  let ticketData = await readLines('../input.txt');
  const ranges = [];
  let ticket;
  let nearbyTickets = [];

  // Separate data into ranges, your ticket and nearby tickets
  let curLineType = 'range';
  for (let i = 0; i < ticketData.length; i += 1) {
    if (!ticketData[i].trim() || ticketData[i] === '\n') continue;
    if (ticketData[i].includes('your ticket')) {
      curLineType = 'ticket';
      continue;
    }
    if (ticketData[i].includes('nearby tickets')) {
      curLineType = 'nearby';
      continue;
    }

    if (curLineType === 'range') ranges.push(ticketData[i].trim().split(': ')[1].split(' or ').map(a => a.split('-').map(a => parseInt(a, 10))));
    else if (curLineType === 'ticket') ticket = ticketData[i].trim().split(',').map(a => parseInt(a, 10));
    else nearbyTickets.push(ticketData[i].trim().split(',').map(a => parseInt(a, 10)));
  }

  // Make the range number line
  const rangeNumberLine = new Array(MAX_VALUE + 1);
  ranges.forEach(rangeSets => {
    rangeSets.forEach(rangeValues => {
      for (let i = rangeValues[0]; i <= rangeValues[1]; i += 1) {
        rangeNumberLine[i] = 1;
      }
    });
  });

  // Eliminate invalid tickets
  nearbyTickets = nearbyTickets.filter(ticketValues => {
    for (let i = 0; i < ticketValues.length; i += 1) {
      if (ticketValues[i] > MAX_VALUE || !rangeNumberLine[ticketValues[i]]) {
        return false;
      }
    }
    return true;
  });

  // Find candidate ranges for each field
  const rangeCandidatesTable = [];
  for (let i = 0; i < nearbyTickets[0].length; i += 1) {
    let rangeCandidates = new Array(ranges.length);
    for (let j = 0; j < nearbyTickets.length; j += 1) {
      for (let k = 0; k < ranges.length; k += 1) {
        const ticketValue = nearbyTickets[j][i];
        if ((ticketValue < ranges[k][0][0] || ticketValue > ranges[k][0][1]) && (ticketValue < ranges[k][1][0] || ticketValue > ranges[k][1][1])) {
          rangeCandidates[k] = 0;
        }
      }
    }
    for (let k = 0; k < ranges.length; k += 1) {
      if (rangeCandidates[k] !== 0) rangeCandidates[k] = 1;
    }
    rangeCandidatesTable.push(rangeCandidates);
  }

  // rangeCandidatesTable: x axis is field (column) on ticket, y axis is range
  // rangeCandidatesTable[x][y] tells you if range y is a candidate for field x on a ticket

  // Find the indeces of a sorted rangeCandidatesTable to see which fields have how many range candidates
  const rangeCandidateSums = rangeCandidatesTable.map(a => a.reduce((x, y) => x + y));
  const rangeCandidateSortIndeces = new Array(ranges.length);
  rangeCandidateSums.forEach((r, i) => {
    rangeCandidateSortIndeces[r - 1] = i;
  });

  // Find which candidate is the only one valid and not already in use
  const fieldLocations = new Array(ranges.length);
  rangeCandidateSortIndeces.forEach(r => {
    rangeCandidates = rangeCandidatesTable[r];
    for (let i = 0; i < rangeCandidates.length; i += 1) {
      if (rangeCandidates[i] === 1 && fieldLocations[i] === undefined) {
        fieldLocations[i] = r;
        break;
      }
    }
  });

  // Find the departure value (product of value in the location of the first six fields)
  let departure = 1;
  for (let i = 0; i < 6; i += 1) {
    departure *= ticket[fieldLocations[i]];
  }
  console.log(departure);
}


main();
