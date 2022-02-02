import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { deleteTeam } from "../../api/teams";

const RemoveTeamModalComponent = ({ teamId, teamName, setIsRefresh, ...props}: any) => {
    const [turnSpinner, setTurnSpinner] = useState(false);
    const [showError, setShowError] = useState(false);

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
        deleteTeam(teamId)
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
                        Usuń zespół
                    </Modal.Title>   
                </Modal.Header>
                <Modal.Body>
                    {showError ?
                        <Container className="errorMessage">
                            <Row className="justify-content-md-center">
                                <FontAwesomeIcon icon={faExclamationCircle} size="5x" />
                            </Row>
                            <Row className="text-center m-auto p-auto">
                                <p>Zespół nie został usunięty.</p>
                            </Row>
                        </Container>
                        :
                        <>
                            <p>
                                Czy na pewno chcesz usunąć ten zespół <b>{teamName}</b>? 
                            </p>
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
                                <button className="del-column-button" onClick={onClickAdd}>
                                    Usuń zespół
                                </button>
                             </>
                         )
                     )}
                    </>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default RemoveTeamModalComponent;