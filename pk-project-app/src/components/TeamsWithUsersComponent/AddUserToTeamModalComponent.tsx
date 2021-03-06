import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUserToTeam } from "../../api/auth";
import "../AuthComponent/Style.css";
import { deleteColumn } from "../../api/columns";

const AddUserToTeamModalComponent = ({ teamId, teamName, setIsRefresh, ...props}: any) => {
    const [showError, setShowError] = useState(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(function () { setShowError(false) }, 200);
    }, [props.show]);

    const closeWindow = () => {
        props.onHide();
    }

    const onClickAdd = () => {
        setShowError(false);
        addUserToTeam(teamId, userEmail)
            .then(() => {
                setInfo("Pomyślnie przypisano użytkownika.");
                setIsRefresh(true);
                closeWindow();
            })
            .catch(error => {
                setShowError(true);
            });
    };


    return (
        <section className="RemoveColumnModalComponent">
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Przypisanie użytkownika do zespołu {teamName}
                        {/* {info == "" ? (
                            <p>{info}</p>
                        ) : (
                            <></>
                        )} */}
                    </Modal.Title>   
                </Modal.Header>
                <Modal.Body>
                    {showError ?
                        <Container className="errorMessage">
                            <Row className="justify-content-md-center">
                                <FontAwesomeIcon icon={faExclamationCircle} size="5x" />
                            </Row>
                            <Row className="text-center m-auto p-auto">
                                <p>Użytkownik nie został dodany.</p>
                            </Row>
                        </Container>
                        :
                        <>
                            <Form>
                                <Form.Group>
                                        <Form.Label>Wpisz email użytkownika</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="comment"
                                            placeholder="Email"
                                            onChange={(event) => setUserEmail(event.target.value)}
                                        />
                                </Form.Group>
                            </Form>
                        </>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <>
                     {!showError && (
                             <>
                                <Button variant="light" onClick={props.onHide}>
                                    Anuluj
                                </Button>
                                <button className="nav-button" onClick={onClickAdd}>
                                    Dodaj użytkownika
                                </button>
                            </>
                     )}
                    </>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default AddUserToTeamModalComponent;