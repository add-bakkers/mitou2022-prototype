import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserState } from "../App";

const UserFetch = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({ id: "", name: "" });
  const { userstate,setUserstate } = useContext(UserState);

  useEffect(() => {
    axios
      .get("http://35.76.77.29:8000/users/")
      .then((res) => {
        setUsers([])
        setUsers(res.data);
      });
  }, []);


  const newUser = (user) => {
    const data = {
      name: user.name,
    };
    axios
      .post(`http://35.76.77.29:8000/users/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers([...users, res.data]);
        setEditedUser({ id: "", name: "" });
      });
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedUser({ ...editedUser, [name]: value });
  };
  const handleClick = (name) => {
    setUserstate(name);
  };

  return (
    <div>
      <br></br>
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="New user"
        required
      />
      <button onClick={() => newUser(editedUser)}>Create</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            {user.name}
            <button onClick={ () => handleClick(user.name)}>選択</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFetch;
