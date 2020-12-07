const fs = require('fs');

let expenseData;
const expenses = [];
try {
  expenseData = fs.readFileSync('./input', 'utf8');
  curExpense = '';
  for(let i = 0; i < expenseData.length; i += 1) {
    if(expenseData[i] === '\n') {
      expenses.push(parseInt(curExpense, 10));
      curExpense = '';
    } else {
      curExpense += expenseData[i];
    }
  }
} catch (err) {
  console.error(err);
}

expenses.sort((a, b) => a - b);
nExpenses = expenses.length;

const expenseProduct = () => {
  for(let i = 0; i < nExpenses; i += 1) {
    for(let j = nExpenses - 1; j > 0; j -= 1) {
      if (expenses[i] + expenses[j] === 2020) {
        console.log(expenses[i] * expenses[j]);
        return;
      }
      if (expenses[i] + expenses[j] < 2020) {
        break;
      }
    }
  }
}

expenseProduct();
