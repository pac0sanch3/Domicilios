// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const InputSubmit = ({valorInput}) => {

  return (
    <>
      <input
        type="submit"
        value={valorInput}
        className="bg-green-400 hover:bg-green-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg"
      />
    </>
  );
};

export default InputSubmit;
