const fs = require('fs');
const { performance } = require('perf_hooks');

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

fs.readFile('/data/shared_list.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const arr = data.trim().split(',').map(Number);

    const startTime = performance.now();
    const startUsage = process.cpuUsage();
    const startMemory = process.memoryUsage().heapUsed;

    mergeSort(arr);

    const endTime = performance.now();
    const endUsage = process.cpuUsage(startUsage);
    const endMemory = process.memoryUsage().heapUsed;

    fs.writeFileSync('/data/results_js.txt', `Execution time: ${(endTime - startTime) / 1000} seconds\n`);
    fs.writeFileSync('/data/results_js.txt', `CPU time: ${(endUsage.user + endUsage.system) / 1000000} seconds\n`, { flag: 'a' });
    fs.writeFileSync('/data/results_js.txt', `Memory usage: ${endMemory - startMemory} bytes\n`, { flag: 'a' });
});
