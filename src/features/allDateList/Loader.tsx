import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setData } from './allDateSlice';
import styles from './Loader.module.css';

function csvToRawMat(csv: string): string[][] {
  const csvVecs: string[] = csv.split(',\n');
  const csvMat: string[][] = csvVecs
    .slice(0, csvVecs.length - 2)
    .map((vec) => vec.split(',')); // 最後の2行はコメントと空行
  csvMat[0][0] = ' '; // 最初の説明文も入ってる
  return csvMat;
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

    dispatch(setData(rawMat));
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
