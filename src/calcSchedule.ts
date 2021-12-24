import { argsort, TopKList } from './utils';

const MARU = 1;
const SANKAKU = 0.2;
const BATSU = 0;
type Answer = typeof MARU | typeof SANKAKU | typeof BATSU;

class ScheduleNode {
  private dateArr: (0 | 1)[] = [];
  attendCnts: number[] = [];
  totalCnt: number = 0;
  minCnt: number = 0;

  /** Creates an empty node. */
  constructor(totalDateNum: number, memNum: number) {
    if (totalDateNum > 0 && memNum > 0) {
      this.dateArr = new Array(totalDateNum).fill(0);
      this.attendCnts = new Array(memNum).fill(0);
    }
  }

  static copy(sn: ScheduleNode): ScheduleNode {
    const newSn: ScheduleNode = new ScheduleNode(-1, -1);
    newSn.dateArr = sn.dateArr.slice();
    newSn.attendCnts = sn.attendCnts.slice();
    newSn.totalCnt = sn.totalCnt;
    newSn.minCnt = sn.minCnt;
    return newSn;
  }

  /** The number of dates added to this.arr. */
  get dateNum(): number {
    return this.dateArr.filter((val) => val === 1).length;
  }

  /** 採用した日程のindex */
  get dateIdxs(): number[] {
    const ret: number[] = [];
    this.dateArr.forEach((val, idx) => {
      if (val === 1) ret.push(idx);
    });
    return ret;
  }

  isBetterThan(sn: ScheduleNode): boolean {
    if (this.totalCnt > sn.totalCnt) return true;
    if (this.totalCnt < sn.totalCnt) return false;
    return this.minCnt > sn.minCnt;
  }

  init(attendCnts: number[]): void {
    this.attendCnts = attendCnts.slice();
    this.totalCnt = attendCnts.reduce((a, b) => a + b);
    this.minCnt = Math.min(...attendCnts);
  }

  addDate(dateIdx: number, memMat: Answer[][]): boolean {
    if (this.dateArr[dateIdx] === 0) {
      this.dateArr[dateIdx] = 1;
      const memVec: Answer[] = memMat[dateIdx];
      memVec.forEach((val, idx) => {
        this.attendCnts[idx] += val;
        this.totalCnt += val;
      });
      this.minCnt = Math.min(...this.attendCnts);
      return true;
    }
    return false;
  }

  idealPadding(margin: number): void {
    this.attendCnts.forEach((_, idx) => {
      this.attendCnts[idx] += margin * MARU;
    });
    this.totalCnt += margin * MARU * this.attendCnts.length;
    this.minCnt += margin * MARU;
  }

  rightMostOneIdx(): number {
    const dateNum: number = this.dateArr.length;
    for (let idx = dateNum - 1; idx >= 0; idx--) {
      if (this.dateArr[idx] === 1) {
        return idx;
      }
    }
    return -1;
  }

  /** dateArrの一番右側の0領域に1つだけ1を追加して子を作る */
  generateChildren(memMat: Answer[][], maxDateNum: number): ScheduleNode[] {
    const margin: number = maxDateNum - this.dateNum; // これから追加する日数. 右側に margin-1 個の0がない子は作ってはいけない
    const children: ScheduleNode[] = [];
    const totalDateNum: number = this.dateArr.length;
    const rmoIdx: number = this.rightMostOneIdx();
    for (let i = rmoIdx + 1; i < totalDateNum + 1 - margin; i++) {
      const child: ScheduleNode = ScheduleNode.copy(this);
      child.addDate(i, memMat);
      children.push(child);
    }
    return children;
  }
}

export type ScheduleList = {
  dateIdxs: number[];
  attendCnts: number[];
};

