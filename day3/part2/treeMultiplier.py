f = open("../input", "r")
treeMap = f.readlines()
nRows = len(treeMap)
nCols = len(treeMap[0]) - 1
treeProduct = 1

for slopeC, slopeR in [[3, 1], [1, 1], [5, 1], [7, 1], [1, 2]]:
    nTrees = 0
    currentRow = 0
    currentCol = 0

    while currentRow < nRows:
        if treeMap[currentRow][currentCol] == '#':
            nTrees += 1
        currentRow += slopeR
        currentCol += slopeC
        currentCol %= nCols

    treeProduct *= nTrees

print(treeProduct)
