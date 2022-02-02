import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { infoUser } from "../../api/auth";
import { setUserInfo } from "../../state/userInfo/action";

const FileUploader = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    const saveFile = (e  : React.ChangeEvent<any>) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setError("");
    }

    const uploadFile = async () => {
            if(file == ""){
                setError("Musisz wybrać plik!");
            }else{
                setError("");
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
            }
    };
    return (
        <Container>
            <>
                <Form.Control className="mt-3" type="file" placeholder="Wybierz zdjęcie" id="photo" onChange={saveFile} multiple={false} />
                <p>{error ? (
                    <b className="text-danger">{error}</b>
                ) : (
                    <></>
                )}</p>
                <input className="mt-3" type="button" value="Zmień zdjęcie" onClick={uploadFile} />
            </>
        </Container>
    )
}

export default FileUploader;