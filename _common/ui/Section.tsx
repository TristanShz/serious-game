import { PropsWithChildren } from "react";

type Props = {
  h1Title?: boolean
  title: string
  children: PropsWithChildren<any>
  className?: string
};

export function Section(props: Props) {
  const titleStyle = "font-bold text-2xl sm:text-3xl md:text-4xl mb-4";
  return (
    <div className={props.className}>
      {
        props.h1Title ?
          <h1 className={titleStyle}>{props.title}</h1> : <h2 className={titleStyle}>{props.title}</h2>
      }
      {props.children}
    </div>
  );
}
