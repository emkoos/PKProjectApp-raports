import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  IState, IUser } from "../../state";
import { editUserInfo } from "../../api/auth";
import "../AuthComponent/Style.css";
import { Navigate, useNavigate } from "react-router";
import FileUploader from "../FileUploadComponent/FileUploadComponent";
import { setUserInfo } from "../../state/userInfo/action";

const ProfileUserComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector<IState, IUser>((state) => state.userInfo);

    const submitHandler = (values: any, handlers: any) => {
      editUserInfo(userInfo.email, userInfo.email, values.firstname, values.lastname, "");
      userInfo.firstname = values.firstname;
      userInfo.lastname = values.lastname;
      dispatch(setUserInfo(userInfo));
      navigate(`/`);
    }

    return (
      <>
      <h1 className="fs-3 fw-bold d-flex justify-content-center">Edytuj profil</h1>
      <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
      <Formik 
        onSubmit={submitHandler}
        initialValues={userInfo}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (    
        <div className="d-flex justify-content-center profile-form">
        <Form className="w-25" onSubmit={handleSubmit}>
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
          <Form.Label className="mt-3">Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder={userInfo.lastname}
            defaultValue={userInfo.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">Email: {userInfo.email}</Form.Label>
        </Form.Group>

        <FileUploader />
        <br/>
        <button className="nav-button" type="submit">
          Zapisz zmiany
        </button>
      </Form>
      </div>
      
      )}
      </Formik>
      </>
    );
  };

  export default ProfileUserComponent;