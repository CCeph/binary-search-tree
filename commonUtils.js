const mergeSort = {
  splitArrayInHalf(unsortedArray) {
    let leftSideMidPoint;
    let rightSideMidPoint;

    if (unsortedArray.length % 2 === 1) {
      leftSideMidPoint = Math.floor(unsortedArray.length / 2);
      rightSideMidPoint = Math.ceil(unsortedArray.length / 2);
    } else {
      leftSideMidPoint = unsortedArray.length / 2 - 1;
      rightSideMidPoint = unsortedArray.length / 2;
    }

    const leftArray = unsortedArray.slice(0, leftSideMidPoint + 1);
    const rightArray = unsortedArray.slice(
      rightSideMidPoint,
      unsortedArray.length
    );

    return { leftArray, rightArray };
  },

  mergeSortedArrays(sortedLeftArray, sortedRightArray) {
    let sortedArray = [];

    while (sortedLeftArray.length > 0 || sortedRightArray.length > 0) {
      // Check if either side is empty, then add everything from the other side to save time.
      if (sortedLeftArray.length === 0) {
        sortedArray = sortedArray.concat(sortedRightArray);
        // eslint-disable-next-line no-param-reassign
        sortedRightArray = [];
        break;
      } else if (sortedRightArray.length === 0) {
        sortedArray = sortedArray.concat(sortedLeftArray);
        // eslint-disable-next-line no-param-reassign
        sortedLeftArray = [];
        break;
      }

      if (sortedLeftArray[0] < sortedRightArray[0]) {
        sortedArray.push(sortedLeftArray[0]);
        sortedLeftArray.shift();
      } else {
        sortedArray.push(sortedRightArray[0]);
        sortedRightArray.shift();
      }
    }

    return sortedArray;
  },

  sort(unsortedArray) {
    if (unsortedArray.length <= 1) {
      const sortedArray = unsortedArray;
      return sortedArray;
    }

    const halvedArrays = this.splitArrayInHalf(unsortedArray);

    const { leftArray, rightArray } = halvedArrays;

    const sortedLeftArray = this.sort(leftArray);
    const sortedRightArray = this.sort(rightArray);

    return this.mergeSortedArrays(sortedLeftArray, sortedRightArray);
  },
};

export default mergeSort;
