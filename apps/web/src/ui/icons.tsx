import * as React from "react";
import { cn } from "./cn";

export type IconName =
  | "search"
  | "arrowBack"
  | "north"
  | "south"
  | "chat"
  | "openInNew"
  | "code"
  | "chevronDown";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

export function GIcon({ name, size = 20, className, title }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: cn("g-icon", className)
  } as const;

  const stroke = "currentColor";
  const strokeWidth = 1.8;

  switch (name) {
    case "search":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <circle cx="11" cy="11" r="6.2" stroke={stroke} strokeWidth={strokeWidth} />
          <path d="M20 20l-3.7-3.7" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    case "arrowBack":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M10 6L4 12l6 6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4.5 12H20" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    case "north":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M12 4l-6 6m6-6l6 6M12 4v16"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "south":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M12 20l-6-6m6 6l6-6M12 20V4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M6.2 18.2l-0.2 3.2 2.8-1.6h8.4c2 0 3.6-1.6 3.6-3.6V8.6C20.8 6.6 19.2 5 17.2 5H6.8C4.8 5 3.2 6.6 3.2 8.6v6.2c0 1.9 1.5 3.4 3.4 3.4z"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          <path d="M7.4 10h8.8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d="M7.4 13.4h6.4" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    case "openInNew":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M14 5h5v5"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14L19 5"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "code":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M9.5 8L6 12l3.5 4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 8L18 12l-3.5 4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common} aria-hidden={title ? undefined : true} role={title ? "img" : "presentation"}>
          {title ? <title>{title}</title> : null}
          <path
            d="M6.5 9.5L12 15l5.5-5.5"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

