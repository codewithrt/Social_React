import "./post.css";
import { useState, useEffect, useContext } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post, deletePost }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const deleteHandler = async () => {
    try {
      if (window.confirm("Are you sure to delete this post")) {
        await axios.delete("/posts/" + post._id, { data: { userId: currentUser._id } });
        deletePost(post._id);
      }
    } catch (err) { }

  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "Person/2.jpeg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <button onClick={toggleDropdown}>
              <MoreVertIcon />
            </button>
            {currentUser._id == post.userId && isDropdownOpen && (
              <div className="dropdown-content">
                <button onClick={deleteHandler}>Delete Post</button>
              </div>
            )}

          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? <FavoriteIcon className="likeIcon" onClick={likeHandler} /> : <FavoriteBorderIcon className="likeIcon" onClick={likeHandler} />}
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
