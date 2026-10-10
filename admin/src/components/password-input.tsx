'use client';
import {useState} from 'react';
import {Eye,EyeOff} from 'lucide-react';

type Props={name:string;required?:boolean;minLength?:number;autoComplete?:string;placeholder?:string};
export function PasswordInput(props:Props){const[visible,setVisible]=useState(false);return <div className="password-field"><input {...props} type={visible?'text':'password'}/><button type="button" onClick={()=>setVisible(value=>!value)} aria-label={visible?'Hide password':'Show password'} aria-pressed={visible}>{visible?<EyeOff/>:<Eye/>}</button></div>}
