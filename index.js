import mergeSort from "./commonUtils.js";

function createTreeNode(value, left = null, right = null) {
  return { value, left, right };
}

function buildTreeFromSortedArray(sortedArray) {}

function buildTree(array) {
  const sortedArray = mergeSort.sort(array);
  return sortedArray;
}
