import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsArrowRightShort } from 'react-icons/bs';


export default function UserDashboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortByFiltered, setByFiltered] = useState([]);

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => res.json())
            .then((json) => setUsers(json))
            .then(console.log(users))
            .then(setLoading(false))
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter((usersItem) =>
                usersItem.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const handleSortBy = (e) => {
        setSortBy(e.target.value);
        console.log(sortBy);
    }

    // useEffect(() => {
    //     setSortBy(
    //         users.filter((sortedItem) => {
    //             sortedItem.sortBy.includes(sortBy)
    //         })
    //     );
    // }, [users, sortBy]);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    return (
        <div className='u-content'>
            <div className='u-header'>
                <h2 className='u-title'>Users</h2>
                <div className='u-control'>
                    <div className='u-search'>
                        <label>Search</label>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='u-sort'>
                        <label>Sort By</label>
                        <select className="u-sort-by" onChange={handleSortBy}>
                            <option value='Name'>Name</option>
                            <option value='Username'>Username</option>
                            <option value='Email'>Email</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                search === '' && sortBy === '' ? (
                    <>
                        <div className='u-list'>
                            {users.map((list, id) => (
                                <UserList key={id} {...list} />
                            ))}
                        </div>
                    </>
                ) : search === '' && sortBy !== '' ? (
                    <>
                        {sortByFiltered.map((item, id) => (
                            <SortByFiltered key={id} {...item} />
                        ))}
                    </>
                ) : (
                    <>
                        {filteredUsers.map((item, id) => (
                            <UserListFiltered key={id} {...item} />
                        ))}
                    </>
                )
            }

        </div>
    );
}

const UserListFiltered = (props) => {
    const { name, email, username } = props;

    return (
        <>
            <div className='u-header-detail'>
                <div className='u-profile'>
                    <div className='u-profile-name'>
                        <div className='u-profile-photo'><IoPersonCircleSharp /></div>
                        <div className='u-profile-username'>
                            <div>{name}</div>
                            <div>{username}</div>
                        </div>
                    </div>
                    <div className='u-profile-email'><a href=''>{email}</a></div>
                </div>
                <div className='u-profile-details'>
                    <Link to="/user-details">User Details</Link><BsArrowRightShort size='1.2em' color='#333' />
                </div>
            </div>
        </>
    );
};

const SortByFiltered = (props) => {
    const { name, email, username } = props;

    return (
        <>
            <div className='u-header-detail'>
                <div className='u-profile'>
                    <div className='u-profile-name'>
                        <div className='u-profile-photo'><IoPersonCircleSharp /></div>
                        <div className='u-profile-username'>
                            <div>{name}</div>
                            <div>{username}</div>
                        </div>
                    </div>
                    <div className='u-profile-email'><a href=''>{email}</a></div>
                </div>
                <div className='u-profile-details'>
                    <Link to="/user-details">User Details</Link><BsArrowRightShort size='1.2em' color='#333' />
                </div>
            </div>
        </>
    );
};

const UserList = (props) => {
    const { name, email, username } = props;

    return (
        <>
            <div className='u-header-detail'>
                <div className='u-profile'>
                    <div className='u-profile-name'>
                        <div className='u-profile-photo'><IoPersonCircleSharp /></div>
                        <div className='u-profile-username'>
                            <div>{name}</div>
                            <div>{username}</div>
                        </div>
                    </div>
                    <div className='u-profile-email'><a href=''>{email}</a></div>
                </div>
                <div className='u-profile-details' id={props.id}>
                    <Link to="/user-details">User Details</Link><BsArrowRightShort size='1.2em' color='#222' />
                </div>
            </div>
        </>
    );
};