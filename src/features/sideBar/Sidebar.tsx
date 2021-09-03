import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { uuKey } from '../../utils';
import {
  clearSuggestion,
  DateState,
  selectAllDateList,
  selectDateArr,
  selectMemMat,
  suggestDate,
} from '../allDateList/allDateSlice';
import { findOptScheduleWithPref, ScheduleList } from './calcSchedule';
import styles from './Sidebar.module.css';

function Candidate(props: { schedules: ScheduleList }) {
  const allDateList = useAppSelector(selectAllDateList);
  const suggestedDateList = props.schedules.dateIdxs.map((idx) => (
    <li key={uuKey()}>{allDateList[idx]}</li>
  ));

  const dispatch = useAppDispatch();
  function setDates() {
    dispatch(clearSuggestion());
    props.schedules.dateIdxs.forEach((idx) => {
      dispatch(suggestDate(idx));
    });
  }

  return (
    <div
      className={styles.candidate}
      onClick={() => setDates()}
      aria-hidden="true"
    >
      候補日:
      <ul className={styles.suggestedCands}>{suggestedDateList}</ul>
    </div>
  );
}

export function Sidebar() {
  const memMat: string[][] = useAppSelector(selectMemMat);
  const dateArr: DateState[] = useAppSelector(selectDateArr);

  const [rehearsalNum, setRehearsalNum] = useState(3);
  const [minAttendance, setMinAttendance] = useState(2);
  const [suggestedList, setSugList] = useState([] as ScheduleList[]);
  const [computed, setComputed] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    setComputed(true);
    const includeIdxs: number[] = [];
    const excludeIdxs: number[] = [];
    dateArr.forEach((val, idx) => {
      if (val === 1) {
        includeIdxs.push(idx);
      } else if (val === 3) {
        excludeIdxs.push(idx);
      }
    });

    const cands: ScheduleList[] = findOptScheduleWithPref(
      memMat,
      rehearsalNum,
      minAttendance,
      3,
      includeIdxs,
      excludeIdxs
    );
    setSugList(cands);
    event.preventDefault();
  }

  const noResults: boolean = computed && suggestedList.length === 0;
  const candidates = noResults
    ? [<p style={{ textAlign: 'center' }}>候補なし</p>]
    : suggestedList.map((item) => <Candidate key={uuKey()} schedules={item} />);

  return (
    <div className={styles.sidebar}>
      <h2>おまかせ計算</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.settingRow}>
          <div>{'M練日数:　　'}</div>
          <div>
            <input
              type="number"
              className={styles.numberField}
              value={rehearsalNum}
              min="0"
              onChange={(e) => setRehearsalNum(Number(e.target.value))}
            />
          </div>
        </div>
        <div className={styles.settingRow}>
          <div>最低参加回数:</div>
          <div>
            <input
              type="number"
              className={styles.numberField}
              value={minAttendance}
              min="0"
              onChange={(e) => setMinAttendance(Number(e.target.value))}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <input type="submit" className={styles.calcBtn} value="計算！" />
        </div>
      </form>
      <div className={styles.suggestionList}>
        <h3>候補リスト</h3>
        {candidates}
      </div>
    </div>
  );
}
