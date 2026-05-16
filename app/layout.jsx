export const metadata = {
  title: 'Fake Real Detect',
  description: 'AI thlalak REAL nge FAKE check na',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
