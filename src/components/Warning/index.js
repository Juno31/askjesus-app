import React from "react";

function Warning({ warning, cancel, leave }) {
  return (
    <div
      className={`fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-60 px-4 transition-all duration-300 ${
        warning ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
    >
      <div className="popup flex flex-col items-center justify-start rounded-3xl bg-white p-6">
        <h1 className="text-kaya-black mt-9 text-xl font-bold">
          Are you sure?
        </h1>
        <p className="text-kaya-black mt-2 text-center">
          If you leave, this chat <br /> disappears from memory.
        </p>
        <div className="mt-8 flex w-full flex-row gap-3">
          <button
            className="text-kaya-500 border-kaya-500 h-14 flex-1 rounded-2xl border-2 font-bold"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="bg-kaya-500 border-kaya-500 h-14 flex-1 rounded-2xl border-2 font-bold text-white"
            onClick={leave}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default Warning;
