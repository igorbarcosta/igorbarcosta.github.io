import { useEffect, useState } from "react";

const phrases = [
  "Educator & Lifelong Learner",
  "Data & AI Explorer",
  "Sports Analytics",
  "Uncertainty Lover",
  "Knowledge Junkie",
  "Computer Science PhD",
];

export default function Typewriter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setText(phrases[index].substring(0, subIndex));
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <span className="font-medium text-lg">
      {text}
      <span className="cursor">|</span>
    </span>
  );
}
