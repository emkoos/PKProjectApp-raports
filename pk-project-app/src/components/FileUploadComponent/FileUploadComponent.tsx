import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { infoUser } from "../../api/auth";
import { setUserInfo } from "../../state/userInfo/action";

const FileUploader = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");

    const saveFile = (e  : React.ChangeEvent<any>) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const uploadFile = async () => {
            console.log(file);
            const formData = new FormData();
            formData.append("file", file);
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
                const res = await axios.post("https://localhost:44390/Users/upload-photo", formData, config);

                infoUser().then(async response => {
                    await dispatch(setUserInfo(response));
                    localStorage.setItem("userInfo", JSON.stringify(response))
                });
              } catch (ex) {
                console.log(ex);
              }
    };
    return (
        <Container>
            <>
                <input type="file" id="photo" onChange={saveFile} multiple={false}/>
                <input type="button" value="Dodaj zdjęcie" onClick={uploadFile} />
            </>
        </Container>
    )
}

export default FileUploader;