import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setData } from './allDateSlice';
import styles from './Loader.module.css';
import { sort2d } from '../../utils';

function csvToRawMat(csv: string): string[][] {
  const csvVecs: string[] = csv.split(',\n');
  const csvMat: string[][] = csvVecs
    .slice(0, csvVecs.length - 2)
    .map((vec) => vec.split(',')); // 最後の2行はコメントと空行
  csvMat[0][0] = ' '; // 最初の説明文も入ってる
  return csvMat;
}

function transposeMat<T>(mat: T[][]): T[][] {
  if (mat.length === 0) {
    return [];
  }
  const matT: T[][] = new Array(mat[0].length).fill([]);
  mat.forEach((vec) => {
    vec.forEach((x, idx) => matT[idx].push(x));
  });
  return matT;
}

function sortRawMat(rawMat: string[][]): string[][] {
  const transposed: string[][] = transposeMat(rawMat);
  transposed.sort((a, b) => (a[0] <= b[0] ? -1 : 1));
  return transposeMat(transposed);
}

async function load(url: string): Promise<string[][]> {
  const urlHead: string = 'https://chouseisan.com/s?h=';
  if (!url.startsWith(urlHead)) {
    alert(
      `URLが正しくないようです。\n${urlHead}... で始まるURLを入力してください。`
    );
    return [];
  }

  const dataId: string = url.slice(urlHead.length);
  const csvUrl: string = `https://chouseisan.com/schedule/List/createCsv?h=${dataId}`;

  const response = await fetch(url);
  const csv: string = await response.text();
  return csvToRawMat(csv);
}

export function Loader() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  async function handleClick() {
    const rawMat: string[][] = await load(text);
    console.log(rawMat);
  }

  async function loadLocalCsv(files: FileList | null) {
    if (files === null) {
      alert('ファイルが選択されていません。');
      return;
    }
    const file: File = files[0];
    const buf = await file.arrayBuffer();
    const decoder = new TextDecoder('shift_jis');
    const csv = decoder.decode(buf);
    const rawMat: string[][] = csvToRawMat(csv);
    const compareFn = (a: string, b: string) => (a <= b ? -1 : 1);
    const sortedMat: string[][] = sort2d(rawMat, compareFn, 0, 1);

    dispatch(setData(sortedMat));
  }

  return (
    <div className={styles.loader}>
      <p>調整さんのURLを入力して読み込みボタンを押してください。</p>
      <input
        className={styles.urlInput}
        type="url"
        placeholder="https://chouseisan.com/s?h=..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button type="button" onClick={() => handleClick()}>
        読み込み
      </button>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => loadLocalCsv(e.target.files)}
      />
    </div>
  );
}
