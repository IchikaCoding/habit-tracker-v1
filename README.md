# Habit Tracker Web App

LoopHabitTracker の Web 版を目指した習慣トラッキングアプリケーションです。

## 技術スタック

- **フロントエンド**

  - Next.js 15.1.7
  - React 19.0.0
  - TypeScript
  - Tailwind CSS

- **バックエンド/データベース**
  - Firebase
  - Firestore

## 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/IchikaCoding/habit-tracker-v1.git
cd habit-tracker-v1
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 開発サーバーの起動

```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 現在の機能

- ユーザー認証（Firebase Authentication）
- 習慣の追加機能
  - タイトル設定
  - 質問文設定
  - 頻度設定

## 開発中の機能

- 習慣の一覧表示
- 習慣の編集・削除
- 日々のチェック機能
- 統計情報の表示
- UI/UX の改善

## プロジェクトの進捗

- [x] プロジェクトの初期設定
- [x] 基本的な認証機能
- [x] 習慣追加機能の基本実装
- [ ] 習慣一覧表示
- [ ] 習慣の編集・削除
- [ ] チェック機能
- [ ] 統計情報
- [ ] UI/UX 改善

## ライセンス

MIT License
