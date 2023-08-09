"use client";
import { StoreProvider } from "@store/storeProvider";
import Header from './components/Header'
import Footer from './components/Footer'
import type { Metadata } from 'next'
import './globals.scss'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tutor Seekers',
  description: 'Connecting students with tutors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
      {/* <body>{children}</body> */}
    </html>
  )
}
