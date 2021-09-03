import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { calcTableWidth } from '../../utils';
import {
  includeDate,
  excludeDate,
  selectMemMat,
  selectDateArr,
  selectAllDateList,
  DateState,
  selectMemList,
} from './allDateSlice';
import styles from './DateList.module.css';

function DateColumn(props: {
  idx: number;
  memVec: string[];
  memList: string[];
  date: string;
  state: DateState;
  innerWidth: number;
}) {
  const dispatch = useAppDispatch();

  const okMems: string[] = props.memList.filter(
    (_, idx) => props.memVec[idx] === '○'
  );
  const qMems: string[] = props.memList.filter(
    (_, idx) => props.memVec[idx] === '△'
  );
  const ngMems: string[] = props.memList.filter(
    (_, idx) => props.memVec[idx] === '×'
  );

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(excludeDate(props.idx));
  }

  // マウスについてくる吹き出し
  const [showInfo, setShowInfo] = useState(false);
  const [mousePos, setMousePos] = useState([0, 0]);
  function handleMouseMove(e: React.MouseEvent) {
    setShowInfo(true);
    const pos: [number, number] = [e.nativeEvent.pageX, e.nativeEvent.pageY];
    setMousePos(pos);
  }
  let infoStyle;
  if (mousePos[0] <= 0.8 * props.innerWidth) {
    infoStyle = {
      left: `${mousePos[0] + 10}px`,
      top: `${mousePos[1] + 10}px`,
    };
  } else {
    // 不要説
    infoStyle = {
      right: `${props.innerWidth - mousePos[0] + 10}px`,
      top: `${mousePos[1] + 10}px`,
    };
  }
  const dateInfo = (
    <div className={styles.dateInfo} style={infoStyle}>
      ○: {okMems.join(', ')}
      <br />
      △: {qMems.join(', ')}
      <br />
      ×: {ngMems.join(', ')}
    </div>
  );

  const styleList: string[] = [
    '',
    styles.selected,
    styles.suggested,
    styles.exclude,
  ];
  const style: string = styleList[props.state];
  return (
    <tr
      className={style}
      onClick={() => dispatch(includeDate(props.idx))}
      onContextMenu={(e) => handleContextMenu(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <th className={styles.headRow}>{props.date}</th>
      <td>{okMems.length}</td>
      <td>{qMems.length}</td>
      <td>{ngMems.length}</td>
      {showInfo && dateInfo}
    </tr>
  );
}

export function AllDateList(props: { innerWidth: number }) {
  const memMat = useAppSelector(selectMemMat);
  const dateArr = useAppSelector(selectDateArr);
  const memList = useAppSelector(selectMemList);
  const allDateList = useAppSelector(selectAllDateList);

  const head = (
    <thead>
      <tr>
        <th className={`${styles.headRow} ${styles.markerCol}`}>日程</th>
        <th>○</th>
        <th>△</th>
        <th>×</th>
      </tr>
    </thead>
  );

  const columns = [];
  for (let i = 0; i < memMat.length; i++) {
    columns.push(
      <DateColumn
        key={String(i)}
        idx={i}
        memVec={memMat[i]}
        memList={memList}
        date={allDateList[i]}
        state={dateArr[i]}
        innerWidth={props.innerWidth}
      />
    );
  }

  const tableWidth: number = calcTableWidth(
    41,
    61,
    allDateList.length,
    props.innerWidth
  );
  const style = { width: `${tableWidth}px` };

  return (
    <div className={styles.allDates}>
      <h2>日程リスト</h2>
      <table style={style}>
        {head}
        <tbody>{columns}</tbody>
      </table>
    </div>
  );
}

// export function AllDateList2() {
//   const memMat = useAppSelector(selectMemMat);
//   const dateArr = useAppSelector(selectDateArr);
//   const allDateList = useAppSelector(selectAllDateList);

//   const dispatch = useAppDispatch();
//   function handleClick(idx: number) {
//     dispatch(includeDate(idx));
//   }
//   function handleContextMenu(e: React.MouseEvent, idx: number) {
//     e.preventDefault();
//     dispatch(excludeDate(idx));
//   }

//   // thead row
//   const styleList: string[] = [
//     '',
//     styles.selected,
//     styles.suggested,
//     styles.exclude,
//   ];
//   const headItems = [<th className={styles.fixed}>日程</th>];
//   for (let i = 0; i < allDateList.length; i++) {
//     const item = (
//       <th
//         key={String(i)}
//         className={styleList[dateArr[i]]}
//         onClick={() => handleClick(i)}
//         onContextMenu={(e) => handleContextMenu(e, i)}
//       >
//         {allDateList[i]}
//       </th>
//     );
//     headItems.push(item);
//   }

//   // ok, q, ng row
//   const stateList: string[] = ['○', '△', '×'];
//   const stateRow = stateList.map((val) => [
//     <th className={styles.fixed}>{val}</th>,
//   ]);
//   for (let i = 0; i < allDateList.length; i++) {
//     for (let j = 0; j < 3; j++) {
//       const num: number = memMat[i].filter(
//         (val) => val === stateList[j]
//       ).length;
//       const item = (
//         <td
//           key={String(i) + String(j)}
//           className={styleList[dateArr[i]]}
//           role="gridcell"
//           onClick={() => handleClick(i)}
//           onContextMenu={(e) => handleContextMenu(e, i)}
//         >
//           {num}
//         </td>
//       );
//       stateRow[j].push(item);
//     }
//   }

//   return (
//     <div className={styles.allDates}>
//       <h2 className={styles.fixed}>日程リスト</h2>
//       <table>
//         <thead>
//           <tr>{headItems}</tr>
//         </thead>
//         <tbody>
//           <tr>{stateRow[0]}</tr>
//           <tr>{stateRow[1]}</tr>
//           <tr>{stateRow[2]}</tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
