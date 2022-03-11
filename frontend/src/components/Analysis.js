import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserState } from "../App";

const AnalysisFetch = () => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AnalysisFetch;
