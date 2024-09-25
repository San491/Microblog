import style from "./profile.module.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { UpdateModal } from "../../components/update/UpdateModal";

const ProfilePage = () => {

  const [openUpdate, setOpenUpdate] = useState(false);

  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext null type check needs to be handled, profilepage");
  const { currentUser } = authContext;

  const user_id = useLocation().pathname.split("/")[2];

  // GET USER ID QUERY
  const { isPending, data } = useQuery({
    queryKey: ['user'],
    queryFn: () => makeRequest.get("/user/find/" + [user_id]).then((res) => {
      return res.data;
    })
  });

  // GET RELATIONSHIP DATA QUERY
  const { isPending: relIsLoading, data: relationshipData } = useQuery({
    queryKey: ['relationships'],
    queryFn: () => makeRequest.get("/relationships?followed_userid=" + [user_id]).then((res) => {
      return res.data;
    })
  });


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:
      (isFollowing: boolean) => {
        if (isFollowing) {
          return makeRequest.delete("/relationships?profile_userId=" + user_id);
        }
        return makeRequest.post("/relationships", { profile_userId: user_id });
      },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['relationships'] })
    },
  });


  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate(relationshipData?.includes(currentUser.user_id));
  }



  return (
    <div className={style.profile}>
      {isPending ? "Loading..." :
        <>
          <div className={style.images}>
            <img
              className={style.coverPic}
              src={"/upload/" + data?.cover_picture}
            />
            <div className={style.profilePicContainer}>
              <img
                className={style.profilePic}
                src={data?.profile_picture}
              />
            </div>
          </div>
          <div className={style.profileContainer}>
            <div className={style.userInfo}>
              <div className={style.left}>
                <a className={style.socialLinks} href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a className={style.socialLinks} href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a className={style.socialLinks} href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a className={style.socialLinks} href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a className={style.socialLinks} href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className={style.center}>
                <span className={style.name}>{data?.name}</span>
                <div className={style.info}>
                  <div className={style.item}>
                    <PlaceIcon />
                    <span className={style.itemText}>{data?.location}</span>
                  </div>
                  <div className={style.item}>
                    <LanguageIcon />
                    <span className={style.itemText}>{data?.website}</span>
                  </div>
                </div>
                <div className={style.buttons}>
                  {relIsLoading ? "Loading..."
                    : (data?.user_id === currentUser.user_id
                      ? (<button className={style.followBtn}
                        onClick={() => setOpenUpdate(true)}>Update</button>)
                      : <button className={style.followBtn}
                        onClick={handleFollow}>
                        {relationshipData.includes(currentUser.user_id) ? "Following" : "Follow"}
                      </button>)}
                </div>
              </div>
              <div className={style.right}>
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts user_id={user_id} />
          </div>
        </>
      }
      {openUpdate && <UpdateModal setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default ProfilePage;
