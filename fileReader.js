const fs = require('fs');

async function readLines(filepath) {
  const lines = [];
  try {
    const fileData = await fs.readFileSync(filepath, 'utf8');
    curLine = '';
    for(let i = 0; i < fileData.length; i += 1) {
      if(fileData[i] === '\n') {
        lines.push(curLine);
        curLine = '';
      } else {
        curLine += fileData[i];
      }
    }
  } catch (err) {
  console.error(err);
  }

  return lines;
}

module.exports = { readLines };
