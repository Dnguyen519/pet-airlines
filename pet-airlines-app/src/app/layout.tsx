import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pet Airlines - International Pet Transportation',
  description: 'Professional door-to-door pet transportation services worldwide. Safe, reliable, and stress-free travel for your furry family members.',
  keywords: 'pet transportation, international pet travel, pet relocation, pet airline, pet shipping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}