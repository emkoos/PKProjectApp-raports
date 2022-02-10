import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Button, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../api/cards";
import { deleteColumn } from "../../api/columns";

const RemoveCardModalComponent = ({ cardId, cardName,setClose, ...props}: any) => {
    const [turnSpinner, setTurnSpinner] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setTimeout(function () { setShowError(false) }, 200);
    }, [props.show]);

    const closeWindow = () => {
        props.onHide();
        setTimeout(function () { setTurnSpinner(false) }, 200);
    }

    const onClickRemove = () => {
        setShowError(false);
        setTurnSpinner(false);
        deleteCard(cardId)
            .then(() => {
                setClose(true);
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
                        Usuwanie karty
                    </Modal.Title>   
                </Modal.Header>
                <Modal.Body>
                    {showError ?
                        <Container className="errorMessage">
                            <Row className="justify-content-md-center">
                                <FontAwesomeIcon icon={faExclamationCircle} size="5x" />
                            </Row>
                            <Row className="text-center m-auto p-auto">
                                <p>Karta nie została usunięta</p>
                            </Row>
                        </Container>
                        :
                        <>
                            <p className="fs-6 my-auto">
                                Czy na pewno chcesz usunąć kartę <b>{cardName}</b> ?
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
                                <Button variant="danger" onClick={onClickRemove}>
                                    Usuń kartę
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

export default RemoveCardModalComponent;