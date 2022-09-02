import clsx from "clsx";

type Props = {
  className?: string;
  scroll?: boolean;
  color?: "white" | "black" | "primary" | "background-border";
  vertical?: boolean
};

export function Line(props: Props) {
  return (
    <div className={clsx(props.className, "w-full flex items-center flex-col gap-3")}>
      <div
        className={clsx({
          "bg-background-border": props.color === "background-border",
          "bg-neutral-10": props.color === "white",
          "bg-neutral": props.color === "black",
          "bg-primary": props.color === "primary",
          "h-0.5 w-full": !props.vertical,
          "h-full w-0.5": props.vertical
        })}
      />
      {props.scroll && <p className={"text-primary font-medium animate-bounce"}>.SCROLL</p>}
    </div>
  );
}
