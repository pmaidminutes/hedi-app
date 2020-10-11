import Head from 'next/head'

export default function Index() {
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <main>
        <h1>
          HEDI App
        </h1>
        <p>HEDI App index, up and running</p>
        <nav>
          choose your language
          <li><a href="de">Deutsch</a></li>
          <li><a href="en">English</a></li>
        </nav>
     </main>
    </div>
  )
}