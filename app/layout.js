import "../styles/globals.css"

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
