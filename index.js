// eslint-disable-next-line import/extensions
import mergeSort from "./commonUtils.js";

function createTreeNode(data, left = null, right = null) {
  return { data, left, right };
}

function buildTreeFromSortedArray(sortedArray) {
  const start = 0;
  const end = sortedArray.length - 1;
  const midpoint = Math.floor((start + end) / 2);

  if (start > end) {
    return null;
  }

  const leftArray = sortedArray.slice(start, midpoint);
  const rightArray = sortedArray.slice(midpoint + 1, end + 1);

  const leftNode = buildTreeFromSortedArray(leftArray);
  const rightNode = buildTreeFromSortedArray(rightArray);

  const currentNode = createTreeNode(
    sortedArray[midpoint],
    leftNode,
    rightNode
  );
  return currentNode;
}

function buildTree(array) {
  const sortedArray = mergeSort.sort(array);
  return sortedArray;
}

const testArray = [1, 3, 5, 7, 8, 9, 10];

console.log(buildTreeFromSortedArray(testArray));
