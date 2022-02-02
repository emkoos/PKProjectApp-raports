import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { createColumn } from "../../api/columns";
import { IBoard, IState } from "../../state";
import { IForm } from "./constants";
import "../AuthComponent/Style.css";

const AddNewColumnComponent = () => {
    const navigate = useNavigate();
    const [boardId, setBoardId] = useState<string>();
    const board = useSelector<IState, IBoard>((state) => state.board);

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    useEffect(() => {
        setBoardId(board.id);
    }, [])

    const submitHandler = (values: any, handlers: any) => {
        

        createColumn(values.title, values.position, boardId)
            .then(() => {
                navigate(`/table-${board.boardTypeId}`);
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <Container>
            <>
                <h1 className="fs-3 fw-bold d-flex justify-content-center">Dodaj nową kolumnę</h1>
                <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    enableReinitialize
                >
                    {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                        <div className="d-flex justify-content-center profile-form">
                        <Form onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Label>Tytuł</Form.Label>
                                <Form.Control type="textarea" name="title" onChange={handleChange} />
                            </Row>

                            <Row className="mt-3">
                                <Form.Label>Pozycja</Form.Label>
                                <Form.Control type="number" min="1" name="position" onChange={handleChange} />
                            </Row>

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <button type="submit" className="nav-button">Dodaj nową kolumnę</button>
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

export default AddNewColumnComponent;