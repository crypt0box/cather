"use client";

import { useEffect, useRef } from "react";

export default function WordCloud() {
  const wordCloudRef = useRef<SVGSVGElement | null>(null);
  // wordcloudのデータとオプションを定義
  const data = [
    "Hello",
    "World",
    "Bing",
    "Search",
    "AI",
    "Chat",
    "こんいちわ",
    "hogeheodfasfeaefae",
  ];

  const options = {
    fontFamily: "Arial",
    color: "#000",
    shape: "circle",
  };

  useEffect(() => {
    if (!wordCloudRef) return;
    // 単語の境界ボックスの配列を作成
    const boxes: SVGRect[] = [];
    const SP_WIDTH = 400;
    const MAX_SVG_WIDTH = 600;
    const MAX_SVG_HEIGHT = 400;

    // svg要素の幅と高さを取得
    const width =
      window.innerWidth < SP_WIDTH
        ? window.innerWidth
        : wordCloudRef.current?.clientWidth ?? MAX_SVG_WIDTH;
    const height = wordCloudRef.current?.clientHeight ?? MAX_SVG_HEIGHT;

    data.forEach((word, index) => {
      // text要素を作成
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

      // text要素に単語とその重みに応じたフォントサイズや色を設定
      const fontSize = 36 - 2 * index;
      text.textContent = word;
      text.style.fontSize = `${fontSize > 16 ? fontSize : 16}px`;
      text.style.fontFamily = options.fontFamily;
      text.style.fill = options.color;

      // svg要素にtext要素を追加
      wordCloudRef.current?.appendChild(text);

      // text要素の境界ボックスを取得
      const box = text.getBBox();

      // 境界ボックスの配列に追加
      boxes.push(box);
    });

    // 単語の位置を決める関数
    function placeWords() {
      let cnt = 0;
      // 単語ごとに処理
      for (let i = 0; i < data.length; i++) {
        // 無限ループを防ぐ
        if (cnt > 50) {
          break;
        }

        // 単語の境界ボックスを取得
        const box = boxes[i];

        // 単語の位置を任意の範囲でランダムに決める
        const MIN_RANDOM = 0.2;
        const MAX_RANDOM = 0.8;
        let x =
          (Math.random() * (MAX_RANDOM - MIN_RANDOM) + MIN_RANDOM) *
          (width - box.width);
        let y =
          (Math.random() * (MAX_RANDOM - MIN_RANDOM) + MIN_RANDOM) *
          (height - box.height);

        // 単語が他の単語と重なっているかどうかをチェックするフラグ
        let overlap = false;

        // 前の単語と比較する
        for (let j = i - 1; j >= 0; j--) {
          // 前の単語の境界ボックスを取得
          const prevBox = boxes[j];

          // 境界ボックス同士が交差しているかどうかを判定
          if (
            (x < prevBox.x + prevBox.width &&
              x + box.width > prevBox.x &&
              y < prevBox.y + prevBox.height &&
              y + box.height > prevBox.y) ||
            x + box.width * 2 > width ||
            y - box.height < 0 ||
            y + box.height * 2 > height
          ) {
            // 交差している場合は、重なりフラグを立てる
            overlap = true;
            // ループを抜ける
            break;
          }
        }

        // 重なりフラグが立っている場合は、再度位置を決める
        if (overlap) {
          i--;
          cnt++;
          continue;
        }

        // 重なりフラグが立っていない場合は、位置を境界ボックスに反映する
        box.x = x;
        box.y = y;
      }
    }

    // 単語の位置を反映する関数
    function updateWords() {
      // 単語ごとに処理
      for (let i = 0; i < data.length; i++) {
        // 単語の境界ボックスを取得
        const box = boxes[i];

        // text要素を取得
        const text = wordCloudRef.current?.children[i] as SVGTextElement;

        // text要素の属性に位置を反映する
        text.setAttribute("x", `${box.x}`);
        text.setAttribute("y", `${box.y + box.height}`);
      }
    }

    // 単語の位置を決める
    placeWords();

    // 単語の位置を反映する
    updateWords();
  }, []);

  return <svg width={600} height={400} ref={wordCloudRef} />;
}
