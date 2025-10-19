# Pixi Particle Playground

高度な粒子アニメーション可視化ツール。テキストを粒子に変換し、Perlinノイズを活用した波のようなアニメーション効果を生成できるインタラクティブなWebアプリケーションです。

![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)
![Pixi.js](https://img.shields.io/badge/Pixi.js-8.14-ff0000?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiNGRjAwMDAiIHJ4PSI0Ii8+PC9zdmc+)
![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02)

## 特徴

- 🎨 **テキスト粒子化**: 任意のテキストを粒子アニメーションに変換
- 🌊 **Perlinノイズ**: 連続性のある波打つアニメーション効果
- ⚡ **高パフォーマンス**: Pixi.jsの2D GPUレンダリングで滑らかな動作
- 🎛️ **完全なカスタマイズ**: 15個のパラメータでアニメーションを細かく制御
- 📱 **レスポンシブデザイン**: モバイルからデスクトップまで対応
- ♾️ **無限ループ**: シームレスなアニメーション再生

## デモ

このアプリケーションでは以下をカスタマイズできます：

- **テキスト設定**: フォント、サイズ、太さ、スタイル
- **色**: テキスト色と背景色
- **アニメーション**: 期間、振幅、ノイズスケール
- **粒子**: サイズと密度
- **スケーリング**: コンテナの拡大縮小効果

## 参考資料

このプロジェクトは以下のWebサイトを参考に作成されています：

- [ICS Media - JavaScriptでクリエイティブコーディング　テキストを分解しパーティクルにする演出](https://ics.media/entry/221216/)

## 技術スタック

### フレームワーク・ライブラリ

| パッケージ | バージョン | 用途 |
|----------|----------|------|
| **React** | ^19.2.0 | UIフレームワーク |
| **react-dom** | ^19.2.0 | ReactのDOM操作 |
| **Pixi.js** | ^8.14.0 | 2D GPUレンダリングと粒子表示 |
| **GSAP** | ^3.13.0 | アニメーションタイムライン管理 |

### ビルドツール・開発ツール

| パッケージ | バージョン | 用途 |
|----------|----------|------|
| **TypeScript** | ~5.9.3 | 静的型付け |
| **Vite** | ^7.1.9 | ビルドツール・開発サーバー |
| **Biome** | 2.2.6 | コード品質管理（リント・フォーマッタ） |

## プロジェクト構造

```
src/
├── components/
│   ├── pixi-particle.tsx    # Pixi.jsベースの粒子アニメーション実装
│   └── pixi-particle.css    # キャンバス用スタイル
├── libs/
│   └── perlin.ts            # Perlin/Simplexノイズ実装
├── App.tsx                  # メインアプリケーション＆コントロールパネル
├── App.css                  # UIレイアウトスタイル
├── main.tsx                 # Reactマウントポイント
└── index.css                # グローバルスタイル
```

## 使い方

### インストール

```bash
npm install
```

### 開発サーバーを起動

```bash
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開くと、アプリケーションが起動します。

### ビルド

```bash
npm run build
```

本番用の最適化されたファイルが `dist/` フォルダに生成されます。

### プレビュー

```bash
npm run preview
```

ビルド後のアプリケーションをローカルでプレビューできます。

### コード品質チェック

```bash
npm run lint
```

コード規約の確認と自動修正を実行します。

## コンポーネント詳細

### PixiParticle コンポーネント (`src/components/pixi-particle.tsx`)

テキストをParticle エフェクトでアニメーションさせるメインコンポーネント。

#### Props

```typescript
interface Props {
  text: string;                      // 表示するテキスト
  fontSize?: number;                 // フォントサイズ (デフォルト: 200)
  fontFamily?: string;               // フォントファミリー (デフォルト: 'Arial')
  fontWeight?: string | number;      // フォント太さ (デフォルト: 'normal')
  fontStyle?: string;                // フォントスタイル (デフォルト: 'normal')
  textColor?: string | number;       // テキスト色 (デフォルト: 0xffffff)
  dotSize?: number;                  // 粒子サイズ (デフォルト: 2)
  backgroundColor?: string | number; // 背景色 (デフォルト: 0x000000)
  animationDuration?: number;        // アニメーション期間秒 (デフォルト: 2)
  amplitudeX?: number;               // X軸振幅 (デフォルト: 1500)
  amplitudeY?: number;               // Y軸振幅 (デフォルト: 500)
  noiseScaleX?: number;              // Xノイズスケール (デフォルト: 4)
  noiseScaleY?: number;              // Yノイズスケール (デフォルト: 3)
  initialContainerScale?: number;    // 初期コンテナスケール (デフォルト: 0.4)
  finalContainerScale?: number;      // 最終コンテナスケール (デフォルト: 0.5)
}
```

#### 処理フロー

1. **テキストレンダリング**: Canvas APIを使用してテキストを画像化
2. **粒子抽出**: 画像のアルファチャンネルをチェックして不透明なピクセルのみを粒子として抽出
3. **ノイズ計算**: 各粒子の軌跡をPerlinノイズで計算
4. **アニメーション**: GSAPタイムラインで粒子の移動とスケール変更を管理
5. **リサイズ対応**: ウィンドウのリサイズイベントに自動対応

### コントロールパネル (`src/App.tsx`)

以下のカスタマイズ項目を提供：

#### テキスト・フォント設定

- **テキスト**: 入力フィールド（最大20文字）
- **フォントサイズ**: 50px～400px
- **フォントファミリー**: Arial、Georgia、Times New Roman、Courier New、Verdana
- **フォント太さ**: Light、Normal、Bold、Bolder
- **フォントスタイル**: Normal、Italic、Oblique

#### 色・サイズ設定

- **テキスト色**: カラーピッカー
- **背景色**: カラーピッカー
- **ドットサイズ**: 1～10

#### アニメーション設定

- **アニメーション期間**: 0.5s～10s
- **振幅X**: 100～3000
- **振幅Y**: 100～3000
- **ノイズスケールX**: 1～10
- **ノイズスケールY**: 1～10
- **初期コンテナスケール**: 0.1～2
- **最終コンテナスケール**: 0.1～2

## アニメーションの仕組み

### Perlinノイズ

Perlinノイズは、ランダムながらも自然な流れを持つ値を生成します。このプロジェクトでは、各粒子の移動軌跡をPerlinノイズベースで計算することで、波打つような滑らかなアニメーション効果を実現しています。

### GSAPタイムライン

各粒子に対して以下のアニメーションを実行：

1. **from()**: 初期位置からテキストの最終位置へ移動しながら、スケールと透明度を変更
2. **to()**: テキスト位置から離れていくアニメーション
3. **repeat: -1**: 無限ループで繰り返し

### 遅延制御

粒子ごとに遅延を設定することで、波打つ効果を演出しています。水平方向の位置に基づいた遅延により、滑らかに波が流れるビジュアル表現が可能になります。

## UIデザイン

- **ダークテーマ**: 背景色 #1e1e1e、アクセント色 #007acc
- **レスポンシブレイアウト**: 768px以下でタブレット/モバイル対応のスタック型レイアウトに変更
- **実装**: Flexboxによる柔軟な配置

## ブラウザ対応

- Chrome（最新）
- Firefox（最新）
- Safari（最新）
- Edge（最新）

WebGL対応ブラウザが必要です（Pixi.jsの要件）。

## 貢献

バグ報告や機能提案は、Issuesでお知らせください。

## 関連リンク

- [Pixi.js 公式ドキュメント](https://pixijs.download/v8.14.0/docs/index.html)
- [GSAP 公式ドキュメント](https://gsap.com/docs/v3)
- [Vite 公式ドキュメント](https://vitejs.dev/)
