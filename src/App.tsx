import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from './features/allDateList/Loader';
import { AllDateList } from './features/allDateList/AllDateList';
import { Schedule } from './features/allDateList/Schedule';
import { selectMemMat } from './features/allDateList/allDateSlice';
import './App.css';

function App() {
  const memMat: string[][] = useSelector(selectMemMat);
  const showDate: boolean = memMat.length > 0;

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => setInnerWidth(window.innerWidth),
      false
    );
  }, []); // 最後に[]を入れると初回レンダリング時のみ実行される

  return (
    <div className="App">
      <h1>M練日程自動調整ツール</h1>
      <Loader />
      {showDate && <AllDateList innerWidth={innerWidth} />}
      {showDate && <Schedule innerWidth={innerWidth} />}
    </div>
  );
}

export default App;
