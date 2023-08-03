import "./detail.css"
import { useContext, useRef, useState, useReducer } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";
import { Cancel } from "@mui/icons-material";
import { UpdateProfilePicture } from "../../context/AuthActions";

export default function Detail() {
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const { user, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileFile, setProfileFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();
        const newDetail = {
            userId: user._id,
        };
        if (profileFile) {
            const data = new FormData();
            const profileFileName = Date.now() + profileFile.name;
            data.append("name", profileFileName);
            data.append("file", profileFile);
            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err)
            }
            newDetail.profilePicture = profileFileName;
            dispatch({type:"UPDATE_PROFILE_PICTURE", payload:profileFileName})
        }
        if (coverFile) {
            const data = new FormData();
            const coverFileName = Date.now() + coverFile.name;
            data.append("name", coverFileName);
            data.append("file", coverFile);
            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err)
            }
            newDetail.coverPicture = coverFileName;
        }

        let rel_ind = 0;
        if (relationship.current.value === "single") rel_ind = 1;
        if (relationship.current.value === "married") rel_ind = 2;
        else if (relationship.current.value === "divorced") rel_ind = 3;

        if (city.current.value != "") newDetail.city = city.current.value;
        if (from.current.value != "") newDetail.from = from.current.value;
        if (rel_ind) newDetail.relationship = rel_ind;

        try {
            const res = await axios.put('/users/' + user._id, newDetail);
            navigate(`/profile/${user.username}`);
            alert("Profile Updated.")
        } catch (error) {
            alert("Error while updating profile.")
        }

    }

    return (
        <>
            <Topbar />
            <div className="detail">
                <div className="detailWrapper">
                    <div className="detailLeft">
                        <h3 className="detailLogo">Vibe</h3>
                        <span className="detailDesc">
                            Add your details.
                        </span>
                    </div>
                    <div className="detailRight">
                        {profileFile && (
                            <div className="shareImgContainer">
                                <img className="shareImg" src={URL.createObjectURL(profileFile)} alt="" />
                                <Cancel className="shareCancelImg" onClick={() => setProfileFile(null)} />
                            </div>
                        )}
                        {coverFile && (
                            <div className="shareImgContainer">
                                <img className="shareImg" src={URL.createObjectURL(coverFile)} alt="" />
                                <Cancel className="shareCancelImg" onClick={() => setCoverFile(null)} />
                            </div>
                        )}
                        <form className="detailBox" onSubmit={handleClick}>
                            <label htmlFor="profileFile" className="shareOption">
                                <PermMediaIcon className="shareIcon" />
                                <span className="shareOptionText">Update Profile Picture</span>
                                <input style={{ display: "none" }} type="file" id="profileFile" accept=".png,.jpg,.jpeg" onChange={(e) => setProfileFile(e.target.files[0])} />
                            </label>
                            <label htmlFor="coverFile" className="shareOption">
                                <PermMediaIcon className="shareIcon" />
                                <span className="shareOptionText">Update Cover Picture</span>
                                <input style={{ display: "none" }} type="file" id="coverFile" accept=".png,.jpg,.jpeg" onChange={(e) => setCoverFile(e.target.files[0])} />
                            </label>
                            <input placeholder="City" ref={city} className="detailInput" />
                            <input placeholder="From" ref={from} className="detailInput" />
                            <select id="relationship" name="relationship" ref={relationship} className="detailInput">
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                            </select>
                            <button className="detailButton" type="submit">Add details</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
