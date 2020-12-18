const { readLines } = require('../../fileReader')

const MAX_VALUE = 1000;

async function main() {
  let ticketData = await readLines('../input.txt');
  const ranges = [];
  let ticket;
  const nearbyTickets = [];

  // Separate data into ranges, your ticket and nearby tickets
  let curLineType = 'range';
  for (let i = 0; i < ticketData.length; i += 1) {
    if (!ticketData[i] || ticketData[i] === '\n') continue;
    if (ticketData[i].includes('your ticket')) {
      curLineType = 'ticket';
      continue;
    }
    if (ticketData[i].includes('nearby tickets')) {
      curLineType = 'nearby';
      continue;
    }

    if (curLineType === 'range') ranges.push(ticketData[i].trim());
    else if (curLineType === 'ticket') ticket = ticketData[i].trim();
    else nearbyTickets.push(ticketData[i].trim());
  }

  // Make the range number line
  const rangeNumberLine = new Array(MAX_VALUE + 1);
  ranges.forEach(rangeLine => {
    const rangeSets = rangeLine.split(': ')[1].split(' or ');
    rangeSets.forEach(rangeSet => {
      rangeValues = rangeSet.split('-').map(a => parseInt(a, 10));
      for (let i = rangeValues[0]; i <= rangeValues[1]; i += 1) {
        rangeNumberLine[i] = 1;
      }
    });
  });

  let errorRate = 0;
  nearbyTickets.forEach(ticket => {
    ticketValues = ticket.split(',').map(a => parseInt(a, 10));
    ticketValues.forEach(ticketValue => {
      if (ticketValue > MAX_VALUE || !rangeNumberLine[ticketValue]) {
        errorRate += ticketValue;
      }
    })
  });

  console.log(errorRate);
}

main();
