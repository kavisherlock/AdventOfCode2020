f = open("../input", "r")
treeMap = f.readlines()

nTrees = 0
currentRow = 0
currentCol = 0
nRows = len(treeMap)
nCols = len(treeMap[0]) - 1

while currentRow < nRows:
    if treeMap[currentRow][currentCol] == '#':
        nTrees += 1
    currentRow += 1
    currentCol += 3
    currentCol %= nCols

print (nTrees)