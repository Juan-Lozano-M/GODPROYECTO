import { useState, useEffect } from "react";

const TextWriter = ({ words, cursor = true, cursorStyle = "|", typeSpeed = 100, delaySpeed = 1000 }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return; // Si ya terminó, no hacer nada

    const currentWord = words[wordIndex];

    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typeSpeed);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setIsFinished(true), delaySpeed);
    }
  }, [charIndex, wordIndex, words, typeSpeed, delaySpeed, isFinished]);

  return (
    <span>
      {text}
      {cursor && !isFinished && <span>{cursorStyle}</span>}
    </span>
  );
};

export default TextWriter;
