import time

def timetaken(func):
  tic = time.perf_counter()
  func()
  toc = time.perf_counter()
  print(f"Time taken {toc - tic:0.8f} seconds")

def averagetime(func, n=100):
  tic = time.perf_counter()
  for _ in range(n):
    func()
  toc = time.perf_counter()
  print(f"Average Time taken {(toc - tic)/n:0.8f} seconds")
