f = open("../input", "r")
passwordLines = f.readlines()

def passwordLineParser(passwordLine):
  sections = passwordLine.split(' ')
  return list(map(lambda e: (int(e)), sections[0].split('-'))), sections[1][0], sections[2][:-1]

parsedLines = list(map(passwordLineParser, passwordLines))
nValid = 0

for line in parsedLines:
  positions = line[0]
  letter = line[1]
  password = line[2]
  if (password[positions[0] - 1] == letter or password[positions[1] - 1] == letter) and not(password[positions[0] - 1] == letter and password[positions[1] - 1] == letter):
    nValid += 1

print (nValid)