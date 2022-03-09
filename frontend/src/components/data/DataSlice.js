// const apiUrl = process.env.REACT_APP_DEV_API_URL;
const apiUrl = "http://127.0.0.1:8000/";

const toJson = async (res) => {
    const json = await res.json();
    if (res.ok) {
        return json;
    } else {
        throw new Error(json.message);
    }
}

export const getData = async () => {
    const res = await fetch(`${apiUrl}data/`, {
        method: 'GET',
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return await toJson(res);
};

export const postData = (data,selectedFile,user) => {
    try {
        const uploadData = JSON.stringify(data);

        fetch(`${apiUrl}data/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: uploadData,
        }).then(() => {
            console.log(uploadData);
            console.log(data);
        });
        // const formData = new FormData();
        // formData.append("file", selectedFile);
        // formData.append("user", user);
        // fetch(`${apiUrl}api/file/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "multipart/form-data",
        //     },
        //     body: formData,
        // });
    } catch(error) {
        console.log(error)
    }
    return;
};
