import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { uploadUserPhoto } from "../../api/auth";
import { createBoard } from "../../api/boards";
import { createColumn } from "../../api/columns";
import { getUserTeams } from "../../api/teams";
import { ILoggedIn, IState, IToken } from "../../state";
import { setBoard } from "../../state/boardColumns/action";
import { Team } from "../CreateScrumTableComponent/constants";

const FileUploader = () => {
    const [fileSelected, setFileSelected] = useState<string | Blob>() // also tried <string | Blob>
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