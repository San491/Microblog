import { useState } from 'react'
import style from './updateModal.module.css'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const UpdateModal = ({ setOpenUpdate }: any, userData : any) => {

    console.log(userData);


    const queryClient = useQueryClient();
    const [profilePic, setProfilePic] = useState<any>(null)
    const [coverPic, setCoverPic] = useState<any>(null)
    const [texts, setTexts] = useState({
        name: "",
        city: "",
        website: "",
    })
    let updated = false;

    const upload = async (file: any) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload_profile", formData)
            return res.data.fileUrl;
        }
        catch (err) {
            console.log(err);
        }
    }

    const mutation = useMutation({
        mutationFn:
            (user: any) => {
                return makeRequest.put("/user", user)
            },

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let coverURL = userData.cover_picture;
        let profileURL = userData.profile_picture;

        console.log(profileURL);
        console.log(coverURL);

        coverURL = coverPic != null ? await upload(coverPic) : userData.cover_picture;
        profileURL = profilePic != null ? await upload(profilePic) : userData.profile_picture;


        mutation.mutate({ ...texts, coverPic: coverURL, profilePic: profileURL })

        updated = true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexts((prev: any) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }

    return (
        <div className={style.UpdateModal}>
            <div className={style.wrapper}>
                <h3>Update Profile Details</h3>
                <form className={style.form}>
                    <div className={style.fileUpload}>

                        <p>Upload a profile picture</p>
                        <input type='file'
                            onChange={(e) => {
                                const oneFile = e.target.files?.[0]         // making sure e.target.files is not empty before picking 0th element 
                                if (oneFile)                                 // making sure the file is not undefined before setFile        (ts)
                                    setCoverPic(oneFile)
                            }} />


                        <p>Upload a cover picture</p>
                        <input type='file'
                            onChange={(e) => {
                                const oneFile = e.target.files?.[0]         // making sure e.target.files is not empty before picking 0th element 
                                if (oneFile)                                 // making sure the file is not undefined before setFile        (ts)
                                    setProfilePic(oneFile)
                            }} />

                    </div>
                    <input placeholder='Name' type='text' name='name' onChange={handleChange} />
                    <input placeholder='Location' type='text' name='location' onChange={handleChange} />
                    <input placeholder='Website' type='text' name='website' onChange={handleChange} />
                    <button className={style.closeBtn} onClick={handleSubmit}>Update</button>
                    {updated && <p style={{ color: "green", fontWeight: "bold" }}>Updated.</p>}
                </form>
                <button className={style.closeBtn} onClick={() => { setOpenUpdate(false); updated = false }}>X</button>
            </div>
        </div>
    )

}