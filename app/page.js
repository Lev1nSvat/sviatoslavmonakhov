let fillerText = "Hello World "
for (let i = 0; i < 12; i++) {
  fillerText = fillerText + fillerText
  
}

export default function Home() {
  return (
    <>
    {fillerText}
    </>
  )
}