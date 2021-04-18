import react from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';

import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.page_home}>
      <Head>
        <title>Ecoleta</title>
      </Head>
      <div className={styles.content}>
        <header>      
          <img src="/assets/logo.svg" alt="Ecoleta"/>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resídios.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <Link href="/create-point">
            <a href="/create-point">
              <span>
                <FiLogIn />
              </span>
              <strong>Cadastre um ponto de coleta</strong>
            </a>
          </Link>
        </main>
      </div>
    </div>
  )
}
