export default function ReturnButton() {
  return (
    <div className={"bg-quizz-background shadow-xl absolute z-50 left-4 bg-white p-3 rounded-b-full"}>
      <div className={"scale-90 hover:scale-100 active:scale-90 hover:cursor-pointer transition-all"}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_196_198)">
            <path
              d="M32.3588 5.35716V15.6396H37.7176V26.3555H16.7192V20.3505L0 31.4967L16.7193 42.6428V36.6378H48V5.35712H32.3588V5.35716Z"
              fill="#BA8B5B" />
          </g>
          <defs>
            <clipPath id="clip0_196_198">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
