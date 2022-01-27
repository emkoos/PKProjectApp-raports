import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {  IState, IUser } from "../../state";
import { editUserInfo } from "../../api/auth";
import { Navigate, useNavigate } from "react-router";

const ProfileUserComponent = () => {
    const navigate = useNavigate();
    const userInfo = useSelector<IState, IUser>((state) => state.userInfo);

    const submitHandler = (values: any, handlers: any) => {
      editUserInfo(userInfo.email, userInfo.email, values.firstname, values.lastname, "");
      navigate(`/`);
    }

    return (
      <Formik 
        onSubmit={submitHandler}
        initialValues={userInfo}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder={userInfo.firstname}
            defaultValue={userInfo.firstname}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder={userInfo.lastname}
            defaultValue={userInfo.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email: {userInfo.email}</Form.Label>
        </Form.Group>

        <br/>
        <Button variant="primary" type="submit">
          Zapisz zmiany
        </Button>
      </Form>
      )}
      </Formik>
    );
  };

  export default ProfileUserComponent;