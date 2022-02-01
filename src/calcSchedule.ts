import axios from 'axios';
import { MipStatus } from './features/allDateSlice';
import { apiRoot, argsort } from './utils';

const MARU = 1;
const SANKAKU = 0.2;
const BATSU = 0;
type Answer = typeof MARU | typeof SANKAKU | typeof BATSU;

export type FlaskResponse = {
  status: MipStatus;
  dateIdxs: number[];
};

export async function findOptScheduleWithPrefPy(
  memMat: string[][],
  maxDateNum: number,
  minAttendNum: number,
  candNum: number,
  includeIdxs: number[],
  excludeIdxs: number[]
): Promise<FlaskResponse> {
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

  // 通信
  const params = {
    memMat: sortedMat,
    maxDateNum: maxDateNum - includeIdxs.length,
    minAttendNum,
    candNum,
  };
  const response = await axios.post(`${apiRoot}/calcSchedule`, params);

  // データ整形
  let dateIdxs: number[] = response.data.dateIdxs.map(
    (idx: number) => matMaps[idx]
  );
  dateIdxs = dateIdxs.concat(includeIdxs).sort((a, b) => a - b);
  return {
    status: response.data.status,
    dateIdxs,
  };
}
