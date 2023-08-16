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

      if (value === this.root.data) {
        return "No parent for root";
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

    findNextLargest(largestNode) {
      let nextLargestNode = largestNode.right;
      while (nextLargestNode.left !== null) {
        nextLargestNode = nextLargestNode.left;
      }
      return nextLargestNode;
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
      let side;

      if (parentNode === null) {
        return null;
      }

      if (parentNode.data > value) {
        currentNode = parentNode.left;
        side = "left";
      } else {
        currentNode = parentNode.right;
        side = "right";
      }

      if (currentNode.left === null && currentNode.right !== null) {
        parentNode[side] = currentNode.right;
      }

      if (currentNode.left !== null && currentNode.right === null) {
        parentNode[side] = currentNode.left;
      }

      if (currentNode.left === null && currentNode.right === null) {
        parentNode[side] = null;
      }

      if (currentNode.left !== null && currentNode.right !== null) {
        const nextLargestNode = this.findNextLargest(currentNode);
        this.delete(nextLargestNode.data);
        parentNode[side] = nextLargestNode;
        nextLargestNode.left = currentNode.left;
        nextLargestNode.right = currentNode.right;
      }

      return currentNode;
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

    preorder(callback, currentNode = this.root) {
      if (currentNode === null) {
        return;
      }

      callback(currentNode);
      this.preorder(callback, currentNode.left);
      this.preorder(callback, currentNode.right);
    },

    inorder(callback, currentNode = this.root) {
      if (currentNode === null) {
        return;
      }

      this.inorder(callback, currentNode.left);
      callback(currentNode);
      this.inorder(callback, currentNode.right);
    },

    postorder(callback, currentNode = this.root) {
      if (currentNode === null) {
        return;
      }

      this.postorder(callback, currentNode.left);
      this.postorder(callback, currentNode.right);
      callback(currentNode);
    },

    height(node) {
      let currentNode = node;
      let height = 0;
      while (currentNode.right !== null) {
        height += 1;
        currentNode = currentNode.right;
      }
      if (currentNode.left !== null) {
        height += 1;
      }
      return height;
    },

    depth(node) {
      const nodeToFind = node;

      let currentNode = this.root;
      let depth = 0;

      while (currentNode !== null && currentNode !== nodeToFind) {
        depth += 1;
        if (currentNode.data > nodeToFind.data) {
          currentNode = currentNode.left;
        } else if (currentNode.data < nodeToFind.data) {
          currentNode = currentNode.right;
        }
      }
      return depth;
    },

    isBalanced() {
      const rightHeight = this.height(this.root.right);
      const leftHeight = this.height(this.root.left);

      if (Math.abs(rightHeight - leftHeight) <= 1) {
        return true;
      }
      return false;
    },
  },
};

const testArray = [1, 2, 3, 3, 5, 6, 7, 9, 10];

const testTree = binarySearchTree.buildTree(testArray);
binarySearchTree.prettyPrint(testTree.root);
/* console.log(testTree.find(11));
testTree.insert(6);
binarySearchTree.prettyPrint(testTree.root);

function log(value) {
  console.log(value);
}
testTree.levelOrder(log);

console.log(testTree.findParent(8));

testTree.delete(9);

binarySearchTree.prettyPrint(testTree.root);

const testPrint = (node) => {
  console.log(node);
};

testTree.preorder(testPrint);

console.log("BREAK");

testTree.inorder(testPrint);

console.log("BREAK");

testTree.postorder(testPrint); */

console.log(testTree.height(testTree.root));
console.log(testTree.depth(testTree.root.right.right.right));
console.log(testTree.isBalanced());
