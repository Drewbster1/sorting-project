//variables 
const container = document.querySelector('.container'); //container holding all bars
const buttons = document.getElementsByClassName('btn'); // arr holding all btns 
const newArray = document.querySelector(".newArray");  // new arr btn 
const arr = document.querySelectorAll('.bar'); // arr for all the bars 
const bubbleSortButton = document.querySelector(".bubble-sort"); //bubble sort button 
const heapSortButton = document.querySelector(".heap-sort"); //heap sort button 
const insertionSortButton = document.querySelector(".insertion-sort"); //insertion sort button
const mergeSortButton = document.querySelector(".merge-sort"); //merge sort button
const quickSortButton = document.querySelector(".quick-sort"); //quick sort button
const selectionSortButton = document.querySelector(".selection-sort"); //quick sort button


const arraySize = 100;

//initial array 
createArray(arraySize); 

// generate an array of 100 values between 5, 1000
function createArray(size){
    //clear the page 
   container.innerHTML = ""; 

   //create divs 
   for(let i = 0 ;i<size ; i++){
        let divSize = getRandomInt(5,650); 
        let divs =  document.createElement('div'); 
        divs.style.height = `${divSize}px`; 
        divs.classList.add("bar");
        //divs.style.transform = `translateX(${i * 5}px)`;
        container.appendChild(divs);   
   }
}
//this function returns random int between a min and max 
function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min ) + min); 
}

//disable buttons 
function disableButtons(){
    for(let i = 0 ; i<buttons.length ; i++){
        buttons[i].disabled = true; 
    }
}
//enable buttons
function enableButtons(){
    for(let i = 0 ; i<buttons.length ; i++){
        buttons[i].disabled = false; 
    }
}
//delay for animation
function wait () { 
    return new Promise(resolve => {
        setTimeout(() => {resolve()},1)
    });
}
//swap funciton 
function swap(cur, prev){
   let temp = cur.style.height;
   cur.style.height = prev.style.height;
   prev.style.height = temp; 
}
/* =========== BUTTON EVENT LISTENERS  =========== */  
//new array button 
newArray.addEventListener("click", function() {
    createArray(arraySize);
});

