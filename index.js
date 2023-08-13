import mergeSort from "./commonUtils.js";

const splitArrayInHalfUtil = mergeSort.splitArrayInHalf;

function createTreeNode(value, left = null, right = null) {
  return { value, left, right };
}

function buildTreeFromSortedArray(sortedArray) {
  const { leftArray, rightArray } = splitArrayInHalfUtil(sortedArray);
}

function buildTree(array) {
  const sortedArray = mergeSort.sort(array);
  return sortedArray;
}
