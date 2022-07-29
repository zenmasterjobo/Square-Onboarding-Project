import Head from 'next/head'

import Container from 'react-bootstrap/Container'

type Props = {
    title?: string
    link?: string
    children?: JSX.Element | JSX.Element[]
}

export default function Layout({ title, children }: Props) {
    return <Container className='px-0'>
        <Head>
            <title>{title}</title>
            <link rel='icon' href='/favicon.ico'/>    
        </Head>
        {children}
        </Container>
}