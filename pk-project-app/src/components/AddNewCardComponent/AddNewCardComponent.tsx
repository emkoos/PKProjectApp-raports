import { Formik } from "formik"
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { createCard } from "../../api/cards";
import { IBoard, IColumn, IState, IUser } from "../../state";
import { IForm } from "./constants";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import "../AuthComponent/Style.css";
import "./Style.css";


const AddNewCardComponent = () => {
    const navigate = useNavigate();
    const [columnId, setColumnId] = useState<string>();
    const [date, setDate] = useState<Date | null | undefined>();
    const column = useSelector<IState, IColumn>((state) => state.column);
    const board = useSelector<IState, IBoard>((state) => state.board);
    const userInfo = useSelector<IState, IUser>((state) => state.userInfo);
    const defaultStatusId = "15198a05-2a67-41a0-b4e4-729a07a2c608";

    const [initialValues, setInitialValues] = useState<IForm>({
        localisation: 3
    })

    useEffect(() => {
        setColumnId(column.id);
    }, [])

    const submitHandler = (values: any, handlers: any) => {
        let month: any =(date) ? date.getMonth() + 1 : undefined;
        let day: any = (date) ?  date.getDate() : undefined;
        let hour: any = (date) ? date.getHours() - 1 : undefined;
        let minutes: any = (date) ? date.getMinutes() : undefined;

        let formattedMonth = `${month < 10 ? `0${month}` : month}`;
        let formattedDay = `${day < 10 ? `0${day}` :  day}`;
        let formattedHour = `${hour < 10 ? `0${hour}` : hour}`;
        let formattedMinutes = `${minutes < 10 ? `0${minutes}` :  minutes}`;
        let dateString: any = (date) ? date.getFullYear().toString() + '-' + formattedMonth + '-' + formattedDay + 'T' + formattedHour + ':' + formattedMinutes + ':00.064Z'  : undefined;

        if(board.boardTypeId != "21adbda8-c90d-49dd-9778-e9ab9ac86d46"){
            values.estimate = 1;
        }

        createCard(values.title, values.description, userInfo.email, columnId, defaultStatusId, dateString, values.priority, values.estimate, "")
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
                        <div className="d-flex justify-content-center profile-form">
                        <Form className="w-25 new-card-form" onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Label>Tytuł</Form.Label>
                                <Form.Control type="textarea" name="title" onChange={handleChange} />
                            </Row>
                            <Row className="mt-3">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control type="textarea" name="description" onChange={handleChange} />
                            </Row>
                            <br/>
                            <Row className="mt-3">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Termin"
                                    value={date}
                                    onChange={(date) => {
                                        setDate(date);
                                    }}
                                    />
                                </LocalizationProvider>
                            </Row>
                            <Row className="mt-3">
                                <Form.Label >Priorytet</Form.Label>
                                <Form.Control type="number" min="1" name="priority" onChange={handleChange} />
                            </Row>
                            {board.boardTypeId == "21adbda8-c90d-49dd-9778-e9ab9ac86d46" ? (
                                <Row className="mt-3">
                                    <Form.Label>Effort</Form.Label>
                                    <Form.Control type="number" min="1" name="estimate" onChange={handleChange} />
                                </Row>
                            ) : (
                                <></>
                            )}
                            

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <button type="submit" className="nav-button">Dodaj nową karte</button>
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

export default AddNewCardComponent;