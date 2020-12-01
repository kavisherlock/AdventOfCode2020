from timetaken import averagetime, timetaken

f = open("input", "r")
expenses = f.readlines()
expenses = list(map(lambda e: int(e), expenses))
n_expenses = len(expenses)

def bruteforce():
  for i in range(n_expenses):
    for j in range(n_expenses):
      for k in range(n_expenses):
        if (i != j and j != k and k != i and expenses[i] + expenses[j] + expenses[k] == 2020):
          return expenses[i] * expenses[j] * expenses[k]

def sortedfirst():
  expenses.sort()
  for i in range(n_expenses):
    for j in range(n_expenses):
      if (i != j and expenses[i] + expenses[j] > 2020):
        continue
      for k in range(n_expenses):
        if (i != j and j != k and k != i):
          if (expenses[i] + expenses[j] + expenses[k] == 2020):
            return expenses[i] * expenses[j] * expenses[k]
          if (expenses[i] + expenses[j] + expenses[k] > 2020):
            break

print("Brute Force")
timetaken(bruteforce)

print("Sorted")
timetaken(sortedfirst)

print(sortedfirst())
