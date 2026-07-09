/// <reference types="vite/client" />

// Allow importing SVG files as URLs
declare module '*.svg' {
  const src: string
  export default src
}

// Allow importing PNG/JPEG/WEBP as URLs
declare module '*.png' {
  const src: string
  export default src
}
