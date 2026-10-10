import type {Metadata} from 'next';
import {Inter,Manrope} from 'next/font/google';
import {Toaster} from 'sonner';
import {AdminShell} from '@/components/admin/admin-shell';
import './admin.css';
import './base.css';
import './program-editor.css';
import './structured-editor.css';

const inter=Inter({subsets:['latin'],variable:'--font-body'});
const display=Manrope({subsets:['latin'],variable:'--font-display'});
export const metadata:Metadata={title:'Ahmixen AI Admin',description:'Secure Ahmixen AI content administration'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${inter.variable} ${display.variable}`}><AdminShell>{children}</AdminShell><Toaster theme="dark" richColors/></body></html>}
