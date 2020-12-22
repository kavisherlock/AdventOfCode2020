const { readLines } = require('../../fileReader');

const operators = ['+', '*'];

const solveSimpleEquation = (equation) => {
  equationComponents = equation.trim().split(' ');
  let left = parseInt(equationComponents[0], 10);
  let operator;
  for (let i = 1; i < equationComponents.length; i += 1) {
    if (operators.includes(equationComponents[i])) {
      operator = equationComponents[i];
    } else {
      if (operator === '+') {
        left = left + parseInt(equationComponents[i], 10);
      } else {
        left = left * parseInt(equationComponents[i], 10);
      }
    }
  }

  return left;
}

const findCorrespondingClosingParenthesis = (equation, openIndex) => {
  let nOpen = 1;
  let curIndex = openIndex + 1;
  while (nOpen && curIndex < equation.length) {
    if (equation[curIndex] === '(') {
      nOpen += 1;
    }
    if (equation[curIndex] === ')') {
      nOpen -= 1;
    }
    curIndex += 1;
  }
  return curIndex;
}

const solveComplexEquation = (equation) => {
  if (!equation.length) return 0;
  if (!equation.includes('(')) return solveSimpleEquation(equation);

  const firstOpenParenthesis = equation.indexOf('(');
  const firstCloseParenthesis = findCorrespondingClosingParenthesis(equation, firstOpenParenthesis);

  const equationPart1 = equation.substr(0, firstOpenParenthesis);
  const equationPart2 = equation.substr(firstOpenParenthesis + 1, firstCloseParenthesis - firstOpenParenthesis - 2);
  const equationPart3 = equation.substr(firstCloseParenthesis)

  return solveComplexEquation(equationPart1 + solveComplexEquation(equationPart2).toString() + equationPart3);
}

async function main() {
  const equationData = await readLines('../input.txt');
  let sum = 0;

  equationData.forEach(equation => {
    sum += solveComplexEquation(equation);
  });

  console.log(sum);
}

main();
