import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editCard } from "../../api/cards";
import { getStatus, getStatuses } from "../../api/statuses";
import { ICard, IState, IUser } from "../../state";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { getCommentByCardId } from "../../api/comments";
import { Team } from "../CreateScrumTableComponent/constants";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router";
import "../AuthComponent/Style.css";
import FileUploader from "../FileUploadComponent/FileUploadComponent";

const RegisterUserComponent = () => {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState<Team>({
        id: "",
        name: ""
    })

    const submitHandler = (values: any, handlers: any) => {
        registerUser(values.userEmail, values.userEmail, values.password, values.firstname, values.lastname, "");
      localStorage.setItem("Info", "Zarejestrowałeś się poprawnie. Możesz się zalogować.");
      navigate(`/`);
    }

    return (
      <>
      <h1 className="fs-3 fw-bold d-flex justify-content-center">Rejestracja</h1>
      <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
      <Formik 
        onSubmit={submitHandler}
        initialValues={initialValues}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
        <div className="d-flex justify-content-center profile-form">
        <Form className="w-25" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="userEmail"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <br/>
        <button className="nav-button" type="submit">
          Zarejestruj
        </button>
      </Form>
      </div>
      )}
      </Formik>
      </>
    );
  };

  export default RegisterUserComponent;