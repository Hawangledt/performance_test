import random

numbers = [random.randint(0, 1_000) for _ in range(1_000_000)]

with open('shared_list.txt', 'w') as f:
    f.write(','.join(map(str, numbers)))
