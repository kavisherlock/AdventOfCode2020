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
        forms.append(curForm[:-1])
        curForm = ""
    else:
        curForm += curLine[:-1] + ','
    curLineNumber += 1
forms.append(curForm[:-1])

questionSum = 0
for form in forms:
    questions = np.zeros(26)
    splitForms = form.split(',')
    for splitForm in splitForms:
        for question in splitForm:
            questions[ord(question) - 97] += 1
    for question in questions:
        if question == len(splitForms):
            questionSum += 1

print(questionSum)
