// Import Fonts
import { Inter as FontSans } from 'next/font/google'

// Import Css styles & CN
import './globals.css'
import { cn } from '@/lib/utils'

// Import Components from Clerk
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Provider from './Provider'

const fontSans = FontSans({
   subsets: ['latin'],
   variable: '--font-sans',
})

export const metadata: Metadata = {
   title: 'LiveDocs',
   description: 'Your go-to collaborative editor',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <ClerkProvider
         appearance={{
            baseTheme: dark,
            variables: { colorPrimary: '#3371FF', fontSize: '16px' },
         }}
      >
         <html lang='en' suppressHydrationWarning>
            <body
               className={cn(
                  'min-h-screen font-sans antialiased',
                  fontSans.variable
               )}
            >
               <Provider>{children}</Provider>
            </body>
         </html>
      </ClerkProvider>
   )
}
