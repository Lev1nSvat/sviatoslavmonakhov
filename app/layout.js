import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="text-2xl">{children}</body>
    </html>
  )
}
