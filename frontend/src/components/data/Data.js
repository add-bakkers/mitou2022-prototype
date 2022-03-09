import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { UserState } from "../../App";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { postData } from "./DataSlice";
import { Button, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';

const DataFetch = () => {
  const [_data, setData] = useState([]);
  const [editedData, setEditedData] = useState({ id: "", title: "" ,description: "", user: "", tag1: "", tag2: "", sensor: "", sensor_type: ""});
  const { userstate,setUserstate } = useContext(UserState);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const newData = (_data) => {
      const data = {
        title: editedData.title,
        description: editedData.description,
        user: userstate,
        tag1: editedData.tag1, 
        tag2: editedData.tag2, 
        sensor: editedData.sensor, 
        sensor_type: editedData.sensor_type, 
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

  const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
  }

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedData({ ...editedData, [name]: value })
  };

  const onClickButton = () => {
    const data = {
        title: editedData.title,
        description: editedData.description,
        user: userstate,
        tag1: editedData.tag1, 
        tag2: editedData.tag2, 
        sensor: editedData.sensor, 
        sensor_type: editedData.sensor_type, 
    };
      console.log(data,selectedFile);
      postData(data,selectedFile,userstate)
  };

  const isValid = useMemo(() => {
    if (editedData.title && editedData.description && editedData.tag1 && editedData.tag2 && editedData.sensor && editedData.sensor_type) {
        return true;
    }
    return false;
  }, [editedData.title, editedData.description, editedData.tag1, editedData.tag2, editedData.sensor, editedData.sensor_type]);



  return (
        <div>
            <Box
                component="form"
                fullwidth
                sx={{ width: "100%", marginTop: 8, flexDirection: "column" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Stack spacing={4}>
                    <TextField 
                        label="title"
                        type="text"
                        name="title"
                        value={editedData.title}
                        variant="standard"
                        onChange={handleInputChange}
                    />
                    <TextField 
                        required
                        type="text"
                        name="description"
                        label="description"
                        value={editedData.description}
                        onChange={(evt) => handleInputChange(evt)}
                    />
                    <Stack direction="row" spacing={1}>
                    <TextField
                        required
                        label="tag1"
                        type="text"
                        name="tag1"
                        value={editedData.tag1}
                        onChange={(evt) => handleInputChange(evt)}
                    />
                    <TextField
                        required
                        label="tag2"
                        type="text"
                        name="tag2"
                        value={editedData.tag2}
                        onChange={(evt) => handleInputChange(evt)}
                    />
                    </Stack>
                    <TextField
                        required
                        label="sensor"
                        type="text"
                        name="sensor"
                        value={editedData.sensor}
                        onChange={(evt) => handleInputChange(evt)}
                    />
                    <TextField
                        required
                        label="sensor_type"
                        type="text"
                        name="sensor_type"
                        value={editedData.sensor_type}
                        onChange={(evt) => handleInputChange(evt)}
                    />
                    <input type="file" onChange={handleFileSelect}/>
                    <Button
                        variant="contained"
                        component="span"
                        onClick={onClickButton}
                        disabled={!isValid}
                    >create</Button>
                </Stack>
            </Box>
        </div>
  );
};

export default DataFetch;
