import style from './post.module.css';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useState } from 'react';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

const Post = (props: any) => {

    const { data } = useQuery({
        queryKey: ['likes', props.post.post_id],
        queryFn: () => makeRequest.get("/likes?post_id_like=" + [props.post.post_id]).then((res) => {
            return res.data;
        })
    });

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be within AuthContextProvider, Post");
    }
    const { currentUser } = authContext;
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const liked = () => {
        if (data != undefined && data[data.indexOf(currentUser.user_id)] == currentUser.user_id) {
            return true;
        }
        else
            return false;
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:
            (isLiked: boolean) => {
                if (isLiked) {
                    return makeRequest.delete("/likes?post_id_like=" + props.post.post_id);
                }
                return makeRequest.post("/likes", { post_id_like: props.post.post_id });
            },

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['likes'] })
        },
    });


    const updateLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        mutation.mutate(liked());

    }

    const deleteMutation = useMutation({
        mutationFn:
            (postId) => {
                return makeRequest.delete("/posts/" + postId);
            },

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    });
    const handleDelete = () => {
        deleteMutation.mutate(props.post.post_id)
    }

    const likeNumber = () => {
        if (data != undefined)
            return data.length;
        else
            return 0;
    }


    return (
        <div className={style.post}>
            <div className={style.container}>
                <div className={style.user}>
                    {/* User */}
                    <div className={style.userInfo}>
                        {/* User Info & Image */}
                        <img className={style.profileImg} src={props.post.profile_picture} alt='' />
                        <div className={style.details}>
                            {/* Name linking to user profile */}
                            <Link to={`/profile/${props.post.user_id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: "500" }}>
                                <span>{props.post.name}</span>
                            </Link>
                            <span className={style.timestamp}>{moment(props.post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon className={style.menuIcon} onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && props.post.user_id_post == currentUser.user_id &&
                    <div className={style.postMenu}>
                        <button className={style.deleteBtn} onClick={handleDelete}>Delete</button>
                    </div>}
                </div>
                <div className={style.content}>
                    <p className={style.postDesc}>{props.post.caption}</p>
                    {props.post.image && <img className={style.postImg} src={`${props.post.image}`} alt='' />}
                </div>
                <div className={style.info}>
                    {/* LIKE UPDATION */}
                    <div className={style.item}
                        onClick={updateLike}>

                        {liked() ? (<FavoriteOutlinedIcon style={{ color: "#e84343" }} />) :
                            (<FavoriteBorderOutlinedIcon />)}
                        {likeNumber()} Likes
                    </div>
                    <div className={style.item} onClick={() => setCommentsOpen(!commentsOpen)}>
                        <TextsmsOutlinedIcon />
                        6 Comments
                    </div>
                    <div className={style.item}>
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentsOpen && <Comments post_id_comment={props.post.post_id} />}
            </div>
        </div>
    )
}

export default Post;