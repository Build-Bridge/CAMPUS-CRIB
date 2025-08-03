/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";

interface CustomInputProps {
  type: string;
  name: string;
  placeholder: string;
  value?: string | number | boolean | any;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleChecked?: any;
  options?: string[];
  notBordered?: boolean;
  borderColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  options,
  notBordered,
  borderColor,
  name,
  value,
  handleChange,
  handleChecked,
}) => {
  const style = "grow w-full outline-none border-0 p-3 text-dark";
  // const [isOn, setIsOn] = useState(true);
  return (
    <div
      className={` flex  p-0.5 ${
        !notBordered ? `rounded-lg border` : "border-0"
      } ${borderColor ? `border-[${borderColor}]` : "border-primary"}`}
    >
      {(type == "text" || type == "number") && (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          className={`${style}`}
          placeholder={placeholder}
          onChange={handleChange}
          // contentEditable
        />
      )}

      {type == "select" && (
        <select
          className={`${style} bg-white`}
          name={name}
          onChange={handleChange}
        >
          <option className="text-dark/70">{placeholder}</option>

          {options?.map((item, i) => (
            <option key={i} className="text-dark/60" value={item}>
              {item}
            </option>
          ))}
        </select>
      )}

      {type == "textarea" && (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={6}
          maxLength={150}
          className={`${style}`}
          defaultValue={value}
          onChange={handleChange}
        />
      )}

      {type == "checkbox" && (
        <div className="flex gap-x-1 items-center">
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={handleChecked}
            id=""
            className="size-4"
          />
          <p className="text-xs text-dark">{placeholder}</p>
        </div>
      )}

      {type == "toggle" && (
        <div className="flex items-center justify-center">
          <div
            onClick={handleChecked}
            className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${
              value == true ? "bg-[#e8d0c5]" : "bg-gray-600/60"
            }`}
          >
            <div
              className={`absolute w-4 h-4 rounded-full transition-transform ${
                value == true
                  ? "bg-primary right-1 top-0.5"
                  : "bg-white left-1 top-0.5"
              }`}
            ></div>
          </div>
        </div>
      )}

      {type == "date" && (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          onChange={handleChange}
          className={`${style}`}
          placeholder={placeholder}
          // contentEditable
        />
      )}
    </div>
  );
};

export default CustomInput;
