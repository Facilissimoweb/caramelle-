import React from "react";

interface FlagIconProps {
  code: string;
  className?: string;
}

export default function FlagIcon({ code, className = "w-4 h-3 rounded-xs shadow-xs object-cover border border-black/10 inline-block" }: FlagIconProps) {
  const normCode = code.toLowerCase();

  switch (normCode) {
    case "it":
      return (
        <svg viewBox="0 0 300 200" className={className} aria-label="Italiano">
          <rect width="100" height="200" fill="#009246" />
          <rect x="100" width="100" height="200" fill="#ffffff" />
          <rect x="200" width="100" height="200" fill="#ce2b37" />
        </svg>
      );
    case "en":
    case "gb":
    case "uk":
      return (
        <svg viewBox="0 0 600 400" className={className} aria-label="English">
          <clipPath id="s">
            <path d="M0,0 v400 h600 v-400 z"/>
          </clipPath>
          <clipPath id="t">
            <path d="M0,0 L600,400 M600,0 L0,400"/>
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 h600 v400 h-600 z" fill="#012169"/>
            <path d="M0,0 L600,400 M600,0 L0,400" stroke="#ffffff" strokeWidth="60" clipPath="url(#t)"/>
            <path d="M0,0 L600,400 M600,0 L0,400" stroke="#C8102E" strokeWidth="40" clipPath="url(#t)"/>
            <path d="M300,0 v400 M0,200 h600" stroke="#ffffff" strokeWidth="100"/>
            <path d="M300,0 v400 M0,200 h600" stroke="#C8102E" strokeWidth="60"/>
          </g>
        </svg>
      );
    case "fr":
      return (
        <svg viewBox="0 0 300 200" className={className} aria-label="Français">
          <rect width="100" height="200" fill="#002395" />
          <rect x="100" width="100" height="200" fill="#ffffff" />
          <rect x="200" width="100" height="200" fill="#ed2939" />
        </svg>
      );
    case "de":
      return (
        <svg viewBox="0 0 500 300" className={className} aria-label="Deutsch">
          <rect width="500" height="100" y="0" fill="#000000" />
          <rect width="500" height="100" y="100" fill="#DD0000" />
          <rect width="500" height="100" y="200" fill="#FFCC00" />
        </svg>
      );
    case "es":
      return (
        <svg viewBox="0 0 750 500" className={className} aria-label="Español">
          <rect width="750" height="125" y="0" fill="#AA151B" />
          <rect width="750" height="250" y="125" fill="#F1BF00" />
          <rect width="750" height="125" y="375" fill="#AA151B" />
          <circle cx="200" cy="250" r="35" fill="#AA151B" opacity="0.4" />
        </svg>
      );
    case "pt":
      return (
        <svg viewBox="0 0 600 400" className={className} aria-label="Português">
          <rect width="240" height="400" x="0" fill="#006600" />
          <rect width="360" height="400" x="240" fill="#FF0000" />
          <circle cx="240" cy="200" r="50" fill="#F1BF00" stroke="#000" strokeWidth="4" />
        </svg>
      );
    case "ru":
      return (
        <svg viewBox="0 0 900 600" className={className} aria-label="Русский">
          <rect width="900" height="200" y="0" fill="#ffffff" />
          <rect width="900" height="200" y="200" fill="#0039a6" />
          <rect width="900" height="200" y="400" fill="#d52b1e" />
        </svg>
      );
    case "zh":
    case "zh-cn":
      return (
        <svg viewBox="0 0 900 600" className={className} aria-label="简体中文">
          <rect width="900" height="600" fill="#de2910" />
          <polygon points="150,75 168,127 222,127 178,159 195,211 150,179 105,211 122,159 78,127 132,127" fill="#ffde00" />
          <polygon points="300,45 307,63 325,63 310,74 316,92 300,81 284,92 290,74 275,63 293,63" fill="#ffde00" />
          <polygon points="360,90 367,108 385,108 370,119 376,137 360,126 344,137 350,119 335,108 353,108" fill="#ffde00" />
          <polygon points="360,180 367,198 385,198 370,209 376,227 360,216 344,227 350,209 335,198 353,198" fill="#ffde00" />
          <polygon points="300,225 307,243 325,243 310,254 316,272 300,261 284,272 290,254 275,243 293,243" fill="#ffde00" />
        </svg>
      );
    case "ar":
      return (
        <svg viewBox="0 0 900 600" className={className} aria-label="العربية">
          <rect width="900" height="600" fill="#006c35" />
          <path d="M 220,430 H 680 V 448 H 220 Z M 680,418 L 730,439 L 680,460 Z" fill="#ffffff" />
          <text x="450" y="280" textAnchor="middle" fill="#ffffff" fontSize="125" fontFamily="sans-serif" fontWeight="bold">لا إله إلا الله</text>
        </svg>
      );
    case "ja":
      return (
        <svg viewBox="0 0 900 600" className={className} aria-label="日本語">
          <rect width="900" height="600" fill="#ffffff" />
          <circle cx="450" cy="300" r="180" fill="#bc002d" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 300 200" className={className}>
          <rect width="100" height="200" fill="#009246" />
          <rect x="100" width="100" height="200" fill="#ffffff" />
          <rect x="200" width="100" height="200" fill="#ce2b37" />
        </svg>
      );
  }
}
