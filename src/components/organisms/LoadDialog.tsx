/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Input from '@mui/material/Input';
import axios from 'axios';
import DialogContent from '@mui/material/DialogContent';
import { setData } from '../../features/allDateSlice';
import { useAppDispatch } from '../../app/hooks';
import { ContainedBtn } from '../atom/ContainedBtn';
import { OutlinedBtn } from '../atom/OutlinedBtn';
import { apiRoot, sort2d } from '../../utils';

function csvToRawMat(csv: string): string[][] {
  const csvVecs: string[] = csv.split(',\n');
  const csvMat: string[][] = csvVecs
    .slice(0, csvVecs.length - 2)
    .map((vec) => vec.split(',')); // 最後の2行はコメントと空行
  csvMat[0][0] = ' '; // 最初の説明文も入ってる
  return csvMat;
}

const dialogWidth = Math.min(450, window.innerWidth - 20);
const classes = {
  fileBtn: css({
    borderRadius: '20px',
  }),
  fileText: css({
    marginLeft: '10px',
  }),
  collapseBtn: css({
    borderRadius: '20px',
  }),
  urlField: css({
    width: `${dialogWidth - 30}px`,
  }),
  dialogContainer: css({
    width: `${dialogWidth}px`,
  }),
};

type Props = {
  openDialog: boolean;
  onClose: () => void;
};
export function LoadDialog(props: Props) {
  const [file, setFile] = useState(null as File | null);
  const [openUrl, setOpenUrl] = useState(false);
  const [url, setUrl] = useState('');
  const filename = file === null ? 'ファイル未選択' : file.name;

  const dispatch = useAppDispatch();
  async function loadLocalCsv(csvFile: File) {
    const buf = await csvFile.arrayBuffer();
    const decoder = new TextDecoder('shift_jis');
    const csv = decoder.decode(buf);
    const rawMat: string[][] = csvToRawMat(csv);
    const compareFn = (a: string, b: string) => (a <= b ? -1 : 1);
    const sortedMat: string[][] = sort2d(rawMat, compareFn, 0, 1);

    dispatch(setData(sortedMat));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      setFile(null);
    } else {
      setFile(e.target.files[0]);
      loadLocalCsv(e.target.files[0]);
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
  }

  async function download() {
    const urlHead = 'https://chouseisan.com/s?h=';
    if (url.indexOf(urlHead) !== 0) {
      alert(
        'URLが正しくないようです。\n「https://chouseisan.com/s?h=」で始まる\nURLを入力してください。'
      );
      return;
    }
    const csvId = url.slice(urlHead.length);
    // const downloadUrl = `https://chouseisan.com/schedule/List/createCsv?h=${csvId}`;
    // const downloadWindow = window.open(downloadUrl);
    // setTimeout(() => downloadWindow?.close(), 5000); // 5秒後にタブが自動で閉じる

    // backにリクエストを送り, csvを受け取る
    const res = await axios.get(`${apiRoot}/load?id=${csvId}`);

    const csvText: string = res.data;
    const rawMat = csvToRawMat(csvText);
    const compareFn = (a: string, b: string) => (a <= b ? -1 : 1);
    const sortedMat = sort2d(rawMat, compareFn, 0, 1);

    dispatch(setData(sortedMat));
  }

  function onClose() {
    // setOpenUrl(false);
    props.onClose();
  }

  return (
    <Dialog onClose={onClose} open={props.openDialog}>
      <DialogTitle>出欠表の読込</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          alignItems="left"
          spacing={1}
          css={classes.dialogContainer}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item>
                <Typography>
                  調整さんのURLを入力して読込ボタンを押してください。
                </Typography>
              </Grid>
              <Grid item>
                <Input
                  id="url"
                  value={url}
                  placeholder="https://chouseisan.com/s?h=……"
                  onChange={handleUrlChange}
                  css={classes.urlField}
                />
              </Grid>
              <Grid item sx={{ width: `${dialogWidth}px` }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Grid item>
                    <OutlinedBtn text="戻る" onClick={onClose} />
                  </Grid>
                  <Grid item>
                    <ContainedBtn text="読込" onClick={download} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              startIcon={
                openUrl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
              color="primary"
              onClick={() => setOpenUrl(!openUrl)}
              css={classes.collapseBtn}
            >
              読み込みできない？
            </Button>
          </Grid>
        </Grid>
        <Collapse in={openUrl} timeout="auto">
          <Grid
            container
            direction="column"
            alignItems="left"
            spacing={1}
            css={classes.dialogContainer}
          >
            <Grid item>
              <Typography>
                調整さんのサイトからcsvファイルをダウンロードしてここにアップロードしてください。
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    component="label"
                    css={classes.fileBtn}
                  >
                    ファイルを選択
                    <input
                      type="file"
                      accept=".csv"
                      hidden
                      onChange={(e) => handleFileChange(e)}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Typography sx={{ ml: '8px' }}>{filename}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </DialogContent>
    </Dialog>
  );
}
