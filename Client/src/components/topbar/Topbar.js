import "./topbar.css"
import SearchIcon from "@mui/icons-material/Search"
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationIcon from '@mui/icons-material/Notifications'
import {Link} from 'react-router-dom';
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { logoutCall } from "../../apiCalls"

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user, dispatch} = useContext(AuthContext);
    const HandleLogout = () =>{
        logoutCall(null, dispatch);
    }
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">Vibe</span>
            </Link>   
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <SearchIcon className="searchIcon"/>
                <input placeholder="Search for people" className="searchInput" />
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="topbarLink">Homepage</span> 
                </Link>
                <Link to="/" style={{textDecoration:"none"}}>
                    <span onClick={HandleLogout} className="topbarLink">Logout</span>
                </Link>
                
            </div>
            <div className="topbarIcons">
                <Link to="/people" className="topbarIconItem hide-on-mobile">
                    <PersonIcon />
                    <span className="topbarIconBadge">1</span>
                </Link>
                <div className="topbarIconItem hide-on-mobile">
                    <ChatIcon />
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem hide-on-mobile">
                    <NotificationIcon />
                    <span className="topbarIconBadge">3</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "DefaultProfile.jpg"} alt="" className="topbarImg" />
            </Link>
        </div>
    </div>
  )
}
