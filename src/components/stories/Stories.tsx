import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import style from './stories.module.css';

const Stories = () => {

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be within AuthContextProvider, stories");
  }
  const { currentUser } = authContext;

  //TEMPORARY PLACEHOLDERS
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className={style.stories}>
      {/* Current User Temporary */}
      <div className={style.story}>
        <img src={"/upload/"+currentUser.profile_picture} alt="Profile Picture" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map(story => (
        <div className={style.story} key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories;