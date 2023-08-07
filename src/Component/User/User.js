import React from 'react'
import { Avatar, Divider } from 'antd';
import "../../Css/UserCss.css"

const User = ({ user }) => {
    console.log("🚀 ~ file: User.js:5 ~ User ~ user:", user)
    return (
        <div className='user-container'>
            <div className="card-container">
                <span className="pro">PRO</span>
                <img className="round" src={user?.avt} alt="user" />
                <h3>{user?.userName}</h3>
                <h6>{user?.email}</h6>
                <p>User interface designer and <br /> front-end developer</p>
                <div className="buttons">
                    <button className="primary">
                        Message
                    </button>
                    <button className="primary ghost">
                        Following
                    </button>
                </div>
                <div className="skills">
                    <h6>Skills</h6>
                    <ul>
                        <li>UI / UX</li>
                        <li>Front End Development</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node</li>
                    </ul>
                </div>
            </div>


        </div>
    )
}

export default User