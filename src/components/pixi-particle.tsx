import { gsap } from "gsap";
import { Application, Container, Rectangle, Sprite, Texture } from "pixi.js";
import { useCallback, useEffect, useRef } from "react";

import { NoiseGenerator } from "../libs/perlin";
import "./pixi-particle.css";

/**
 * パーティクルクラス。
 * scaleXとscaleYを制御したいためだけに用意したクラスです。
 */
class Dot extends Sprite {
  get scaleX() {
    return this.scale.x;
  }
  set scaleX(value) {
    this.scale.x = value;
  }
  get scaleY() {
    return this.scale.y;
  }
  set scaleY(value) {
    this.scale.y = value;
  }
  offsetIndex = -1;
}

interface Props {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  fontStyle?: string;
  textColor?: string | number;
  dotSize?: number;
  backgroundColor?: string | number;
}

function PixiParticle({
  text,
  fontSize = 200,
  fontFamily = 'Arial',
  fontWeight = 'normal',
  fontStyle = 'normal',
  textColor = 0xffffff,
  dotSize = 2,
  backgroundColor = 0x000000,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const createTextImage = useCallback(async (
    textContent: string,
    fontSize_val: number,
    fontFamily_val: string,
    fontWeight_val: string | number,
    fontStyle_val: string,
    textColor_val: string | number,
  ): Promise<HTMLImageElement> => {
    // テキスト色を数値に変換
    let textColorNum: number;
    if (typeof textColor_val === 'string') {
      textColorNum = parseInt(textColor_val.replace('#', ''), 16);
    } else {
      textColorNum = textColor_val;
    }
    const textColorHex = `#${textColorNum.toString(16).padStart(6, '0')}`;

    // フォント文字列を構築
    const fontString = `${fontStyle_val} ${fontWeight_val} ${fontSize_val}px ${fontFamily_val}`;

    // テンポラリCanvasでテキストのサイズを測定
    const measureCanvas = document.createElement('canvas');
    const measureCtx = measureCanvas.getContext('2d');
    if (!measureCtx) {
      throw new Error('Failed to get canvas context');
    }
    measureCtx.font = fontString;
    const metrics = measureCtx.measureText(textContent);
    const textWidth = Math.ceil(metrics.width) + 40;
    const textHeight = Math.ceil(fontSize_val) + 20;

    // 本画面Canvasを作成
    const canvas = document.createElement('canvas');
    canvas.width = textWidth;
    canvas.height = textHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    ctx.font = fontString;
    ctx.fillStyle = textColorHex;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textContent, textWidth / 2, textHeight / 2);

    // CanvasからImage要素を生成
    const image = new Image();
    image.src = canvas.toDataURL();
    await image.decode();

    return image;
  }, []);

  const init = useCallback(async () => {
    if (!divRef.current) {
      return;
    }

    NoiseGenerator.seed(Date.now());

    // テキストから画像を生成
    const image = await createTextImage(text, fontSize, fontFamily, fontWeight, fontStyle, textColor);

    // PIXIのアプリケーションを作成する
    const app = new Application();

    // 背景色を数値に変換（必要な場合）
    let bgColor: number;
    if (typeof backgroundColor === "string") {
      // HEX文字列を数値に変換
      bgColor = parseInt(backgroundColor.replace("#", ""), 16);
    } else {
      bgColor = backgroundColor;
    }

    // パーティクル色を数値に変換（textColorを使用）
    let particleColorNum: number;
    if (typeof textColor === "string") {
      // HEX文字列を数値に変換
      particleColorNum = parseInt(textColor.replace("#", ""), 16);
    } else {
      particleColorNum = textColor;
    }

    await app.init({
      antialias: true,
      resizeTo: window,
      backgroundColor: bgColor,
      resolution: devicePixelRatio,
    });

    app.canvas.classList.add("myCanvas");
    divRef.current.appendChild(app.canvas);

    // ドットサイズの大きさ。1は等倍。
    // 1は綺麗だけど、TLの初期化に時間を要するのでやむなく倍化で。
    const DOT_SIZE = dotSize;

    // 画像のサイズを算出
    const imageW = image.width;
    const imageH = image.height;
    const lengthW = imageW / DOT_SIZE;
    const lengthH = imageH / DOT_SIZE;

    // パフォーマンスのためパーティクルコンテナーを利用
    const container = new Container();
    app.stage.addChild(container);

    // テクスチャーを作成
    // テクスチャーを1枚にしていることがパフォーマンスに効果絶大
    const texture = Texture.from(image);

    // 画像をメモリ上のcanvasに転写。ピクセル値を取得するため
    const canvas = document.createElement("canvas");
    canvas.width = imageW;
    canvas.height = imageH;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context?.drawImage(image, 0, 0);

    // ----------------------------------------------
    // パーティクルの生成
    // ----------------------------------------------
    const dots = [];
    for (let i = 0; i < lengthW * lengthH; i++) {
      const x = (i % lengthW) * DOT_SIZE;
      const y = Math.floor(i / lengthW) * DOT_SIZE;

      const dotData = context?.getImageData(
        // 範囲の中央を利用
        x + Math.floor(DOT_SIZE / 2),
        y + Math.floor(DOT_SIZE / 2),
        1,
        1,
      );
      // 透過チャンネルを取得
      if (!dotData) {
        continue;
      }
      const alpha = dotData.data[3];

      // 透明だったらスプライトは作らないようにする
      if (alpha === 0) {
        continue;
      }

      const texture2 = new Texture({
        source: texture.source,
        frame: new Rectangle(x, y, DOT_SIZE, DOT_SIZE),
      });
      const dot = new Dot(texture2);
      dot.anchor.set(0.5);
      dot.x = x - imageW / 2;
      dot.y = y - imageH / 2;
      dot.offsetIndex = i;
      dot.tint = particleColorNum;
      container.addChild(dot);

      dots.push(dot);
    }

    // ----------------------------------------------
    // モーションの実装
    // ----------------------------------------------
    // GSAPのタイムラインを作成（各トゥイーンを集約管理するため）
    const tl = gsap.timeline({
      repeat: -1,
    });

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];

      const index = dot.offsetIndex;

      // XとYを正規化 (Normalize X and Y)
      // nx は左辺を基準に 0.0〜1.0の値をとる
      const nx = (index % lengthW) / lengthW;
      // ny は上辺を基準に 0.0〜1.0の値をとる
      const ny = Math.floor(index / lengthW) / lengthH;

      // パーリンノイズでパーティクルの移動座標を決める。
      // パーリンノイズだと連続性が生まれるので、波打つ表現になる。
      // 乗算は周期と考えてもらえばOK。
      const px = NoiseGenerator.perlin2(nx * 4, ny * 3);
      const py = NoiseGenerator.perlin2(nx * 3, ny * 2);

      // 水平方向に遅延させるけど、ちょっとばらしている。
      const baseDelay =
        (dot.offsetIndex % lengthW) * 0.001 + Math.random() * 0.2;

      const perlinAmpX = 1500 * (nx * 2 + 1);
      const perlinAmpY = 500 * (nx * 2 + 1);
      const randomAmp = 10 * (nx * 2 + 1);

      const scale = nx * 3 + 1;

      tl.from(
        dot,
        {
          x: `-=${perlinAmpX * px + randomAmp * (Math.random() - 0.5)}`,
          y: `-=${perlinAmpY * py + randomAmp * (Math.random() - 0.5)}`,
          alpha: 0,
          scaleX: scale,
          scaleY: scale,
          duration: 2,
          ease: "expo.inOut",
        },
        baseDelay,
      ).to(
        dot,
        {
          x: `+=${perlinAmpX * px + randomAmp * (Math.random() - 0.5)}`,
          y: `+=${perlinAmpY * py + randomAmp * (Math.random() - 0.5)}`,
          alpha: 0,
          scaleX: scale,
          scaleY: scale,
          duration: 2.5,
          ease: "expo.out",
        },
        ">2",
      );
    }

    tl.fromTo(
      container.scale,
      { x: 0.4, y: 0.4 },
      { x: 0.5, y: 0.5, duration: 5, ease: "none" },
      0,
    );

    const resize = () => {
      // コンテナーを中心に移動
      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;
    };
    window.addEventListener("resize", resize);
    resize();
  }, [text, fontSize, fontFamily, fontWeight, fontStyle, textColor, dotSize, backgroundColor, createTextImage]);

  useEffect(() => {
    init();
  }, [init]);

  return <div ref={divRef} />;
}

export default PixiParticle;
