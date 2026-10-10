import {Header} from '@/components/header';import {Hero} from '@/components/hero';import {HomeSections} from '@/components/sections';import {Footer} from '@/components/footer';import {getContent} from '@/lib/api';
export default async function Home(){const content=await getContent();return <main><Header/><Hero/><HomeSections content={content}/><Footer/></main>}
