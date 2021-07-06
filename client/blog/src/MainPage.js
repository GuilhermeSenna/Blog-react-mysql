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

    const LikePost = (id) => {
        alert("you liked a post")
        Axios.post(`http://localhost:3002/api/like/${id}`).then((response) => {
            console.log(response)
            alert("you liked a post")
            console.log("Laikei")
        })
    }
    return (
        <div className="MainPage">
            <div className="PostContainer">
                {postList.map((val, key) => {
                    return (
                        <div className="Post" key={key}>
                            <h1 className="post-title" onClick={() => (history.push(`/post/${key + 1}`))}>{val.title}</h1>
                            <p>{val.post_text.length > 300 ? val.post_text.substring(0, 300) + " ..." : val.post_text}</p>
                            <h4>{val.user_name}</h4>
                            <button className="like_btn" onClick={(() => LikePost(key + 1))}>Like</button>

                            <h5>Likes: {val.likes}</h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPage