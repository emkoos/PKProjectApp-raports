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

const RegisterUserComponent = () => {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState<Team>({
        id: "",
        name: ""
    })

    const submitHandler = (values: any, handlers: any) => {
        registerUser(values.userEmail, values.userEmail, values.password, values.firstname, values.lastname, "");
      navigate(`/`);
    }

    return (
      <Formik 
        onSubmit={submitHandler}
        initialValues={initialValues}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
        <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Zarejestruj
        </Button>
      </Form>
      )}
      </Formik>
    );
  };

  export default RegisterUserComponent;