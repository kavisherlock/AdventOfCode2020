from timetaken import averagetime, timetaken

f = open("input", "r")
expenses = f.readlines()
expenses = list(map(lambda e: int(e), expenses))
n_expenses = len(expenses)

def bruteforce():
  for i in range(n_expenses):
    for j in range(n_expenses):
      if (i != j and expenses[i] + expenses[j] == 2020):
        return expenses[i] * expenses[j]

def sortedfirst():
  expenses.sort()
  for i in range(n_expenses):
    for j in reversed(range(n_expenses)):
      if (expenses[i] + expenses[j] < 2020):
        continue
      if (i != j and expenses[i] + expenses[j] == 2020):
        return expenses[i] * expenses[j]

print("Brute Force")
timetaken(bruteforce)
averagetime(bruteforce)

print("Sorted")
timetaken(sortedfirst)
averagetime(sortedfirst)

print(sortedfirst())

