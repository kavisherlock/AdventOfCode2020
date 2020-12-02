f = open("../input", "r")
passwordLines = f.readlines()

def passwordLineParser(passwordLine):
  sections = passwordLine.split(' ')
  return list(map(lambda e: int(e), sections[0].split('-'))), sections[1][0], sections[2][:-1]

parsedLines = list(map(passwordLineParser, passwordLines))
nValid = 0

for line in parsedLines:
  limits = line[0]
  letter = line[1]
  password = line[2]
  lettercount = password.count(letter)
  if (lettercount >= limits[0] and lettercount <= limits[1]):
    nValid += 1

print (nValid)