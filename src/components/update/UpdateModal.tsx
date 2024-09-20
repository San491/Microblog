import { useState } from 'react'
import style from './updateModal.module.css'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const UpdateModal = ({ setOpenUpdate }: any, user: any) => {

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
            const res = await makeRequest.post("/upload", formData)
            return res.data;
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
        let coverURL = user.cover_picture;
        let profileURL = user.profile_picture;

        coverURL = coverPic ? await upload(coverPic) : coverURL;
        profileURL = profilePic ? await upload(profilePic) : profileURL;


        mutation.mutate({ ...texts, coverPic: coverURL, profilePic: profileURL })

        updated = true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexts((prev: any) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }

    return (
        <div className={style.UpdateModal}>
            Update
            <form>
                <input type='file'
                    onChange={(e) => {
                        const oneFile = e.target.files?.[0]         // making sure e.target.files is not empty before picking 0th element 
                        if (oneFile)                                 // making sure the file is not undefined before setFile        (ts)
                            setCoverPic(oneFile)
                    }} />
                <input type='file'
                    onChange={(e) => {
                        const oneFile = e.target.files?.[0]         // making sure e.target.files is not empty before picking 0th element 
                        if (oneFile)                                 // making sure the file is not undefined before setFile        (ts)
                            setProfilePic(oneFile)
                    }} />
                <input type='text' name='name' onChange={handleChange} />
                <input type='text' name='location' onChange={handleChange} />
                <input type='text' name='website' onChange={handleChange} />
                <button onClick={handleSubmit}>Update</button>
                {updated && <p style={{ color: "green", fontWeight: "bold" }}>Updated.</p>}
            </form>
            <button onClick={() => { setOpenUpdate(false); updated = false }}>X</button>
        </div>
    )

}