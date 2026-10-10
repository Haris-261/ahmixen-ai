import type { Content } from './types';
export const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000/api';
export async function getContent():Promise<Content>{try{const r=await fetch(`${API}/homepage`,{next:{revalidate:60}});if(!r.ok)throw 0;return (await r.json()).data}catch{return {programs:[],resources:[],testimonials:[],courses:[]}}}
export async function getProgram(slug:string){const r=await fetch(`${API}/programs/${encodeURIComponent(slug)}`,{next:{revalidate:60}});if(r.status===404)return null;if(!r.ok)throw new Error('Unable to load program');return (await r.json()).data}
export async function api(path:string,init:RequestInit={}){const r=await fetch(`${API}${path}`,{...init,credentials:'include',headers:{'Content-Type':'application/json',...(init.headers||{})}});const j=await r.json().catch(()=>({message:'Request failed'}));if(!r.ok)throw new Error(j.message||'Request failed');return j.data}