//bubble sort button 
bubbleSortButton.addEventListener("click", async function() {
    //dsiable bubttons 
    disableButtons(); 
    await bubbleSort();
    enableButtons();
});
//heap sort button 
heapSortButton.addEventListener("click", async function(){
    //diable buttons 
    disableButtons();
    await heapSort(); 
    enableButtons(); 
}); 
//insertion sort button 
insertionSortButton.addEventListener("click", async function(){
    //diable buttons 
    disableButtons();
    await insertionSort(); 
    enableButtons(); 
}); 
//merge sort button 
mergeSortButton.addEventListener("click", async function(){
    let arr = document.querySelectorAll('.bar'); 
    let l = 0;
    let r = parseInt(arr.length-1);
    disableButtons();
    await mergeSort(arr,l, r); 
    enableButtons(); 
}); 
//quick sort button 
quickSortButton.addEventListener("click", async function(){
    //diable buttons 
    let arr = document.querySelectorAll('.bar'); 
    let l = 0;
    let r = arr.length-1;
    disableButtons();
    await quickSort(arr,l,r); 
    enableButtons(); 
}); 
//selection sort button 
selectionSortButton.addEventListener("click", async function(){
    //diable buttons 
    disableButtons();
    await selectionSort();
    enableButtons(); 
}); 
/* =========== SORTING ALGORITHMS =========== */ 
//bubble sort 
async function bubbleSort(){
    const arr = document.querySelectorAll('.bar');
    for(let i = 0 ; i<arr.length -1 ; i++){
        for (let j = 0; j<arr.length - i - 1 ; j++){
            //set colors 
            arr[j].style.background = 'red';
            arr[j+1].style.background = 'red'; 
            if(parseInt(arr[j].style.height) > parseInt(arr[j+1].style.height)){
                await wait();
                swap(arr[j],arr[j+1])
            }
            arr[j].style.background = 'black';
            arr[j+1].style.background = 'black'; 
        }
        arr[arr.length-1-i].style.background = 'green';
    }
    arr[0].style.background = 'green';
}
//heap sort 
async function heapSort(){
    let arr = document.querySelectorAll('.bar');
     var n = arr.length;
 
        // Build heap (rearrange array)
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--){
            heapify(arr, n, i);
        }
        // One by one extract an element from heap
        for (var i = n - 1; i > 0; i--) {
            // Move current root to end
            arr[0].style.background = 'red';
            arr[i].style.background = 'red';
           
            await wait();
            var temp = arr[0].style.height;
            arr[0].style.height = arr[i].style.height;
            arr[i].style.height = temp;

            arr[0].style.background = 'green';
            arr[i].style.background = 'green';
            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
}
async function heapify(arr,n,i){
        var largest = i; // Initialize largest as root
        var l = 2 * i + 1; // left = 2*i + 1
        var r = 2 * i + 2; // right = 2*i + 2
        // If left child is larger than root
        if (l < n && parseInt(arr[l].style.height) > parseInt(arr[largest].style.height))
            largest = l;
        // If right child is larger than largest so far
        if (r < n && parseInt(arr[r].style.height) > parseInt(arr[largest].style.height))
            largest = r;
        // If largest is not root
        if (largest != i) {
            var swap = arr[i].style.height;
            arr[i].style.height = arr[largest].style.height;
            arr[largest].style.height = swap;
 
            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
}
//insertion sort 
async function insertionSort(){
    const arr = document.querySelectorAll('.bar'); 
        for (let i = 0 ; i< arr.length; i++){ 
            //key
            let j = i; 
            arr[j].style.background = 'red';
            while (j > 0 && parseInt(arr[j-1].style.height) > parseInt(arr[j].style.height)){
                arr[j].style.background = 'red';
                await wait();
                swap(arr[j],arr[j-1]);
                arr[j].style.background = 'green';
                j = j-1; 
            }
            arr[i].style.background = 'green'; 

        }
}
//merge sort 
async function merge(ele, low, mid, high){
   
    const n1 = mid - low + 1;
    const n2 = high - mid;
   
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await wait();
       
        // color
        ele[low + i].style.background = 'red';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        await wait();
       
        // color
        ele[mid + 1 + i].style.background = 'red';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await wait();
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        await wait();
        
        // To add color for which two r being compared for merging
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'blue';
            }
            
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'blue';
            } 
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        await wait();
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        await wait();
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r){
    if(l >= r){
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}
//quick sort
async function quickSort(arr,l,r){
    if(l<r){
        let pivot = await partition(arr,l,r); 
        await quickSort(arr,l,pivot-1); 
        await quickSort(arr,pivot+1,r)
    }
    else{
        if (l >= 0 && r>=0 && l<arr.length && r < arr.length){
            arr[r].style.background = 'green'; 
            arr[l].style.background = 'green'; 
        }
    }
}
async function partition(ele, l, r){
    let i = l - 1;
    // color pivot element
    ele[r].style.background = 'red';
    for(let j = l; j <= r - 1; j++){
        // color current element
        ele[j].style.background = 'yellow';
      
        await wait();

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
          
            await wait();
        }
        else{
            // color if not less than pivot
            ele[j].style.background = 'blue';
        }
    }
    i++; 

    await wait();
    swap(ele[i], ele[r]); // pivot height one
    // color
    ele[r].style.background ='blue';
    ele[i].style.background = 'green';

    await wait();

    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = 'black';
    }

    return i;
}
//selection sort 
async function selectionSort(){
    const arr = document.querySelectorAll('.bar'); 
    for(let i = 0 ; i< arr.length; i++){
        let min = i; 
        //bar to swap with next min
        arr[i].style.background = 'blue';
        for(let j = i+1 ; j < arr.length; j++){
            //current comprrison bar 
            arr[j].style.background = 'red'; 
            await wait(); 
            if(parseInt(arr[j].style.height) < parseInt(arr[min].style.height)){
                if(min !== i){
                    //change prev index back to black 
                    arr[min].style.background = 'black';
                }
                min = j; 
            }
            else{
                arr[j].style.background = 'black';
            }
        }
        await wait();
        swap(arr[i],arr[min]); 
        arr[min].style.background = 'black'; 
        arr[i].style.background = 'green';
    }

}


