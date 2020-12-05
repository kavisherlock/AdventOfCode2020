import numpy as np

f = open("../input", "r")
seats = f.readlines()

seatsTaken = np.zeros(905)
for seat in seats:
    rowKey = seat[:7]
    rowBin = list(reversed(list(map(lambda x: 1 if x == 'B' else 0, rowKey))))
    rowNumber = 0
    for i in range(len(rowBin)):
        rowNumber += (2 ** i) * rowBin[i]

    colKey = seat[7:10]
    colBin = list(reversed(list(map(lambda x: 1 if x == 'R' else 0, colKey))))
    colNumber = 0
    for i in range(len(colBin)):
        colNumber += (2 ** i) * colBin[i]

    seatId = rowNumber * 8 + colNumber
    seatsTaken[seatId] = 1

for seat in range(len(seatsTaken)):
    if seatsTaken[seat] == 0 and seatsTaken[seat + 1] == 1 and seatsTaken[seat - 1] == 1:
        print(seat)
