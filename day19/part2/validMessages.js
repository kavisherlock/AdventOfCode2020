const { readLines } = require('../../fileReader');

const regexData = {};
const pureRegexes = {};

const getPureRegex = (key) => {
  if (['8', '42', '0'].includes(key))
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


  const regex42 = getPureRegex('42');
  const regex31 = getPureRegex('31');

  const regex8 = `((${regex42})+)`;
  const regex11Lower = `((${regex42}${regex31})|(${regex42}${regex42}${regex31}${regex31})|(${regex42}${regex42}${regex42}${regex31}${regex31}${regex31})|(${regex42}${regex42}${regex42}${regex42}${regex31}${regex31}${regex31}${regex31})|(${regex42}${regex42}${regex42}${regex42}${regex42}${regex31}${regex31}${regex31}${regex31}${regex31})|(${regex42}${regex42}${regex42}${regex42}${regex42}${regex42}${regex31}${regex31}${regex31}${regex31}${regex31}${regex31})|(${regex42}${regex42}${regex42}${regex42}${regex42}${regex42}${regex42}${regex31}${regex31}${regex31}${regex31}${regex31}${regex31}${regex31}))`;
  const regex11Upper = `((${regex42})*(${regex31})*)`;

  // The true expression for 11 is ${regex42}^n${regex31}^n, n > 0
  // Since that isn't regular, I bascially kept adding values of n with an OR in the middle until the output didn't increase
  // I hate myself for a solution like this
  // But it worked

  const regexLower = new RegExp('^' + regex8 + regex11Lower + '$');
  console.log('Lower Bound', messages.filter(m => regexLower.test(m)).length);
  const regexUpper = new RegExp('^' + regex8 + regex11Upper + '$');
  console.log('Upper Bound', messages.filter(m => regexUpper.test(m)).length);
}

main();
