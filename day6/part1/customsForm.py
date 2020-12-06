import numpy as np

f = open("../input", "r")
formLines = f.readlines()
curLineNumber = 0
nLines = len(formLines)
curForm = ""
forms = []
while curLineNumber < nLines:
    curLine = formLines[curLineNumber]
    if curLine == '\n':
        forms.append(curForm)
        curForm = ""
    else:
        curForm += curLine[:-1]
    curLineNumber += 1
forms.append(curForm)

questionSum = 0
for form in forms:
    questions = np.zeros(26)
    for question in form:
        questions[ord(question) - 97] = 1
    questionSum += np.sum(questions)

print(questionSum)
