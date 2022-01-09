import React, { useEffect, useState, useRef } from "react";
import { WaitFor } from "./components/Wait";
import styles from "./components/TextRotator.module.css";

export const Version: string = "0.0.9";

enum Phase {
  GetText = 1,
  ShowText = 2,
  TextVisible = 3,
  HideText = 10,
}

export interface IDataItem {
  id: number,
  text: string
}

export interface IDataLoader {
  first:() => IDataItem; 
  next: (lastItem: number) => IDataItem;
}

interface ITextRotatorProp {
  interval: number,
  dataLoader: IDataLoader
}

const TextRotator = ({interval, dataLoader } : ITextRotatorProp) => {

  const firstItem = dataLoader.first();

  const [text, setText] = useState<string>(firstItem.text);
  const [textVisible, setTextVisible] = useState<boolean>(true);
  const textVisibleRef = useRef<boolean>(false);
  const textNumberRef = useRef<number>(firstItem.id);
  const [phase, setPhase] = useState<Phase>(Phase.TextVisible);

  const showText = (show: boolean) => {
    textVisibleRef.current = show;
    setTextVisible(textVisibleRef.current);
  };

  useEffect(() => {
    const getText = async (
      callback: (text: string) => void
    ): Promise<void> => {
      
      //half way through the phase
      await WaitFor(interval/2);

      const nextItem = dataLoader.next(0);
      textNumberRef.current = nextItem.id;
      callback(nextItem.text);
    };

    let count: number = phase;

    setInterval(() => {
      let phase = (count % 10) + 1;
      setPhase(phase);

      if (phase === Phase.GetText) {
        getText((text) => setText(text));
      } else if (phase === Phase.ShowText) {
        showText(true);
      } else if (phase === Phase.HideText) {
        showText(false);
      }
      count = count + 1;
    }, interval);
  }, []);

  return (
    <div className={styles.text + (textVisible ? "" : ` ${styles.hidden}`)}>
      <div className={styles.fadeintext + (textVisible ? "" : ` ${styles.hidden}`)}>
        <pre>{text}</pre>
      </div>
    </div>
  );
};

export default TextRotator;
