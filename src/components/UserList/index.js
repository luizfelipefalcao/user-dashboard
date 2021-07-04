import React, { useState, useEffect } from 'react';
import './style.css';
import { IoPersonCircleSharp } from "react-icons/io5";

export default function UserList() {
    const [data, setData] = useState([]);
    const [uID, setUID] = useState();
    const [uName, setUName] = useState();
    const [uUserName, setUUserName] = useState();
    const [uUserEmail, setUUserEmail] = useState();

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users?userId=${uID}`)
            .then((res) => res.json())
            .then((json) => setData(json))
            .then(console.log(data));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='u-content'>
            <div className='u-header'>
                <h2 className='u-title'>Users</h2>
                <div className='u-control'>
                    <div className='u-search'>
                        <label>Search</label>
                        <input
                            type='text'
                            value={uID}
                            onChange={(e) => setUID(e.target.value)}
                        />
                    </div>
                    <div className='u-sort'>
                        <label>Sort By</label>
                        <select className="u-sort-by" >
                            <option value={uName}>Name</option>
                            <option value={uUserName}>Username</option>
                            <option value={uUserEmail}>Email</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='u-list'>
                {
                    data.map((item) => (
                        <div key={item.id} className='u-profile'>
                            <div className='u-profile-name'>
                                <div className='u-profile-photo'><IoPersonCircleSharp /></div>
                                <div className='u-profile-username'>
                                    <div>{item.name}</div>
                                    <div>{item.username}</div>
                                </div>
                            </div>
                            <div className='u-profile-email'><a href={item.email}>{item.email}</a></div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}