import React, { useRef, useMemo, useState } from "react";
import JoditEditor from "jodit-react";
interface DataProps {
  placeholder?: string;
  disabled?: boolean;
  content: string;
  onChange: (data: string) => void;
}
const DataEditor: React.FC<DataProps> = ({
  placeholder = "",
  disabled = false,
  content,
  onChange,
}) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: disabled,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder, disabled]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={onChange}
    />
  );
};

export default DataEditor;
