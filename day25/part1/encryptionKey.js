const main = () => {
  const cardPublicKey = 9033205;
  const doorPublicKey = 9281649;

  let cardLoopSize = 0;
  let doorLoopSize = 0;

  const subjectNumber = 7;
  const divisor = 20201227;

  let cardLoopResult = 1;
  while (cardLoopResult !== cardPublicKey) {
    cardLoopResult = cardLoopResult * subjectNumber;
    cardLoopResult = cardLoopResult % divisor;
    cardLoopSize += 1;
  }

  let doorLoopResult = 1;
  while (doorLoopResult !== doorPublicKey) {
    doorLoopResult = doorLoopResult * subjectNumber;
    doorLoopResult = doorLoopResult % divisor;
    doorLoopSize += 1;
  }

  let encryptionKey = 1;
  for (let i = 0; i < cardLoopSize; i += 1) {
    encryptionKey *= doorPublicKey;
    encryptionKey %= divisor;
  }
  console.log(encryptionKey);
};

main();