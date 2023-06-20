import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "auto";
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
  // if (textAreaRef) {
  //   textAreaRef.style.height = "auto";
  //   const scrollHeight = textAreaRef.scrollHeight;
  //   textAreaRef.style.transition = "height 0.3s";

  //   textAreaRef.style.height = scrollHeight + "px";
  // }
};

export default useAutosizeTextArea;
