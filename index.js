// eslint-disable-next-line import/extensions
import { mergeSort, removeDuplicatesFromSortedArray } from "./commonUtils.js";

const binarySearchTree = {
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  },

  createTreeNode(data, left = null, right = null) {
    return { data, left, right };
  },

  buildTreeFromSortedArray(sortedArray) {
    const start = 0;
    const end = sortedArray.length - 1;
    const midpoint = Math.floor((start + end) / 2);

    if (start > end) {
      return null;
    }

    const leftArray = sortedArray.slice(start, midpoint);
    const rightArray = sortedArray.slice(midpoint + 1, end + 1);

    const leftNode = this.buildTreeFromSortedArray(leftArray);
    const rightNode = this.buildTreeFromSortedArray(rightArray);

    const currentNode = this.createTreeNode(
      sortedArray[midpoint],
      leftNode,
      rightNode
    );
    return currentNode;
  },

  buildTree(array) {
    const sortedArray = mergeSort.sort(array);
    const noDuplicatesArray = removeDuplicatesFromSortedArray(sortedArray);
    const binaryTree = {
      root: this.buildTreeFromSortedArray(noDuplicatesArray),
    };
    Object.setPrototypeOf(binaryTree, this.treePrototype);
    return binaryTree;
  },

  treePrototype: {
    find(value) {
      let currentNode = this.root;
      while (currentNode !== null && currentNode.data !== value) {
        if (currentNode.data > value) {
          currentNode = currentNode.left;
        }

        if (currentNode.data < value) {
          currentNode = currentNode.right;
        }
      }
      return currentNode;
    },
  },
};

const testArray = [1, 3, 3, 8, 5, 7, 8, 9, 10];

const testTree = binarySearchTree.buildTree(testArray);
binarySearchTree.prettyPrint(testTree.root);
console.log(testTree.find(11));
