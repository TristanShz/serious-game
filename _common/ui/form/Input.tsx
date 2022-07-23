import clsx from "clsx";
import {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";
import Image from "next/image";

export type TInputProps<T = string> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: FieldError;
  innerRef?: any;
  value?: any;
  onValueChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void;
  endIcon?: string;
  full?: boolean;
  width?: string;
  autoCompleteOff?: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      error,
      className,
      value,
      endIcon,
      onValueChange,
      onChange,
      full,
      ...props
    },
    ref
  ) => {
    return (
      <div className={"relative w-full"}>
        <input
          autoComplete={props.autoCompleteOff ? "off" : undefined}
          ref={props.innerRef}
          value={value ?? ""}
          {...props}
          className={clsx(
            className,
            "h-10 pl-2 text-sm md:text-base mt-1.5 border-2 border-solid border-input-border rounded-md focus:border-input-focus disabled:bg-black-50 disabled:opacity-60",
            {
              ["w-full"]: full,
              [props.width ? props.width : ""]: props.width,
            }
          )}
          onChange={(event) => {
            if (onChange) onChange(event);
            if (onValueChange) onValueChange(event.target.value, event);
          }}
        />
        {endIcon && (
          <div className={"absolute right-3 top-2.5"}>
            <Image src={endIcon} width={16} height={16} />
          </div>
        )}

        {error?.message && (
          <div className={"text-input-error text-xs md:text-sm"}>
            {error.message.toString()}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
