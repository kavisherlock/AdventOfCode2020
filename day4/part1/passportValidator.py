requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

f = open("../input", "r")
passportLines = f.readlines()
curLineNumber = 0
nLines = len(passportLines)
nValidPassports = 0
nColons = 0
hasCid = False
while curLineNumber < nLines:
    curLine = passportLines[curLineNumber]
    nColons += curLine.count(':')
    hasCid = ("cid" in curLine) or hasCid
    if len(curLine) == 1:
        if (nColons == len(requiredFields) and not hasCid) or nColons == (len(requiredFields) + 1):
            nValidPassports += 1
        nColons = 0
        hasCid = False
    curLineNumber += 1

print(nValidPassports)
