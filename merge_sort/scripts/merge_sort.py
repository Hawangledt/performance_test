import time
import os
import psutil

def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

if __name__ == "__main__":
    with open('/data/shared_list.txt', 'r') as f:
        arr = list(map(int, f.readline().strip().split(',')))

    start_time = time.time()
    process = psutil.Process(os.getpid())
    cpu_times_start = process.cpu_times()
    memory_start = process.memory_info().rss

    merge_sort(arr)

    end_time = time.time()
    cpu_times_end = process.cpu_times()
    memory_end = process.memory_info().rss

    with open('/data/results_python.txt', 'w') as f:
        f.write(f"Execution time: {end_time - start_time} seconds\n")
        f.write(f"CPU time: {cpu_times_end.user - cpu_times_start.user} seconds\n")
        f.write(f"Memory usage: {memory_end - memory_start} bytes\n")
