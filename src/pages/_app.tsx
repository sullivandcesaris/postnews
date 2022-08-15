import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'

import Link from 'next/link'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../services/prismic'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>

    </SessionProvider>
  )
}

export default MyApp


