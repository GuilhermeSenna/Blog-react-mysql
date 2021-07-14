import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import './App.css'

function MainPage() {

    const [postList, setPostList] = useState([]);

    let history = useHistory();

    useEffect(() => {
        Axios.get("http://localhost:3002/api/get").then((data) => {
            setPostList(data.data)
        });
    }, [])

    function LikePost(id, username) {
        Axios.post(`http://localhost:3002/api/like/${id}`).then((response) => {
            // Doenst work
            alert("you liked a post")
        });

        // if (!alert(`Você curtiu a publicação de ${username}`)) { window.location.reload(); }
    }
    return (
        <div className="MainPage">
            <div className="PostContainer">
                <h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>Posts</h1>
                {postList.map((val, key) => {
                    return (

                        <div className="Post" key={key}>
                            <h1 className="post-title" onClick={() => (history.push(`/post/${val.ID}`))}>{val.title}</h1>
                            <p>{val.post_text.length > 300 ? val.post_text.substring(0, 300) + " ..." : val.post_text}</p>
                            <h4>- {val.user_name}</h4>
                            <button className="like_btn" onClick={(() => LikePost(val.ID, val.user_name))}>Like</button>

                            <h5>Likes: {val.likes}</h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPage