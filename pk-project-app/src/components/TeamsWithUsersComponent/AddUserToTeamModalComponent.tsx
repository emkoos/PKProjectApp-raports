import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUserToTeam } from "../../api/auth";
import { deleteColumn } from "../../api/columns";

const AddUserToTeamModalComponent = ({ teamId, teamName, setIsRefresh, ...props}: any) => {
    const [turnSpinner, setTurnSpinner] = useState(false);
    const [showError, setShowError] = useState(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(function () { setShowError(false) }, 200);
    }, [props.show]);

    const closeWindow = () => {
        props.onHide();
        setTimeout(function () { setTurnSpinner(false) }, 200);
    }

    const onClickAdd = () => {
        setShowError(false);
        setTurnSpinner(false);
        addUserToTeam(teamId, userEmail)
            .then(() => {
                setIsRefresh(true);
                closeWindow()
            })
            .catch(error => {
                setTurnSpinner(false);
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
                     {turnSpinner ? (
                         <Spinner
                            animation="border"
                            variant="danger"
                         />
                     ) : (
                         !showError && (
                             <>
                                <Button variant="light" onClick={props.onHide}>
                                    Anuluj
                                </Button>
                                <Button variant="primary" onClick={onClickAdd}>
                                    Dodaj użytkownika
                                </Button>
                             </>
                         )
                     )}
                    </>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default AddUserToTeamModalComponent;