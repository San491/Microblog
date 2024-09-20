import { makeRequest } from '../../axios.tsx';
import Post from '../post/Post.tsx';
import style from './posts.module.css';
import { useQuery } from '@tanstack/react-query';

const Posts = ({user_id}: any) => {

  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/posts?user_id=" + [user_id]).then((res) => {
      return res.data;
    })
  });

  return (
    <div className={style.posts}>
      {error ? "Something went wrong :(" : isPending ? "Loading..." : data.map((post: any) => (
        <Post post={post} key={post.post_id} />
      ))}
    </div>
  )
}

export default Posts;