import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { createCard } from "../../api/cards";
import { IBoard, IColumn, IState } from "../../state";
import { IForm } from "./constants";


const AddNewCardComponent = () => {
    const navigate = useNavigate();
    const [columnId, setColumnId] = useState<string>();
    const column = useSelector<IState, IColumn>((state) => state.column);
    const board = useSelector<IState, IBoard>((state) => state.board);
    const defaultStatusId = "15198a05-2a67-41a0-b4e4-729a07a2c608";

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    useEffect(() => {
        setColumnId(column.id);
    }, [])

    const submitHandler = (values: any, handlers: any) => {
        

        createCard(values.title, values.description, values.email, columnId, defaultStatusId, "2022-01-08T20:10:32.781Z", values.priority, values.estimate, "")
            .then(() => {
                navigate(`/table-${board.boardTypeId}`);
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <Container>
            <>
                <h1 className="fs-3 fw-bold d-flex justify-content-center">Dodaj swoją kartę</h1>
                <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    enableReinitialize
                >
                    {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Tytuł</Form.Label>
                                <Form.Control type="textarea" name="title" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Opis</Form.Label>
                                <Form.Control type="textarea" name="description" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Email</Form.Label>
                                <Form.Control type="textarea" name="email" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>

                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Priorytet</Form.Label>
                                <Form.Control type="number" min="1" name="priority" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Estymata</Form.Label>
                                <Form.Control type="number" min="1" name="estimate" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Row>

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <Button type="submit" className="w-100 px-0">Dodaj nową karte</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </>
        </Container>
    )
}

export default AddNewCardComponent;