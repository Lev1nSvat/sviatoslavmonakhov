import "../styles/globals.css"
import "../styles/locomotive-scroll.css"

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="">
          {children}
      </body>
    </html>
  )
}
