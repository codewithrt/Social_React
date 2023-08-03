import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Cancel } from "@mui/icons-material";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) =>{
    e.preventDefault();
    const newPost = {
        userId: user._id,
        desc: desc.current.value,
    };
    if(file){
      const data = new FormData();
      const fileName = Date.now()  + file.name;
      data.append("name", fileName);
      data.append("file", file);     
      console.log(data);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data)
      } catch (err) {
        console.log(err)
      }
    }
    try {
       await axios.post("/posts", newPost);
       window.location.reload(); 
    } catch (err) {
        
    }
  }

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className = "shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "DefaultProfile.jpg"} alt="" />
                <input placeholder={"What's in your mind " + user.username + "?"} className="shareInput" ref={desc}/>
                
            </div>
            <hr className="shareHr"/>
            {file && (
              <div className="shareImgContainer">
                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
              </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMediaIcon className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display: "none"}} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <AlternateEmailIcon className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <LocationOnIcon className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotionsIcon className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
