import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components'
import {getPosts} from '../services'
import {FeaturedPosts } from '../sections'
// const post = [
//   { title: 'React Testing', excerpt: 'learn React Testing' },
//   { title: 'React with Tailwind ', excerpt: 'learn React with Tailwind' },
// ]

const Home = (props) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {props.posts.map((post) => (
            <PostCard post={post.node} key={post.node.slug} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
export async function getStaticProps () {
  const posts = (await getPosts()) || []
  // console.log(posts)
  return {
    props: {posts}
  }
}