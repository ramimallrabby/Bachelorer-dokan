const PATHS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  shield: <><path d="M12 3l7 3v5c0 5-3.2 8.2-7 10-3.8-1.8-7-5-7-10V6l7-3z" /><path d="m9 12 2 2 4-4" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  filter: <><path d="M4 7h9M17 7h3M4 17h3M11 17h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  back: <path d="M19 12H5m6-6-6 6 6 6" />,
  next: <path d="m9 6 6 6-6 6" />,
  prev: <path d="m15 6-6 6 6 6" />,
  send: <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>,
  logout: <path d="M9 21H5V3h4M16 17l5-5-5-5M21 12H9" />,
  bag: <><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  box: <><path d="M3 8l9-5 9 5v8l-9 5-9-5V8z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
  alert: <><path d="M12 3 2 20h20L12 3z" /><path d="M12 10v4M12 17.5v.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  down: <path d="m6 9 6 6 6-6" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="m21 16-5-5-8 8" /></>,
  upload: <path d="M12 16V4m0 0-4 4m4-4 4 4M4 20h16" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  receipt: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6" />,
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
