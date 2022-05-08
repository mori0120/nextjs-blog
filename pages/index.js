import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Alert from '../components/alert';
import { getSortedPostsData } from '../lib/posts';

export default function Home({allPostsData}) {
  const [type, setType] = useState("success");
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I'm Mori. I'm studying TypeScript, React, and Next.js now. This site is created for Next.js tutorial.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <Alert type={type}>
          <p>Test for alert: Push buttom and Cgit heck color</p>
          <button onClick={()=>{setType(type==='success'? 'error': 'success')}}>change color</button>
        </Alert>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}