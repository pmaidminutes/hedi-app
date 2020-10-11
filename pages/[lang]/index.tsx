/**
 * Static generation of language specific landing pages
 * 
 * populate available languages in getStaticPaths
 * later this function should be refactored to common, since will probably affect all our modules
 */

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ILanguageKey, ILanguageParam } from '../../common/types'

export const getStaticPaths: GetStaticPaths<ILanguageParam> = async () => {
  return {
    paths: [
      { params: { lang: 'de' } },
      { params: { lang: 'en' } },
    ],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<ILanguageKey, ILanguageParam> = async (context) => {
  return { props: { lang: context.params?.lang ?? 'de' } };
}

export default function IndexWithLanguage(props: ILanguageKey) {
  const { lang } = props;
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <main>
        <h1>
          HEDI App - {lang}
        </h1>
        <p>HEDI App index in {lang}, up and running</p>
        <nav>
          <li><a href={lang+'/search'}>search</a></li>
          <li><a href={lang+'/chat'}>chat</a></li>
        </nav>
     </main>
    </div>
  )
}
