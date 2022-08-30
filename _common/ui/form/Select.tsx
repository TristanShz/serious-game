import React, { ChangeEventHandler } from "react";
import clsx from "clsx";

type Props = {
  onChange?: ChangeEventHandler;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options: { label: string | number; value: any }[];
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: { message: string };
};

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ error, onValueChange, onChange, ...props }, ref) => {
    return (
      <>
        <select
          disabled={props.disabled}
          ref={ref}
          {...props}
          className={clsx(
            props.className,
            "w-full border border-solid border-2 border-selectBorderColor h-10 rounded-md focus:border-lightBlue"
          )}
          onChange={(event) => {
            if (onChange) onChange(event);
            if (onValueChange) onValueChange(event.target.value, event);
          }}
          defaultValue={props.defaultValue}
        >
          {props.options &&
            props.options.map((option, index: number) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            })}
        </select>
        {error && <div className={"text-error text-sm"}>{error.message}</div>}
      </>
    );
  }
);
Select.displayName = "UiSelect";
