import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'App Icon';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 10,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <svg
          xmlns="http://w3.org"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m16 16 3-8 3 8c-.87.65-2.24 1-3.5 1s-2.63-.35-3.5-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-2.24 1-3.5 1s-2.63-.35-3.5-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h18" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
