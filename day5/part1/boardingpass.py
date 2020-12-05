f = open("../input", "r")
seats = f.readlines()

maxSeatId = 0
for seat in seats:
    rowKey = seat[:7]
    rowBin = list(reversed(list(map(lambda x: 1 if x == 'B' else 0, rowKey))))
    rowNumber = 0
    for i in range(len(rowBin)):
        rowNumber += (2 ** i) * rowBin[i]

    colKey = seat[8:]
    colBin = list(reversed(list(map(lambda x: 1 if x == 'R' else 0, colKey))))
    colNumber = 0
    for i in range(len(colBin)):
        colNumber += (2 ** i) * colBin[i]

    seatId = rowNumber * 8 + colNumber

    if seatId > maxSeatId:
        maxSeatId = seatId

print(maxSeatId)