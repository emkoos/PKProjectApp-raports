import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createBoard } from "../../api/boards";
import { createColumn } from "../../api/columns";
import { getUserTeams } from "../../api/teams";
import { ILoggedIn, IState, IToken } from "../../state";
import { setBoard } from "../../state/boardColumns/action";
import { Team } from "../CreateScrumTableComponent/constants";
import { Board, IForm } from "./constants";

const CreateOwnTableComponent = () => {
    const userToken = useSelector<IState, IToken>((state) => state.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [teams, setTeams] = useState<Team[] | undefined>();
    const defaultBoardTypeId = "985cc71e-09d1-472b-bc94-2a663b8c4efa";

    const [initialValues, setInitialValues] = useState<Team>({
        id: "",
        name: ""
    })

    useEffect(() => {
        if(userToken.token == ""){
            navigate(`/login`);
        }
      }, [])

    useEffect(() => {
        getUserTeams().then((response) => {
          setTeams(response)
        }).catch(err => console.log(err))
      }, [])

    const submitHandler = (values: any, handlers: any) => {
        createBoard(values.name, values.id, defaultBoardTypeId)
            .then(response => {
                createNewBoard(response, values.name, values.id);
            }).catch(error => {
                console.log(error);
            });
    };

    const createNewBoard = async (newBoardId: any, newBoardName: string, defaultTeamId: string) => {
        await createColumn("Kolumna I", 1, newBoardId);
        await createColumn("Kolumna II", 2, newBoardId);
        await createColumn("Kolumna III", 3, newBoardId);

        const newBoard: Board = {
            id: newBoardId,
            name: newBoardName,
            teamId: defaultTeamId,
            boardTypeId: defaultBoardTypeId
        }

        await dispatch(setBoard(newBoard));

        await navigate(`/table-${defaultBoardTypeId}`)
    }

    return (
        <Container>
            <>
                <h1 className="fs-3 fw-bold d-flex justify-content-center">Utwórz własną tablicę</h1>
                <h3 className="fs-6 fw-light m-0 d-flex justify-content-center">Uzupełnij formularz</h3>
                <Formik
                    onSubmit={submitHandler}
                    initialValues={initialValues}
                    enableReinitialize
                >
                    {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mt-3">
                                <Form.Label className="w-100 text-start px-0">Nazwa tablicy</Form.Label>
                                <Form.Control type="textarea" name="name" className="w-100 text-start px-0 ps-3" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Wybierz zespół</Form.Label>
                                <Form.Select name="id" className="select-input" onChange={handleChange}>
                                    <option value="">Wybierz</option>
                                    {teams?.map((team, index) =>
                                    <option key={index} value={team.id}>{team.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Row>
                                <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                    <Button type="submit" className="w-100 px-0">Dodaj nową tablicę</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </>
        </Container>
    )
}

export default CreateOwnTableComponent;