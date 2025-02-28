import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from '../components/theme-provider'
import { ResponsiveBackground } from '../components/ui/responsive-background'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Ask Vipassana - Meditation Guidance',
  description: 'Access authentic Vipassana Buddhist wisdom through mindful conversation',
  icons: {
    icon: '/logo.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <script defer data-domain="askvipassana.com" src="https://plausible.z3n.sh/js/script.js"></script>
        <script defer src="https://cdn.lordicon.com/lordicon.js"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background no-page-scroll`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResponsiveBackground
            overlayOpacity={0.7}
            enableParallax={true}
            blurAmount={0}
            backgroundColor="#cf986e"
          >
            {children}
          </ResponsiveBackground>
        </ThemeProvider>
      </body>
    </html>
  )
}
