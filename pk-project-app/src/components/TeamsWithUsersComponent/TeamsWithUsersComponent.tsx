import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createTeam, getUsersByTeamId, getUserTeams } from "../../api/teams";
import { IState, IUser } from "../../state";
import AddUserToTeamModalComponent from "./AddUserToTeamModalComponent";
import { InitialTeam, Team } from "./constants";
import RemoveTeamModalComponent from "./RemoveTeamModalComponent";

const TeamsWithUsersComponent = () => {
    const userInfo = useSelector<IState, IUser>((state) => state.userInfo);
    const [teams, setTeams] = useState<Team[]>();
    const [teamsWithUsers, setTeamsWithUsers] = useState<Team[]>();
    const [isRefresh, setIsRefresh] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedTeamName, setSelectedTeamName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [initialValues, setInitialValues] = useState<InitialTeam>({
        id: "",
        name: ""
    })

    useEffect(() => {
        setIsRefresh(true);
        getTeamsAndUsers();
        setIsRefresh(false);
    }, [isRefresh])

    const getTeamsAndUsers = async () => {
        const teamsResult = await getUserTeams();
        setTeams(teamsResult);
        const values = await Promise.all<Team>(teamsResult?.map(async (result: any) => {
            const response = await getUsersByTeamId(result.id);

            return {
                ...result,
                users: response
            }
        }));
        setTeamsWithUsers(values); 
    }

    const submitHandler = (values: any, handlers: any) => {
        if(values.name == ""){
            setError("Wpisz nazwę zespołu!");
        }else{
            createTeam(values.name)
                .then(() => setIsRefresh(true)).catch(error => {
                    console.log(error);
            });
            setError('');
        }
    };

    const addUserToTeam = (teamId: string, teamName: string) => {
        setAddModalShow(true);
        setSelectedTeam(teamId);
        setSelectedTeamName(teamName);
    }

    const removeTeam = (teamId: string, teamName: string) => {
        setRemoveModalShow(true);
        setSelectedTeam(teamId);
        setSelectedTeamName(teamName);
    }

    return (
        <>
            <section>
                <Formik
                        onSubmit={submitHandler}
                        initialValues={initialValues}
                        enableReinitialize
                    >
                        {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label className="text-start px-0">Nazwa zespołu</Form.Label>
                                    <Form.Control type="text" name="name" className="w-50 text-center px-0 ps-5" onChange={handleChange} />
                                </Form.Group>
                                {error ? (
                                    <Alert variant="danger">{error}</Alert>
                                ) : (
                                <p></p>
                                )}
                                <Row>
                                    <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                        <Button type="submit">Utwórz zespół +</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>

                        <h2>Twoje zespoły:</h2>
                        {teamsWithUsers?.map((team, index) =>
                            <div key={index}>
                                <b>{team.name}</b>
                                <Button variant="info" onClick={() => addUserToTeam(team.id, team.name)}>
                                    Dodaj użytkownika
                                </Button> 
                                <Button variant="danger" onClick={() => removeTeam(team.id, team.name)}>
                                    Usuń zespół
                                </Button> 
                                <br/>
                                {team.users?.map((user, key) =>
                                <div key={key}>
                                    {
                                        user.email == userInfo.email ? (
                                            <span>Ty</span>
                                        ) : (
                                            <span>{user.email}</span>
                                        )      
                                    }
                            </div>
                                )}
                            </div>
                        )}         
            </section>

            <AddUserToTeamModalComponent
                setIsRefresh={setIsRefresh}
                teamId={selectedTeam}
                teamName={selectedTeamName}
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
            />

            <RemoveTeamModalComponent
                setIsRefresh={setIsRefresh}
                teamId={selectedTeam}
                teamName={selectedTeamName}
                show={removeModalShow}
                onHide={() => setRemoveModalShow(false)}
            />
        </>
    )
}

export default TeamsWithUsersComponent;