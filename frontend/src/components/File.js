import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserState } from "../App";

const FileFetch = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [editedFile, setEditedFile] = useState({ id: "", data: "" });

    const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);
      try {
        const response = axios({
          method: "post",
          url: "/file",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch(error) {
        console.log(error)
      }
    }
  
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedFile({ ...editedFile, [name]: value });
    };
    return (
      <div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="data"
          value=""
          onChange={(evt) => handleInputChange(evt)}
          placeholder="data"
          required
        />
          <input type="file" onChange={handleFileSelect}/>
          <input type="submit" value="Upload File" />
        </form>
      </div>
    );
};

export default FileFetch;
