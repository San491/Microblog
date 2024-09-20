import style from './comments.module.css';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios.tsx';
import moment from 'moment';

const Comments = ({ post_id_comment }: any) => {

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be within AuthContextProvider, comments");
    }
    const { currentUser } = authContext;

    const { isPending, data } = useQuery({
        queryKey: ['comments', post_id_comment],
        queryFn: () => makeRequest.get("/comments?post_id_comment=" + [post_id_comment]).then((res) => {
            return res.data;
        })
    });

    const [text, setText] = useState("");
    const queryClient = useQueryClient();
    interface NewComment {
        text: string;
        post_id_comment: any;
    }
    const mutation = useMutation({
        mutationFn:
            (newComment: NewComment) => {
                return makeRequest.post("/comments", newComment)
            },

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    });

    const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutation.mutate({ text, post_id_comment })
        setText("");
    }

    return (
        <div className={style.comments_section}>
            <div className={style.write_comment}>
                <img className={style.profilePic} src={"/upload/"+currentUser.profile_picture} />
                <input className={style.commentInput}
                    type='text' placeholder='Write a comment'
                    onChange={e => setText(e.target.value)}
                    value={text} />
                <div className={style.commentBtns}>
                    <button onClick={handlePost} className={style.commentSubmit}>Submit</button>
                    <button onClick={() => setText("")} className={style.commentDiscard}>Discard</button>
                </div>
            </div>
            {isPending ? "Loading..." 
               : data?.map((comment: any) => (
                    <div className={style.comment}>
                        <img className={style.profilePic} src={"/upload/"+ comment.profile_picture} alt='' />
                        <div className={style.info}>
                            <span className={style.name}>{comment.name}</span>
                            <p className={style.desc}>{comment.text}</p>
                        </div>
                        <span className={style.timestamp}>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                ))}
        </div>
    )
}

export default Comments;