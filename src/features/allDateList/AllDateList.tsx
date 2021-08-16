import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  includeDate,
  excludeDate,
  selectMemMat,
  selectDateArr,
  selectAllDateList,
  dateState,
} from './allDateSlice';
import styles from './DateList.module.css';

function DateColumn(props: {
  idx: number;
  memVec: string[];
  date: string;
  state: dateState;
}) {
  const dispatch = useAppDispatch();

  const okNum: number = props.memVec.filter((val) => val === '○').length;
  const qNum: number = props.memVec.filter((val) => val === '△').length;
  const ngNum: number = props.memVec.filter((val) => val === '×').length;

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(excludeDate(props.idx));
  }

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
    >
      <th className={styles.headRow}>{props.date}</th>
      <td>{okNum}</td>
      <td>{qNum}</td>
      <td>{ngNum}</td>
    </tr>
  );
}

export function AllDateList() {
  const memMat = useAppSelector(selectMemMat);
  const dateArr = useAppSelector(selectDateArr);
  const allDateList = useAppSelector(selectAllDateList);

  const head = (
    <thead>
      <tr>
        <th className={styles.headRow}>日程</th>
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
        date={allDateList[i]}
        state={dateArr[i]}
      />
    );
  }

  return (
    <div className={styles.allDates}>
      <h2>日程リスト</h2>
      <table>
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
