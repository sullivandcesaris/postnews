import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Post News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about <br /> the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export default Home
