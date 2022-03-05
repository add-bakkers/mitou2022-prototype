import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserState } from "../App";

const UserFetch = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({ id: "", name: "" });
  const { userstate,setUserstate } = useContext(UserState);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);


  const newUser = (user) => {
    const data = {
      name: user.name,
    };
    axios
      .post(`http://127.0.0.1:8000/users/`, data, {
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

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            {user.name} {user.id}
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="New user"
        required
      />
      <button onClick={() => newUser(editedUser)}>Create</button>
    </div>
  );
};

export default UserFetch;
