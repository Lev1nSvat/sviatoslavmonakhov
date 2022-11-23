import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="overflow-hidden">
          {children}
      </body>
    </html>
  )
}
