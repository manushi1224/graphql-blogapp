import React from "react";

function InputField({
  setUser,
  user,
  type,
  label,
  name,
}: {
  setUser: Function;
  user: any;
  type: string;
  label: string;
  name: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-200"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={type}
          type={type}
          autoComplete={type}
          onChange={(e) => setUser({ ...user, [`${name}`]: e.target.value })}
          className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        ></input>
      </div>
    </div>
  );
}

export default InputField;
