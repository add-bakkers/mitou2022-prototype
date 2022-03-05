import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserState } from "../App";

const DataFetch = () => {
  const [_data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [editedData, setEditedData] = useState({ id: "", title: "" ,description: "", user: "", tag1: "", tag2: "", sensor: "", sensor_type: ""});
  const { userstate,setUserstate } = useContext(UserState);

  const newData = (_data) => {
    const data = {
      title: _data.title,
      description: _data.description,
      user: userstate,
      tag1: _data.tag1, 
      tag2: _data.tag2, 
      sensor: _data.sensor, 
      sensor_type: _data.sensor_type, 
    };
    axios
      .post(`http://127.0.0.1:8000/data/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData([..._data, res.data]);
        setEditedData({ id: "", title: "" });
      });
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedData({ ...editedData, [name]: value })
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={editedData.title}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="title"
        required
      />
        <input
        type="text"
        name="description"
        value={editedData.description}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="description"
        required
      />
      <input
        type="text"
        name="tag1"
        value={editedData.tag1}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="tag1"
        required
      />
      <input
        type="text"
        name="tag2"
        value={editedData.tag2}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="tag2"
        required
      />
      <input
        type="text"
        name="sensor"
        value={editedData.sensor}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="sensor"
        required
      />
      <input
        type="text"
        name="sensor_type"
        value={editedData.sensor_type}
        onChange={(evt) => handleInputChange(evt)}
        placeholder="sensor_type"
        required
      />
      <button onClick={() => newData(editedData)}>Create</button>
    </div>
  );
};

export default DataFetch;
