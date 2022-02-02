import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { loginUser, infoUser } from "../../api/auth";
import { ILoginUser } from "./constants";
import { setToken } from "../../state/userToken/action";
import { IToken } from "../../state";
import "../AuthComponent/Style.css";
import { setUserInfo } from "../../state/userInfo/action";
import { setLoggedIn } from "../../state/loggedIn/action";


const AuthComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState<ILoginUser>({
        email: '',
        password: ''
    });
    const [isError, setIsError] = useState(false)
    const iToken = useSelector<IToken>((state) => state.token);

    useEffect(() => {
        // @ts-ignore
        if(localStorage.getItem("token") !== "") navigate(`/`);
    },[])

    const submitHandler = async (values: any) => {
        loginUser(values.email, values.password)
        .then(async response => {
            if(response.success) {
                await dispatch(setToken(response.token));
                await dispatch(setLoggedIn({loggedIn: true}));
                localStorage.setItem("token", response.token);
                infoUser().then(async response => {
                    await dispatch(setUserInfo(response));
                    localStorage.setItem("userInfo", JSON.stringify(response))
                });
                await navigate(`/`);
            }
            else {
                setIsError(true)
            }
        }).catch(error => {
            setIsError(true)
        });
    }


    return (
        <Container>
            <>
                <h1 className="fs-3 fw-bold d-flex justify-content-center">Logowanie</h1>
                <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
                {isError && <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Blędne dane logowania. Spróbuj ponownie</h3>}
                
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    enableReinitialize
                >
                    {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                        <div className="d-flex justify-content-center profile-form">
                        <Form onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Label >Email</Form.Label>
                                <Form.Control type="email" name="email"  onChange={handleChange} />
                            </Row>

                            <Row className="mt-3">
                                <Form.Label >Hasło</Form.Label>
                                <Form.Control type="password" name="password"  onChange={handleChange} />
                            </Row>

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <button type="submit" className="nav-button">Zaloguj się</button>
                                </Col>
                            </Row>
                        </Form>
                        </div>
                    )}
                </Formik>
            </>
        </Container>
    )
}

export default AuthComponent;

function props(props: any) {
    throw new Error("Function not implemented.");
}
