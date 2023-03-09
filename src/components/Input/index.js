import React from "react";

//constants
import { INPUT_DEFAULT } from "@/constants/service";

function Input({ onChange, onKeyUp, ...props }) {
  return (
    <input
      className="focus:border-kaya-black h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
      onChange={onChange}
      onKeyUp={onKeyUp}
      {...INPUT_DEFAULT}
      {...props}
    />
  );
}

export default Input;
