import Head from 'next/head';
import Link from 'next/link';
import styles from './styles.module.scss';

import { createClient } from '../../services/prismic';
import { RichText } from 'prismic-dom'


type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string,
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Post News</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (
                        <Link href={`/posts/${post.slug}`}>
                            <a key={post.slug}>
                                <time>{post.updatedAt}</time> 
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}<span>...</span></p>
                            </a>
                        </Link>
                    )) }
                </div>
            </main>
        </>
    );
}

export async function getStaticProps({ previewData }: { previewData: any }) {
    
    const client = createClient({ previewData })
    const response = await client.getAllByType('post')

    const posts = response.map( post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find( (content: { type: string; }) => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-Br', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        }
    }

    )
    return {
      props: {
        posts,
      },
    }
  }