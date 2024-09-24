import Posts from '../../components/posts/Posts';
import Stories from '../../components/stories/Stories';
import style from './homePage.module.css'
import Share from './../../components/share/Share';

const HomePage = () => {
    return (
        <div className={style.home}>
            <Stories/>
            <Share/>
            <Posts/>
        </div>

    );
}


export default HomePage;