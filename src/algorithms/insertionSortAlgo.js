
export default function insertionSort(A){
    let key, i, j;
    const n = A.length;
    const swaps = [];
    for(i = 1; i < n; i++){
        key = A[i];
        j = i - 1;
        while(j >= 0 && A[j] > key){
            swaps.push([j, j+1, true]);
            A[j+1] = A[j];
            j--;
        }
        swaps.push([j, j+1, false]);
        A[j + 1] = key;
    }
    return swaps;
}