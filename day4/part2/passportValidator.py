import re

f = open("../input", "r")
passportLines = f.readlines()
curLineNumber = 0
nLines = len(passportLines)
passports = []
curPassport = ""
while curLineNumber < nLines:
    curLine = passportLines[curLineNumber]
    curPassport += curLine[:-1] + " "
    if len(curLine) == 1:
        passports.append(curPassport)
        curPassport = ""
    curLineNumber += 1

nValidPassports = 0
for passport in passports:
    fields = list(filter(lambda x: x != '' and "cid" not in x, passport.split(' ')))
    if len(fields) != 7:
        continue

    isValid = True
    for field in fields:
        keyValue = field.split(':')
        key = keyValue[0]
        value = keyValue[1]

        if key == 'byr':
            byr = int(value)
            if byr < 1920 or byr > 2002:
                isValid = False

        if key == 'iyr':
            iyr = int(value)
            if iyr < 2010 or iyr > 2020:
                isValid = False

        if key == 'eyr':
            eyr = int(value)
            if eyr < 2020 or eyr > 2030:
                isValid = False

        if key == 'hgt':
            hUnit = value[-2:]
            if hUnit == 'in':
                hVal = int(value[:-2])
                if hVal < 59 or hVal > 76:
                    isValid = False
            elif hUnit == 'cm':
                hVal = int(value[:-2])
                if hVal < 150 or hVal > 193:
                    isValid = False
            else:
                isValid = False

        if key == 'hcl':
            if not re.search("#([a-f0-9]{6})", value):
                isValid = False

        if key == 'ecl':
            if value not in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]:
                isValid = False

        if key == 'pid':
            if len(value) != 9 or not re.search("[0-9]{9}", value):
                isValid = False

    if isValid:
        nValidPassports += 1

print (nValidPassports)
