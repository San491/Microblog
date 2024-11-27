import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import style from './share.module.css';
import Image from '../../assets/img.png';
import Place from '../../assets/map.png';
import Friends from '../../assets/friend.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';



const Share = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be within AuthContextProvider, navbar");
    } const { currentUser } = authContext;

    const [caption, setCaption] = useState("");
    const [file, setFile] = useState<any>(null);
    const queryClient = useQueryClient();


    interface NewPost {
        caption: string;
        image?: string;
    }

    const mutation = useMutation({
        mutationFn:
            (newPost: NewPost) => {
                return makeRequest.post("/posts", newPost)
            },

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    });

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData)
            console.log(res.data.fileUrl);
            return res.data.fileUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    // const upload = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const res = await axios.post("https://upload.imagekit.io/api/v2/files/upload", formData)
    //         return res.data;
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        if (file != null || caption != "") mutation.mutate({ caption, image: imgUrl })
        setCaption("");
        setFile(null);
    }



    return (
        <div className={style.share}>
            <div className={style.container}>
                <div className={style.topHalf}>
                    <div className={style.leftTop}>

                        <div className={style.user}>
                            <img className={style.profileImg} src={currentUser.profile_picture} />
                        </div>
                        <input type='textarea' className={style.input}
                            placeholder={`What's on your mind, ${currentUser.name}?`}
                            onChange={(e) => { setCaption(e.target.value) }}
                            value={caption} />
                    </div>
                    <div className={style.rightTop}>
                        {file && <img className={style.shareImage} src={URL.createObjectURL(file)} />}
                    </div>
                </div>
                <hr />
                <div className={style.bottomHalf}>
                    <div className={style.leftBottom}>
                        <input type='file' id='file' style={{ display: "none" }}
                            onChange={(e) => {
                                const oneFile = e.target.files?.[0]         // making sure e.target.files is not empty before picking 0th element 
                                if (oneFile)                                 // making sure the file is not undefined before setFile        (ts)
                                    setFile(oneFile)
                            }} />

                        <label htmlFor='file'>
                            <div className={style.item}>
                                <img className={style.image} src={Image} />

                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className={style.item}>
                            <img className={style.image} src={Place} />
                            <span>Add Place</span>
                        </div>
                        <div className={style.item}>
                            <img className={style.image} src={Friends} />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className={style.rightBottom}>
                        <button onClick={handlePost} className={style.shareBtn}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Share;