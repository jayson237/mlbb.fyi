"use client";

function Loading() {
  return (
    <div className="flex items-center justify-center pt-24">
      <svg
        fill="none"
        className="h-8 w-8 animate-spin text-pwhite "
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fillRule="evenodd"
          stroke="4"
        />
      </svg>
      <p className="font-heading text-2xl md:ml-3">Loading...</p>
    </div>
  );
}

export default Loading;
