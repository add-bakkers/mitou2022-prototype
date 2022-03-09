import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { UserState } from "../../App";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { postData } from "./DataSlice";
import { Button, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';

const DataFetch = () => {
  const [editedData, setEditedData] = useState({ id: "", title: "" ,description: "", user: "", tag1: "", tag2: "", sensor: "", sensor_type: ""});
  const { userstate,setUserstate } = useContext(UserState);

  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const apiUrl = "http://127.0.0.1:8000/";

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

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
      postData(data)
  };

  const postData = (data) => {
    try {
        const uploadData = JSON.stringify(data);
        const formData = new FormData()
        formData.append('file', selectedFile);
        fetch(`${apiUrl}data/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: uploadData,
        }).then(() => {
            console.log(uploadData);
        }).then(() => {
            fetch(`${apiUrl}file/`, {
              method: 'POST',
              body: formData,
            });
        }).then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        

      } catch(error) {
          console.log(error)
      }
      return;
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
                        required
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
                    <input type="file" name="file" onChange={changeHandler} />
                    {isFilePicked ? (
                      <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                          lastModifiedDate:{' '}
                          {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <p>Select a file to show details</p>
                    )}
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
