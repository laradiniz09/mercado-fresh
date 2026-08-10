import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function MapPinIcon({ className, ...props }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <g clipPath="url(#clip-map-pin)">
        <path d="M15.75 7.50012C15.75 12.7497 9 17.2494 9 17.2494C9 17.2494 2.25 12.7497 2.25 7.50012C2.25 5.71004 2.96116 3.99327 4.22703 2.7275C5.4929 1.46172 7.20979 0.75061 9 0.75061C10.7902 0.75061 12.5071 1.46172 13.773 2.7275C15.0388 3.99327 15.75 5.71004 15.75 7.50012Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9.75061C10.2426 9.75061 11.25 8.74325 11.25 7.50061C11.25 6.25797 10.2426 5.25061 9 5.25061C7.75736 5.25061 6.75 6.25797 6.75 7.50061C6.75 8.74325 7.75736 9.75061 9 9.75061Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <defs>
        <clipPath id="clip-map-pin">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export function BellIcon({ className, ...props }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M16 8.125C16 6.46739 15.3415 4.87768 14.1694 3.70558C12.9973 2.53348 11.4076 1.875 9.75 1.875C8.09239 1.875 6.50268 2.53348 5.33058 3.70558C4.15848 4.87768 3.5 6.46739 3.5 8.125C3.5 14.6875 1 16.25 1 16.25H18.5C18.5 16.25 16 14.6875 16 8.125Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.08 19.25C10.9046 19.553 10.6523 19.8044 10.3486 19.9792C10.045 20.154 9.70082 20.246 9.35 20.246C8.99918 20.246 8.65498 20.154 8.35136 19.9792C8.04775 19.8044 7.79535 19.553 7.62 19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function SearchIcon({ className, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.85 19.85L15.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function BackArrowIcon({ className, ...props }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function TrashIcon({ className, ...props }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M15.8333 4.99958V16.6672C15.8333 17.1092 15.6577 17.5332 15.3452 17.8458C15.0326 18.1584 14.6087 18.334 14.1667 18.334H5.83333C5.39131 18.334 4.96738 18.1584 4.65482 17.8458C4.34226 17.5332 4.16667 17.1092 4.16667 16.6672V4.99958M2.5 4.99958H17.5M6.66667 4.99958V3.33279C6.66667 2.89072 6.84226 2.46677 7.15482 2.15418C7.46738 1.84159 7.89131 1.66599 8.33333 1.66599H11.6667C12.1087 1.66599 12.5326 1.84159 12.8452 2.15418C13.1577 2.46677 13.3333 2.89072 13.3333 3.33279V4.99958" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M26.6657 8L12.0005 22.6656L5.33447 15.9994" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

export function InfoIcon({ className, ...props }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00001C14.6666 4.31811 11.6818 1.33334 7.99992 1.33334C4.31802 1.33334 1.33325 4.31811 1.33325 8.00001C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10.6667V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 5.33334H8.00667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function HouseIcon({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M3 9.5L12 3l9 6.5V21H15v-6H9v6H3V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

export function BookmarkIcon({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

export function UserIcon({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function PixIcon({ className, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M7.5 7.5L12 3L16.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 16.5L12 21L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12L7.5 7.5L12 12L7.5 16.5L3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 12L16.5 7.5L12 12L16.5 16.5L21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

export function CreditCardIcon({ className, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 15H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function MealVoucherIcon({ className, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M12 3C9.25 3 7 5.25 7 8C7 9.86 8.04 11.48 9.57 12.35C8.62 12.78 7.78 13.42 7.13 14.24C6.41 15.14 6 16.27 6 17.5C6 18.33 6.67 19 7.5 19H16.5C17.33 19 18 18.33 18 17.5C18 16.27 17.59 15.14 16.87 14.24C16.22 13.42 15.38 12.78 14.43 12.35C15.96 11.48 17 9.86 17 8C17 5.25 14.75 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function ShoppingCartIcon({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <path
        d="M2.73279 2.73279H5.39946L8.94612 19.2936C9.07623 19.9001 9.41368 20.4423 9.9004 20.8268C10.3871 21.2114 10.9927 21.4142 11.6128 21.4004H24.6528C25.2597 21.3994 25.8481 21.1914 26.3208 20.8108C26.7935 20.4302 27.1223 19.8997 27.2528 19.307L29.4528 9.39979H6.82612M11.9997 28.001C11.9997 28.7374 11.4028 29.3344 10.6664 29.3344C9.93 29.3344 9.33305 28.7374 9.33305 28.001C9.33305 27.2646 9.93 26.6676 10.6664 26.6676C11.4028 26.6676 11.9997 27.2646 11.9997 28.001ZM26.6664 28.001C26.6664 28.7374 26.0694 29.3344 25.333 29.3344C24.5967 29.3344 23.9997 28.7374 23.9997 28.001C23.9997 27.2646 24.5967 26.6676 25.333 26.6676C26.0694 26.6676 26.6664 27.2646 26.6664 28.001Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
