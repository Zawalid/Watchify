"use client";
import { useState } from "react";
import Input, { icons, type InputProps } from "./Input";

export default function PasswordInput({ ...props }: InputProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Input type={visible ? "text" : "password"} placeholder="*********" {...props}>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 icon"
        type="button"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? icons.invisible : icons.visible}
      </button>
    </Input>
  );
}
