// Type definitions for CSS modules
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '@/styles/globals.css'
