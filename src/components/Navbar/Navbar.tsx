import style from './navbar.module.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';;
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios.tsx';

const Navbar = () => {

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be within AuthContextProvider, navbar");
    }
    const { currentUser } = authContext;
    const [toggleMenu, setToggleMenu] = useState(false);
    const navigate = useNavigate();



    const mutation = useMutation({
        mutationFn: () => {
            return makeRequest.post("/auth/logout")
        },
        onSuccess: () => {
            navigate("/login")
            sessionStorage.clear();
        },
    })

    const handleLogout = () => {
        mutation.mutate();
    }

    return (

        <div className={style.navbar}>
            <div className={style.left}>
                <Link to='/' style={{ textDecoration: "none" }}>
                    <span className={style.logo}>microblog</span>
                </Link>
                <HomeOutlinedIcon />
                <DarkModeOutlinedIcon />
                <GridViewOutlinedIcon />
                <div className={style.search}>
                    <SearchOutlinedIcon />
                    <input className={style.input} placeholder='Search'></input>
                </div>
            </div>
            <div className={style.right}>
                <Person2OutlinedIcon />
                <MailOutlineOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className={style.user} onClick={() => { setToggleMenu(!toggleMenu) }}>
                    <img className={style.userImage} src={currentUser.profile_picture} alt="" />
                    <span className={style.userName}>{currentUser.name}</span>
                </div>
                {
                    toggleMenu &&
                    <div className={style.userMenu}>
                        <Link to={`/profile/${currentUser.user_id}`}>
                            <button className={style.goProfile} onClick={() => { setToggleMenu(!toggleMenu) }}>Go to profile</button>
                        </Link>
                        <button className={style.logout} onClick={handleLogout}>Log Out</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;