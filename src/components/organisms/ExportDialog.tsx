/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { ContainedBtn } from '../atom/ContainedBtn';
import { OutlinedBtn } from '../atom/OutlinedBtn';
import { marker2Icon } from '../atom/marker';
import { useAppSelector } from '../../app/hooks';
import {
  selectAllDateList,
  selectDateArr,
  selectMemList,
  selectMemMat,
} from '../../features/allDateSlice';

const dialogWidth = Math.min(450, window.innerWidth - 20);
const classes = {
  btnOn: css({
    backgroundColor: green[400],
    color: 'white',
    '&:hover': {
      backgroundColor: green[600],
    },
  }),
};

export function ExportDialog(props: {
  openDialog: boolean;
  onClose: () => void;
}) {
  const [ok, setOk] = useState(false);
  const [q, setQ] = useState(true);
  const [ng, setNg] = useState(true);
  const [copied, setCopied] = useState(false);

  const dateArr = useAppSelector(selectDateArr);
  const allDateList = useAppSelector(selectAllDateList);
  const memMat = useAppSelector(selectMemMat);
  const memList = useAppSelector(selectMemList);

  const dateList: string[] = [];
  dateArr.forEach((dateState, idx) => {
    if (dateState === -1 || dateState === 0) {
      let dateInfo = `${allDateList[idx]}\n`; // TODO: メンバー情報を追加
      const memVec = memMat[idx];
      if (ok) {
        const okMems = memList.filter((_, memIdx) => memVec[memIdx] === '○');
        dateInfo += `○: ${okMems.join('、')}\n`;
      }
      if (q) {
        const qMems = memList.filter((_, memIdx) => memVec[memIdx] === '△');
        dateInfo += `△: ${qMems.join('、')}\n`;
      }
      if (ng) {
        const ngMems = memList.filter((_, memIdx) => memVec[memIdx] === '×');
        dateInfo += `×: ${ngMems.join('、')}\n`;
      }
      dateList.push(dateInfo);
    }
  });
  const infoText = dateList.join('\n');

  function toggleOk() {
    setOk(!ok);
    setCopied(false);
  }
  function toggleQ() {
    setQ(!q);
    setCopied(false);
  }
  function toggleNg() {
    setNg(!ng);
    setCopied(false);
  }

  function onClose() {
    setCopied(false);
    props.onClose();
  }

  async function copy() {
    if (!navigator.clipboard) {
      alert('コピーできませんでした…\n手で選択してコピーしてください。');
      setCopied(false);
    }
    await navigator.clipboard.writeText(infoText);
    setCopied(true);
  }

  return (
    <Dialog onClose={onClose} open={props.openDialog}>
      <DialogTitle>エクスポート</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          alignItems="left"
          spacing={1}
          sx={{ width: `${dialogWidth}px` }}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography>含める: </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={toggleOk} css={ok && classes.btnOn}>
                  {marker2Icon('○')}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={toggleQ} css={q && classes.btnOn}>
                  {marker2Icon('△')}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={toggleNg} css={ng && classes.btnOn}>
                  {marker2Icon('×')}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <TextField
              multiline
              label="text"
              rows={7}
              value={infoText}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: `100%` }}
            />
          </Grid>

          <Grid item>
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
                <ContainedBtn
                  text={copied ? 'コピーした！' : 'コピーする'}
                  onClick={copy}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
