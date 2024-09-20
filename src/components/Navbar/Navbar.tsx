import style from './navbar.module.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';;
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { AuthContext } from '../../context/authContext.tsx';
import { useContext } from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => {

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be within AuthContextProvider, navbar");
    }
    const { currentUser } = authContext;

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
                <div className={style.user}>
                    <img className={style.userImage} src={"/upload/"+currentUser.profile_picture} alt="" />
                    <span className={style.userName}>{currentUser.name}</span>
                </div>
            </div>
        </div>

    )
}

export default Navbar;