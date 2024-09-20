import style from './rightBar.module.css';

function RightBar() {
    return (
        <div className={style.rightBar}>
            <div className={style.container}>
                <div className={style.box}>
                    <span className={style.subSection}>Suggestions for you</span>
                    <div className={style.user}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                        <div className={style.buttons}>
                            <button className={style.follow}>Follow</button>
                            <button className={style.dismiss}>Dismiss</button>
                        </div>
                    </div>
                    <div className={style.user}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                        <div className={style.buttons}>
                            <button className={style.follow}>Follow</button>
                            <button className={style.dismiss}>Dismiss</button>
                        </div>
                    </div>
                </div>
                <div className={style.box}>
                    <span className={style.subSection}>Latest Activities</span>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <p className={style.description}>
                                <span className={style.userName}>Jane Doe</span> changed their profile picture
                            </p>
                        </div>
                        <span className={style.timeAgo}>1 min ago</span>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <p className={style.description}>
                                <span className={style.userName}>Jane Doe</span> liked a comment
                            </p>
                        </div>
                        <span className={style.timeAgo}>1 min ago</span>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <p className={style.description}>
                                <span className={style.userName}>Jane Doe</span> posted
                            </p>
                        </div>
                        <span className={style.timeAgo}>1 min ago</span>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <p className={style.description}>
                                <span className={style.userName}>Jane Doe</span> liked a post
                            </p>
                        </div>
                        <span className={style.timeAgo}>1 min ago</span>
                    </div>
                </div>
                <div className={style.box}>
                    <span className={style.subSection}>Online Friends</span>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <div className={style.online}></div>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <div className={style.online}></div>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <div className={style.online}></div>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <div className={style.online}></div>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <div className={style.online}></div>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                    </div>
                    <div className={style.activity}>
                        <div className={style.userInfo}>
                            <img className={style.userImage} src='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
                            <div className={style.online}></div>
                            <span className={style.userName}>Jane Doe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar;