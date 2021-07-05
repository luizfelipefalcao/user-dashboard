import React, { useState, useEffect } from 'react';
import './style.css';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import '../UserDashboard';

export default function UserDetail() {
  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [uID, setUID] = useState('1');

  const fetchDetails = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users?id=${uID}`)
      .then((res) => res.json())
      .then((json) => setUser(json))
      .then(console.log(user))
  }

  const fetchPosts = async () => {
    await fetch(`http://jsonplaceholder.typicode.com/posts?userId=${uID}`)
      .then((res) => res.json())
      .then((json) => setUserPosts(json))
      .then(console.log(userPosts))
  }

  useEffect(() => {
    fetchDetails();
    fetchPosts();
  }, []);
  return (
    <>
      {user.map((list) => (
        <div className='ud-content'>
          <div className='ud-back'>
            <BsArrowLeftShort size='1.4em' color='#333' /><Link to="/">User Dashboard</Link>
          </div>
          <div>
            <div className='ud-header-title'>
              <h2 className='ud-title-user'>Users</h2>
              {' '}
              <BsArrowRightShort size='2em' />
              {' '}
              <h2 className='ud-title-data'>{list.name}</h2>
            </div>
            <div className='ud-control'>
              <div className='ud-contact-info'>
                <span className='ud-title-card'>Contact Info</span>
                <div>Username: {list.username}</div>
                <div>Email: <a href=''>{list.email}</a></div>
                <div>Phone: <a href=''>{list.phone}</a></div>
                <div>Website: <a href=''>{list.website}</a></div>
              </div>
              <div className='ud-address'>
                <span className='ud-title-card'>Address</span>
                <div>{list.address.suite} {list.address.street}, {list.address.city}, {list.address.zipcode}</div>
              </div>
              <div className='ud-company'>
                <span className='ud-title-card'>Company</span>
                <div>{list.company.name}</div>
                <div>{list.company.bs}</div>
                <div><em>{list.company.catchPhrase}</em></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {user.map((item) => (
        <div className='ud-content'>
          <div className='ud-header-title'>
            <h2 className='ud-title-posts'>Posts by {item.name}</h2>
          </div>
        </div>
      ))}
      {userPosts.map((item) => (
        <div className='ud-control-posts'>
          <div className='ud-posts'>
            <span className='ud-title-card'>{item.title}</span>
            <div className='ud-body-card'>{item.body}</div>
          </div>
        </div>
      ))
      }
    </>
  );
};
