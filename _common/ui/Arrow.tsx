type Props = {
  className?: string;
};

export function Arrow(props: Props) {
  return (
    <div className={props.className}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 8L32 24L16 40"
          stroke="#FF7001"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
