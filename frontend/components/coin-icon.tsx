"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function CoinIcon() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative inline-block cursor-pointer select-none">
          {/* Pixel Art Coin - round without black border */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            className="block"
            style={{ imageRendering: "pixelated" }}
          >
            {/* Clip path for round coin */}
            <defs>
              <clipPath id="coinClip">
                <circle cx="8" cy="8" r="7.5" />
              </clipPath>
            </defs>
            
            {/* Main coin body - bright yellow (#FFD700) */}
            <g clipPath="url(#coinClip)">
              {/* Base yellow circle */}
              <circle cx="8" cy="8" r="7.5" fill="#FFD700" />
              
              {/* Highlight pixels - top left (cream/light yellow #FFFACD) */}
              <rect x="2" y="2" width="1" height="1" fill="#FFFACD" />
              <rect x="3" y="2" width="1" height="1" fill="#FFFACD" />
              <rect x="4" y="2" width="1" height="1" fill="#FFFACD" />
              <rect x="5" y="2" width="1" height="1" fill="#FFFACD" />
              <rect x="2" y="3" width="1" height="1" fill="#FFFACD" />
              <rect x="3" y="3" width="1" height="1" fill="#FFFACD" />
              <rect x="4" y="3" width="1" height="1" fill="#FFFACD" />
              <rect x="2" y="4" width="1" height="1" fill="#FFFACD" />
              <rect x="3" y="4" width="1" height="1" fill="#FFFACD" />
              
              {/* Shadow pixels - bottom right (darker orange #FF8C00) */}
              <rect x="11" y="11" width="1" height="1" fill="#FF8C00" />
              <rect x="12" y="11" width="1" height="1" fill="#FF8C00" />
              <rect x="13" y="11" width="1" height="1" fill="#FF8C00" />
              <rect x="11" y="12" width="1" height="1" fill="#FF8C00" />
              <rect x="12" y="12" width="1" height="1" fill="#FF8C00" />
              <rect x="13" y="12" width="1" height="1" fill="#FF8C00" />
              <rect x="11" y="13" width="1" height="1" fill="#FF8C00" />
              <rect x="12" y="13" width="1" height="1" fill="#FF8C00" />
              <rect x="13" y="13" width="1" height="1" fill="#FF8C00" />
              
              {/* GC text in pixel art style - centered */}
              <g transform="translate(0.3, 0)">
                {/* G letter - centered */}
                <rect x="4" y="6" width="3" height="1" fill="#FF8C00" />
                <rect x="4" y="7" width="1" height="1" fill="#FF8C00" />
                <rect x="4" y="8" width="2" height="1" fill="#FF8C00" />
                <rect x="5" y="8" width="1" height="1" fill="#FF8C00" />
                <rect x="6" y="8" width="1" height="1" fill="#FF8C00" />
                <rect x="6" y="9" width="1" height="1" fill="#FF8C00" />
                <rect x="4" y="9" width="1" height="1" fill="#FF8C00" />
                <rect x="4" y="10" width="3" height="1" fill="#FF8C00" />
                
                {/* C letter - centered */}
                <rect x="8" y="6" width="3" height="1" fill="#FF8C00" />
                <rect x="8" y="7" width="1" height="1" fill="#FF8C00" />
                <rect x="8" y="8" width="1" height="1" fill="#FF8C00" />
                <rect x="8" y="9" width="1" height="1" fill="#FF8C00" />
                <rect x="8" y="10" width="3" height="1" fill="#FF8C00" />
              </g>
            </g>
          </svg>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>GC</p>
      </TooltipContent>
    </Tooltip>
  )
}

