import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState('');
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <div dangerouslySetInnerHTML={{ __html: displayText }} />;
};

export default Typewriter;