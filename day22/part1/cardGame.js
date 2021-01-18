const { readLines } = require('../../fileReader');

async function main() {
  const cardData = await readLines('../input.txt');

  let player1Cards = [];
  let player2Cards = [];
  let parsePlayer1 = true;
  cardData.forEach((line, i) => {
    if (i === 0 || !line.trim()) return;
    if (line.trim() === 'Player 2:') {
      parsePlayer1 = false;
      return;
    }
    
    const card = parseInt(line.trim(), 10);
    if (parsePlayer1) player1Cards.push(card);
    else player2Cards.push(card);
  });

  while (player1Cards.length && player2Cards.length) {
    const player1Card = player1Cards[0];
    player1Cards = player1Cards.slice(1)
    const player2Card = player2Cards[0];
    player2Cards = player2Cards.slice(1)

    if (player1Card > player2Card) {
      player1Cards.push(player1Card);
      player1Cards.push(player2Card);
    } else {
      player2Cards.push(player2Card);
      player2Cards.push(player1Card);
    }
  }

  const winnerCards = player2Cards.length ? player2Cards : player1Cards;
  let score = 0;
  winnerCards.forEach((card, i) => {
    score += card * (winnerCards.length - i);
  });

  console.log(score);
}

main();
