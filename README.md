# GreenPeas - 複数練習日程調整ツール

複数の練習日程を自動で決めてくれるツールです。

公開先…https://greenpeas.vercel.app

## 使い方

0. [調整さん](https://chouseisan.com)で出欠表を作る。
1. [GreenPeas](https://greenpeas.vercel.app)を開き、上で作った出欠表の URL をコピペして読み込む。
2. 右のサイドバーで合計練習回数と各メンバーの最低参加回数を指定して「計算する！」をクリックすると、条件を満たす日程の組み合わせが提示される。
3. 提示された候補をクリックして採用する。
   - 日程の選択/非選択は上の表をクリックすることでも可能
4. 「調整結果をエクスポート」をクリックして、結果をコピー。

## 使用したフレームワークなど

- [React](https://reactjs.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Material-UI](https://mui.com)
