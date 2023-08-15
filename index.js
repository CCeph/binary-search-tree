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
        } else if (currentNode.data < value) {
          currentNode = currentNode.right;
        }
      }
      return currentNode;
    },

    findParent(value) {
      let currentNode = this.root;
      let parentNode;

      if (value === this.root) {
        return "root";
      }

      while (currentNode.data !== value) {
        parentNode = currentNode;
        if (currentNode.data > value) {
          currentNode = currentNode.left;
        } else if (currentNode.data < value) {
          currentNode = currentNode.right;
        }
        if (currentNode === null) {
          return null;
        }
      }
      return parentNode;
    },

    insert(value) {
      if (this.find(value) !== null) {
        return;
      }

      let currentNode = this.root;
      while (currentNode.left !== null && currentNode.right !== null) {
        console.log("inf");
        if (currentNode.data > value) {
          currentNode = currentNode.left;
        } else if (currentNode.data < value) {
          currentNode = currentNode.right;
        }
      }
      if (currentNode.data > value) {
        currentNode.left = binarySearchTree.createTreeNode(value, null, null);
      } else {
        currentNode.right = binarySearchTree.createTreeNode(value, null, null);
      }
    },

    delete(value) {
      const parentNode = this.findParent(value);
      let currentNode;
      switch (true) {
        case parentNode.left.data === value:
          currentNode = parentNode.left.data;
          break;
        case parentNode.right.data === value:
          currentNode = parentNode.right.data;
          break;
        default:
          return Error("Child not found");
      }
    },

    levelOrder(callback) {
      const queue = [this.root];
      while (queue.length > 0) {
        const currentNode = queue.shift();
        callback(currentNode);

        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
    },
  },
};

const testArray = [1, 3, 3, 5, 7, 9, 10];

const testTree = binarySearchTree.buildTree(testArray);
binarySearchTree.prettyPrint(testTree.root);
console.log(testTree.find(11));
testTree.insert(6);
binarySearchTree.prettyPrint(testTree.root);

function log(value) {
  console.log(value);
}
testTree.levelOrder(log);

console.log(testTree.findParent(2));
