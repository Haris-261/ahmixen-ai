import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import './media.css';
const inter=Inter({subsets:['latin'],variable:'--font-body'});const display=Manrope({subsets:['latin'],variable:'--font-display'});
export const metadata:Metadata={title:'Ahmixen AI — Learn. Build. Launch.',description:"Asia's next-generation AI learning and startup platform.",openGraph:{title:'Ahmixen AI',description:'Practical AI education for builders and founders.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${inter.variable} ${display.variable}`}>{children}<Toaster theme="dark" richColors/></body></html>}
