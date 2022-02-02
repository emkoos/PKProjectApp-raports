import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Style.css";
import "../AuthComponent/Style.css";
import { createTeam, getUsersByTeamId, getUserTeams } from "../../api/teams";
import { IState, IUser } from "../../state";
import AddUserToTeamModalComponent from "./AddUserToTeamModalComponent";
import { InitialTeam, Team } from "./constants";
import RemoveTeamModalComponent from "./RemoveTeamModalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faTrashAlt, faUserFriends, faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
            <section className="team-section">
                        <h2>Twoje zespoły:</h2>
                        {teamsWithUsers?.map((team, index) =>
                            <div key={index}>
                                <Button className="icon-button" title="Dodaj członka" onClick={() => addUserToTeam(team.id, team.name)}>
                                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                                </Button> 
                                <span className="team-name">{team.name}</span>
                                <Button className="icon-button" title="Usuń zespół" onClick={() => removeTeam(team.id, team.name)}>
                                    <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                                </Button> 
                                <br/>
                                {team.users?.map((user, key) =>
                                <div key={key}>
                                    {
                                        user.email == userInfo.email ? (
                                            <span>Ty</span>
                                        ) : (
                                            <span>{user.firstname} {user.lastname}</span>
                                        )      
                                    }
                            </div>
                                )}
                            </div>
                        )}    
                        <hr className="w-50 team-line"/> 
                        <Formik
                        onSubmit={submitHandler}
                        initialValues={initialValues}
                        enableReinitialize
                    >
                        {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="new-team">
                                    <Form.Label className="text-start px-0 mt-3">Wpisz nazwę zespołu:</Form.Label>
                                    <Form.Control type="text" name="name" className="w-50 text-center px-0 team-input" onChange={handleChange} />
                                </Form.Group>
                                {error ? (
                                    <Alert variant="danger">{error}</Alert>
                                ) : (
                                <p></p>
                                )}
                                <Row>
                                    <Col className="my-3 d-flex justify-content-center justify-content-md-center align-items-stretch px-0">
                                        <button className="nav-button" type="submit">Utwórz zespół <FontAwesomeIcon className="ms-2" icon={faUserFriends} size="1x" /></button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>   
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