function findOptSchedule(
  memMat: Answer[][],
  maxDateNum: number,
  minAttendNum: number,
  candNum: number,
  rootNode: ScheduleNode
): ScheduleNode[] {
  const candidates: TopKList<ScheduleNode> = new TopKList(candNum, (a, b) =>
    a.isBetterThan(b)
  );

  // 枝刈りできるならtrue
  const canSkip = (sn: ScheduleNode) => {
    const margin: number = maxDateNum - sn.dateNum; // 追加できる練習日数

    // 最低参加回数を満たせる余地がなければ枝刈り
    const idealSn: ScheduleNode = ScheduleNode.copy(sn);
    idealSn.idealPadding(margin);
    if (idealSn.minCnt < minAttendNum) {
      return true;
    }

    // Top K に入る余地がなければ枝刈り
    const { lastItem } = candidates;
    if (lastItem === null) return false;
    return !idealSn.isBetterThan(lastItem);
  };

  const stack: ScheduleNode[] = [rootNode];
  while (true) {
    const sn = stack.pop();
    if (sn === undefined) break; // stack is empty

    if (canSkip(sn)) continue; // 枝刈りできるならcontinue

    if (sn.dateNum === maxDateNum) {
      // 全日程追加済み
      candidates.insert(sn);
    } else {
      const children: ScheduleNode[] = sn.generateChildren(memMat, maxDateNum);
      children.forEach((child) => stack.push(child));
    }
  }

  return candidates.list;
}

export function findOptScheduleWithPref(
  memMat: string[][],
  maxDateNum: number,
  minAttendNum: number,
  candNum: number,
  includeIdxs: number[],
  excludeIdxs: number[]
): ScheduleList[] {
  // memMat (string[][]) をresMat (Answer[][]) に変換
  const resMat: Answer[][] = memMat.map((memVec) =>
    memVec.map((str) => {
      switch (str) {
        case '○':
          return MARU;
        case '△':
          return SANKAKU;
        case '×':
          return BATSU;
        default:
          alert('○, △, ×以外の文字を含んでいます');
          return BATSU;
      }
    })
  );

  function reduceMat(
    mat: Answer[][],
    removeIdxs: number[]
  ): [reducedMat: Answer[][], maps1: number[]] {
    const reducedMat: Answer[][] = [];
    const maps1: number[] = []; // reducedMat -> memMat のmapping
    for (let i = 0; i < mat.length; i++) {
      const memVec: Answer[] = mat[i];
      if (removeIdxs.includes(i)) continue; // 除外対象
      reducedMat.push(memVec);
      maps1.push(i);
    }
    return [reducedMat, maps1];
  }

  /** 参加人数が少ない順にソート */
  function sortMat(
    reducedMat: Answer[][]
  ): [sortedMat: Answer[][], maps2: number[]] {
    const attendCnts: number[] = reducedMat.map((memVec) =>
      (memVec as number[]).reduce((a, b) => a + b)
    );
    const maps2: number[] = argsort(attendCnts, (a, b) => a - b);
    const sortedMat: Answer[][] = [];
    maps2.forEach((idx) => sortedMat.push(reducedMat[idx]));

    return [sortedMat, maps2];
  }

  const memNum: number = resMat[0].length;
  const attendCnts: number[] = new Array(memNum).fill(0);
  includeIdxs.forEach((idx) => {
    const memVec: Answer[] = resMat[idx];
    memVec.forEach((val, i) => {
      attendCnts[i] += val;
    });
  });

  const [reducedMat, maps1] = reduceMat(
    resMat,
    includeIdxs.concat(excludeIdxs)
  );
  const [sortedMat, maps2] = sortMat(reducedMat);

  const matMaps: number[] = maps2.map((idx) => maps1[idx]); // maps[i] = maps1[maps2[i]]

  const totalDateNum: number = sortedMat.length;
  const rootNode: ScheduleNode = new ScheduleNode(totalDateNum, memNum);
  rootNode.init(attendCnts);

  const topList: ScheduleNode[] = findOptSchedule(
    sortedMat,
    maxDateNum - includeIdxs.length,
    minAttendNum,
    candNum,
    rootNode
  );

  // データ整形
  const candidates: ScheduleList[] = topList.map((node) => {
    let dateIdxs: number[] = node.dateIdxs.map((idx) => matMaps[idx]);
    dateIdxs = dateIdxs.concat(includeIdxs).sort((a, b) => a - b);
    return {
      dateIdxs,
      attendCnts: node.attendCnts,
    };
  });

  return candidates;
}
