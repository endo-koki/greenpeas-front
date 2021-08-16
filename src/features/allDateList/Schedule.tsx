import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  dateState,
  selectMemMat,
  selectDateArr,
  selectMemList,
  selectAllDateList,
} from './allDateSlice';
import styles from './DateList.module.css';

function SummaryHead(props: { okNum: number; qNum: number; ngNum: number }) {
  const headItems1 = ['○', '△', '×'].map((val) => <th>{val}</th>);
  return (
    <thead>
      <tr>
        <th className={styles.headRow}> </th>
        {headItems1}
      </tr>
      <tr>
        <th className={styles.headRow}>合計</th>
        <th>{props.okNum}</th>
        <th>{props.qNum}</th>
        <th>{props.ngNum}</th>
      </tr>
    </thead>
  );
}
function SummaryBody(props: {
  memList: string[];
  okVec: number[];
  qVec: number[];
  ngVec: number[];
}) {
  const rowList = [];
  for (let i = 0; i < props.memList.length; i++) {
    const rowItem = (
      <tr>
        <th className={styles.headRow}>{props.memList[i]}</th>
        <td>{props.okVec[i]}</td>
        <td>{props.qVec[i]}</td>
        <td>{props.ngVec[i]}</td>
      </tr>
    );
    rowList.push(rowItem);
  }

  return <tbody>{rowList}</tbody>;
}

function SummaryTable(props: {
  memMat: string[][];
  dateArr: dateState[];
  memList: string[];
}) {
  const okVec: number[] = new Array(props.memList.length).fill(0);
  const qVec: number[] = okVec.slice(0);
  const ngVec: number[] = okVec.slice(0);

  for (let i = 0; i < props.memMat.length; i++) {
    if (props.dateArr[i] === 1 || props.dateArr[i] === 2) {
      // selected or suggested
      const memVec: string[] = props.memMat[i];
      memVec.forEach((val, idx) => {
        if (val === '○') {
          okVec[idx] += 1;
        } else if (val === '△') {
          qVec[idx] += 1;
        } else if (val === '×') {
          ngVec[idx] += 1;
        }
      });
    }
  }

  const okNum: number = okVec.reduce((x, y) => x + y);
  const qNum: number = qVec.reduce((x, y) => x + y);
  const ngNum: number = ngVec.reduce((x, y) => x + y);

  return (
    <div className={styles.summary}>
      <table>
        <SummaryHead okNum={okNum} qNum={qNum} ngNum={ngNum} />
        <SummaryBody
          memList={props.memList}
          okVec={okVec}
          qVec={qVec}
          ngVec={ngVec}
        />
      </table>
    </div>
  );
}

function DetailHead(props: {
  memMat: string[][];
  dateArr: dateState[];
  allDateList: string[];
}) {
  const isSelected = (val: any, idx: number) => {
    const state: dateState = props.dateArr[idx];
    return state === 1 || state === 2;
  };
  const selectedDates: string[] = props.allDateList.filter(isSelected);
  const selectedVecs: string[][] = props.memMat.filter(isSelected);

  const headItems = [<th className={styles.headRow}> </th>];
  const okItems = [<th className={styles.headRow}>○</th>];
  const qItems = [<th className={styles.headRow}>△</th>];
  const ngItems = [<th className={styles.headRow}>×</th>];
  for (let i = 0; i < selectedDates.length; i++) {
    headItems.push(<th>{selectedDates[i]}</th>);
    okItems.push(
      <th>{selectedVecs[i].filter((val) => val === '○').length}</th>
    );
    qItems.push(<th>{selectedVecs[i].filter((val) => val === '△').length}</th>);
    ngItems.push(
      <th>{selectedVecs[i].filter((val) => val === '×').length}</th>
    );
  }

  return (
    <thead>
      <tr>{headItems}</tr>
      <tr>{okItems}</tr>
      <tr>{qItems}</tr>
      <tr>{ngItems}</tr>
    </thead>
  );
}

function DetailBodyCol(props: {
  jdx: number;
  name: string;
  selectedVecs: string[][];
}) {
  const items = [<th className={styles.headRow}>{props.name}</th>];
  for (let i = 0; i < props.selectedVecs.length; i++) {
    const state: string = props.selectedVecs[i][props.jdx];
    items.push(<td>{state}</td>);
  }
  return <tr>{items}</tr>;
}
function DetailBody(props: {
  memMat: string[][];
  dateArr: dateState[];
  memList: string[];
}) {
  const isSelected = (val: any, idx: number) => {
    const state: dateState = props.dateArr[idx];
    return state === 1 || state === 2;
  };
  const selectedVecs: string[][] = props.memMat.filter(isSelected);

  const colItems = [];
  for (let jdx = 0; jdx < props.memList.length; jdx++) {
    colItems.push(
      <DetailBodyCol
        jdx={jdx}
        name={props.memList[jdx]}
        selectedVecs={selectedVecs}
      />
    );
  }

  return <tbody>{colItems}</tbody>;
}

function DetailTable(props: {
  memMat: string[][];
  dateArr: dateState[];
  memList: string[];
  allDateList: string[];
}) {
  return (
    <div className={styles.detail}>
      <table>
        <DetailHead
          memMat={props.memMat}
          dateArr={props.dateArr}
          allDateList={props.allDateList}
        />
        <DetailBody
          memMat={props.memMat}
          dateArr={props.dateArr}
          memList={props.memList}
        />
      </table>
    </div>
  );
}

export function Schedule() {
  const memMat = useAppSelector(selectMemMat);
  const dateArr = useAppSelector(selectDateArr);
  const memList = useAppSelector(selectMemList);
  const allDateList = useAppSelector(selectAllDateList);

  const [showDetail, setShowDetail] = useState(true);

  const selectedDates: string[] = allDateList.filter(
    (_, idx) => dateArr[idx] === 1 || dateArr[idx] === 2
  );

  return (
    <div>
      <h2>選んだ日程… {selectedDates.join('、')}</h2>
      <h3>合計</h3>
      <SummaryTable memMat={memMat} dateArr={dateArr} memList={memList} />
      <label htmlFor={styles.toggleDetail}>
        <h3>詳細▼</h3>
        <input
          type="checkbox"
          id={styles.toggleDetail}
          onChange={() => setShowDetail(!showDetail)}
        />
      </label>
      {showDetail && (
        <DetailTable
          memMat={memMat}
          dateArr={dateArr}
          memList={memList}
          allDateList={allDateList}
        />
      )}
    </div>
  );
}
