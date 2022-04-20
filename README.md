# GreenPeas - 複数練習日程調整ツール

複数の練習日程を自動で決めてくれるツールです。

- 公開先…https://greenpeas.vercel.app
- デモ動画…https://drive.google.com/file/d/1qPxrNAahpI3XZlx4JFJARmRFcTb33Bq7/view?usp=sharing
- バックエンド側…https://github.com/endo-koki/greenpeas-back

## 使い方

0. [調整さん](https://chouseisan.com)で出欠表を作る。
1. [GreenPeas](https://greenpeas.vercel.app)を開き、上で作った出欠表の URL をコピペして読み込む。
2. 右のサイドバーで合計練習回数と各メンバーの最低参加回数を指定して「計算する！」をクリックすると、条件を満たす日程の組み合わせが提示される。
3. 提示された候補をクリックして採用する。
   - 日程の選択/非選択は上の表をクリックすることでも可能
4. 「調整結果をエクスポート」をクリックして、結果をコピー。

## 製作背景

複数人で予定の合う日を探す際、[調整さん](https://chouseisan.com)などの便利な日程調整ツールがいくつかあり、これらを使えば候補日の中から人が多く集まる 1 日を簡単に見つけることができます。しかし、ダンス練習などの日程を複数まとめて決めようとすると、単純に人の多い候補日を採用しただけでは各人の出席回数に偏りが出る可能性があり、予定の組み方として適切ではありません。
理想的には各々の出席回数を考慮しつつなるべく多くの人が参加できる日程を組むのが望ましいですが、これを人の手でやるのは手間がかかります。そこでこの日程調整を自動で求めるために、本ツールを作りました。

## 使用したフレームワークなど

- [React](https://reactjs.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Material-UI](https://mui.com)
