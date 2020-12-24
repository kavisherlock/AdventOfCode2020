const { readLines } = require('../../fileReader');

const regexData = {};
const pureRegexes = {};

const getPureRegex = (key) => {
  if (pureRegexes[key]) return pureRegexes[key];

  if (regexData[key] === '"a"' || regexData[key] === '"b"') {
    pureRegexes[key] = regexData[key][1];
    return regexData[key][1];
  }

  const subrules = regexData[key].split(' | ');
  let regex = subrules.length > 1 ? '(' : '';
  for (let i = 0; i < subrules.length; i += 1) {
    const ruleKeys = subrules[i].split(' ').filter(a => a.length);
    ruleKeys.forEach(ruleKey => {
      regex += getPureRegex(ruleKey)
    });
    if (i < subrules.length - 1) regex += '|'
  }
  if (subrules.length > 1) regex += ')';

  pureRegexes[key] = regex;
  return regex;
}

async function main() {
  const messageData = await readLines('../input.txt');
  const messages = [];
  let messageTime = false;

  for (let i = 0; i < messageData.length; i += 1) {
    if (!messageData[i].trim() || messageData[i] === '\n') {
      messageTime = true;
      continue;
    }

    if (messageTime) {
      messages.push(messageData[i].trim());
    } else {
      const [key, regex] = messageData[i].split(': ');
      regexData[key] = regex.trim();
    }
  }


  const regex = new RegExp('^' + getPureRegex('0') + '$');

  console.log(messages.filter(m => regex.test(m)).length);
}

main();
