import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const People = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userList = await axios.get("/users/all");
                setUsers(userList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();
    }, []);

    return (
        <>
            <Topbar />
            <h1>People on Vibe</h1>
            <div className="rightbarFollowings">

                {users.map((user) => (
                    <Link
                        to={`/profile/${user.username}`}
                        style={{ textDecoration: "none" }}
                    >
                        <div className="rightbarFollowing">
                            <img
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "Person/2.jpeg"
                                }
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName" >{user.username}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default People;