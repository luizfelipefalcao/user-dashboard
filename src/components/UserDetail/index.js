import React, { useState, useEffect } from "react";
import "./style.css";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

import "../UserDashboard";

export default function UserDetail() {
  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      await fetch(`https://jsonplaceholder.typicode.com/users?id=1`)
        .then((res) => res.json())
        .then((json) => setUser(json))
        .then(console.log(user));
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch(`http://jsonplaceholder.typicode.com/posts?userId=1`)
        .then((res) => res.json())
        .then((json) => setUserPosts(json))
        .then(console.log(userPosts));
    };
    fetchPosts();
  }, []);

  return (
    <>
      {user.map((list) => (
        <div className="ud-content" key={list.id}>
          <div>
            <div className="ud-header-title">
              <h2 className="ud-title-user"><Link to="/">User</Link></h2>{" "}
              <BsArrowRightShort size="2em" />{" "}
              <h2 className="ud-title-data">{list.name}</h2>
            </div>
            <div className="ud-control">
              <div className="ud-contact-info">
                <span className="ud-title-card">Contact Info</span>
                <div>Username: {list.username}</div>
                <div>
                  Name: <Link to="">{list.name}</Link>
                </div>
                <div>
                  Phone: <Link to="">{list.phone}</Link>
                </div>
                <div>
                  Website: <Link to="">{list.website}</Link>
                </div>
              </div>
              <div className="ud-address">
                <span className="ud-title-card">Address</span>
                <div>
                  {list.address.suite} {list.address.street},{" "}
                  {list.address.city}, {list.address.zipcode}
                </div>
              </div>
              <div className="ud-company">
                <span className="ud-title-card">Company</span>
                <div>{list.company.name}</div>
                <div>{list.company.bs}</div>
                <div>
                  <em>{list.company.catchPhrase}</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {user.map((item) => (
        <div className="ud-content" key={item.id}>
          <div className="ud-header-title">
            <h2 className="ud-header-posts">Posts by {item.name}</h2>
          </div>
        </div>
      ))}
      {userPosts.map((item) => (
        <div className="ud-control-posts" key={item.id}>
          <div className="ud-card-posts">
            <span className="ud-title-posts">{item.title}</span>
            <div className="ud-body-posts">{item.body}</div>
          </div>
        </div>
      ))}
    </>
  );
}
