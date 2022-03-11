import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserState } from "../App";

const DataFetch = () => {
  const [data, setData] = useState([]);
  const { userstate,setUserstate } = useContext(UserState);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/")
      .then((res) => {
        setData([])
        setData(res.data);
      });
  }, []);
  
  const postAnalysis = (_data) => {
    const formData = {
        id: _data.id,
    };
    const uploadData = JSON.stringify(formData);
    try {
        fetch(`http://127.0.0.1:8000/data/${_data.id}/analysis/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: formData,
          });
      } catch(error) {
          console.log(error)
      }
      return;
  };

  return (
    <div>
      <br></br>
      <ul>
        {data.map((_data) => (
          <li key={_data.id}>
            {" "}
            {_data.title}
            <br></br>
            {_data.description}
            <br></br>
            {_data.user}
            <br></br>
            {_data.tag1}
            <br></br>
            {_data.tag2}
            <br></br>
            {_data.sensor}
            <br></br>
            {_data.sensor_type}
            <button onClick={() => postAnalysis(_data)}>
              <i className="fas fa-pen">Analyse</i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DataFetch;
