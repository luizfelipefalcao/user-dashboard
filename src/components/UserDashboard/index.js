import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortByFilter, setSortByFilter] = useState([]);

  const handleSort = (e) => {
    setSearch("");
    setSortBy(e.target.value);
  };

  const fetchData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .then(console.log(users))
      .then(setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    console.log(users);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((usersItem) =>
        usersItem.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  useEffect(() => {
    setSortByFilter(
      users.filter((usersItem) =>
        usersItem.username.toLowerCase().includes(search.toLowerCase())
      )
    );
    console.log(sortBy);
  }, [sortBy, users]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="u-content">
      <div className="u-header">
        <h2 className="u-title">Users</h2>
        <div className="u-control">
          <div className="u-search">
            <label>Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="u-sort">
            <label>Sort By</label>
            <select className="u-sort-by" value={sortBy} onChange={handleSort}>
              <option value="Name">Name</option>
              <option value="Username">Username</option>
              <option value="Email">Email</option>
            </select>
          </div>
        </div>
      </div>
      {search === "" && sortBy === "" ? (
        <>
          <div className="u-list">
            {users.map((list, id) => (
              <UserList key={id} {...list} />
            ))}
          </div>
        </>
      ) : search !== "" || sortBy === "" ? (
        <>
          {filteredUsers.map((item, id) => (
            <UserListFiltered key={id} {...item} />
          ))}
        </>
      ) : search === "" || sortBy !== "" ? (
        <>
          {sortByFilter.map((item, id) => (
            <>
              {sortBy === "Name" ? (
                <SortByName key={id} {...item} />
              ) : sortBy === "Email" ? (
                <SortByEmail key={id} {...item} />
              ) : sortBy === "Username" ? (
                <SortByUsername key={id} {...item} />
              ) : null}
            </>
          ))}
        </>
      ) : null}
    </div>
  );
}

const UserList = (props) => {
  const { name, email, username } = props;

  return (
    <>
      <div className="u-header-detail">
        <div className="u-profile">
          <div className="u-profile-name">
            <div className="u-profile-photo">
              <IoPersonCircleSharp />
            </div>
            <div className="u-profile-username">
              <div>{name}</div>
              <div>{username}</div>
            </div>
          </div>
          <div className="u-profile-email">
            <a href="">{email}</a>
          </div>
        </div>
        <div className="u-profile-details">
          <Link to="/user-details">User Details</Link>
          <BsArrowRightShort size="1.2em" color="blue" />
        </div>
      </div>
    </>
  );
};

const UserListFiltered = (props) => {
  const { name, email, username } = props;

  return (
    <>
      <div className="u-header-detail">
        <div className="u-profile">
          <div className="u-profile-name">
            <div className="u-profile-photo">
              <IoPersonCircleSharp />
            </div>
            <div className="u-profile-username">
              <div>{name}</div>
              <div>{username}</div>
            </div>
          </div>
          <div className="u-profile-email">
            <a href="">{email}</a>
          </div>
        </div>
        <div className="u-profile-details">
          <Link to="/user-details">User Details</Link>
          <BsArrowRightShort size="1.2em" color="blue" />
        </div>
      </div>
    </>
  );
};

const SortByName = (props) => {
  const { name } = props;

  return (
    <>
      <div className="u-header-detail">
        <div className="u-profile">
          <div className="u-profile-name">
            <div className="u-profile-photo">
              <IoPersonCircleSharp />
            </div>
            <div className="u-profile-username">
              <div>{name}</div>
            </div>
          </div>
        </div>
        <div className="u-profile-details">
          <Link to="/user-details">User Details</Link>
          <BsArrowRightShort size="1.2em" color="blue" />
        </div>
      </div>
    </>
  );
};

const SortByUsername = (props) => {
  const { username } = props;

  return (
    <>
      <div className="u-header-detail">
        <div className="u-profile">
          <div className="u-profile-name">
            <div className="u-profile-photo">
              <IoPersonCircleSharp />
            </div>
            <div className="u-profile-username">
              <div>{username}</div>
            </div>
          </div>
        </div>
        <div className="u-profile-details">
          <Link to="/user-details">User Details</Link>
          <BsArrowRightShort size="1.2em" color="blue" />
        </div>
      </div>
    </>
  );
};
const SortByEmail = (props) => {
  const { email } = props;

  return (
    <>
      <div className="u-header-detail">
        <div className="u-profile">
          <div className="u-profile-name">
            <div className="u-profile-photo">
              <IoPersonCircleSharp />
            </div>
            <div className="u-profile-username">
              <a href="">{email}</a>
            </div>
          </div>
        </div>
        <div className="u-profile-details">
          <Link to="/user-details">User Details</Link>
          <BsArrowRightShort size="1.2em" color="blue" />
        </div>
      </div>
    </>
  );
};
