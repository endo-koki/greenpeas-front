import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from './features/allDateList/Loader';
import { AllDateList } from './features/allDateList/AllDateList';
import { Schedule } from './features/allDateList/Schedule';
import { selectMemMat } from './features/allDateList/allDateSlice';
import './App.css';

function App() {
  const memMat: string[][] = useSelector(selectMemMat);
  const showDate: boolean = memMat.length > 0;

  return (
    <div className="App">
      <h1>M練日程自動調整ツール</h1>
      <Loader />
      {showDate && <AllDateList />}
      {showDate && <Schedule />}
    </div>
  );
}

export default App;
