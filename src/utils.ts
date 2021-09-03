// global var
export const margin: number = 10;

/** calculate table width. (table width = cell width + border width * 2) */
export function calcTableWidth(
  headWidth: number,
  cellWidth: number,
  cellNum: number,
  innerWidth: number
): number {
  const width: number = headWidth + cellWidth * cellNum;
  return Math.min(width, innerWidth * 0.8 - 2 * margin);
}

/** unique key */
function* incremental(step: number): Generator<number> {
  let i: number = 0;
  while (true) {
    yield i;
    i += step;
  }
}
const keyGenerator = incremental(1);
export function uuKey(): number {
  return keyGenerator.next().value;
}

/** deep copy 2d matrix */
export function copy2d<T>(mat: T[][]): T[][] {
  const ret: T[][] = [];
  for (let i = 0; i < mat.length; i++) {
    ret.push(mat[i].slice(0));
  }
  return ret;
}

/** arr[argArr[i]] === sortedArr[i] となるようなargArrを返す */
export function argsort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number
): number[] {
  const pairArray: [T, number][] = arr.map((val, idx) => [val, idx]);
  pairArray.sort((x, y) => compareFn(x[0], y[0]));
  return pairArray.map((val) => val[1]);
}

/** ret[i] = arr[idxs[i]] となるようなretをin placeで作る */
function substitute<T>(arr: T[], idxs: number[]): T[] {
  if (arr.length !== idxs.length) {
    throw Error('arr.length !== idxs.length.');
  }
  const oldArr: T[] = arr.slice(0);
  idxs.forEach((idx, i) => {
    arr[i] = oldArr[idx];
  });
  return arr;
}

/** 行列の縦方向ソート. in place */
function sort2dByRow<T>(
  mat: T[][],
  compareFn: (a: T, b: T) => number,
  baseIdx: number
): T[][] {
  return mat.sort((v1, v2) => compareFn(v1[baseIdx], v2[baseIdx]));
}

/** 行列の横方向ソート. in place */
function sort2dByCol<T>(
  mat: T[][],
  compareFn: (a: T, b: T) => number,
  baseIdx: number
): T[][] {
  const baseVec: T[] = mat[baseIdx];
  const argIdxs: number[] = argsort(baseVec, compareFn);
  for (let i = 0; i < mat.length; i++) {
    substitute(mat[i], argIdxs);
  }
  return mat;
}

/**
 * Sort 2D array based on baseIdx (in place).
 * @param mat
 * @param compareFn
 * @param baseIdx 0 by default.
 * @param axis 0 by row (default). 1 by column.
 */
export function sort2d<T>(
  mat: T[][],
  compareFn: (a: T, b: T) => number,
  baseIdx: number = 0,
  axis: 0 | 1 = 0
): T[][] {
  const sortFn = axis === 0 ? sort2dByRow : sort2dByCol;
  return sortFn(mat, compareFn, baseIdx);
}

/** lessThanの基準で小さいもの上位k個を保持するlist (同列があっても上位k個だけ) */
export class TopKList<T> {
  private arr: (T | null)[]; // 小さい順
  private lessThan: (a: T, b: T) => boolean;

  constructor(k: number, lessThanFunc: (a: T, b: T) => boolean) {
    this.arr = new Array(k).fill(null);
    this.lessThan = lessThanFunc;
  }

  get lastItem(): T | null {
    return this.arr[this.arr.length - 1];
  }

  get list(): T[] {
    return this.arr.filter((val) => val !== null) as T[];
  }

  /** Inserts an item considering order. Returns true if the item was inserted. */
  insert(item: T): boolean {
    for (let i = 0; i < this.arr.length; i++) {
      const curItem: T | null = this.arr[i];
      if (curItem === null) {
        this.arr[i] = item;
        return true;
      }
      if (this.lessThan(item, curItem)) {
        this.arr.splice(i, 0, item);
        this.arr.pop();
        return true;
      }
    }
    return false;
  }
}
