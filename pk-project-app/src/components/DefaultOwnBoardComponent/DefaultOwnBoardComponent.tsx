import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import './Style.css';
import { deleteCard, editCard, getCardByColumnId, getCardById } from "../../api/cards";
import { getColumnByBoardId } from "../../api/columns";
import { IBoard, IState } from "../../state";
import AddNewCardButton from "../Buttons/AddNewCardButton";
import AddNewColumnButton from "../Buttons/AddNewColumnButton";
import { Columns } from "./constants";
import { setCard } from "../../state/cardInfo/action";
import CardDetailsModal from "../CardDetailsModalComponent/CardDetailsModal";
import CardCommentsModal from "../CardCommentsModal/CardCommentsModal";
import RemoveColumnModalComponent from "../RemoveColumnModalComponent/RemoveColumnModalComponent";
import { Team } from "../CreateScrumTableComponent/constants";
import { User } from "../TeamsWithUsersComponent/constants";
import { getTeamById, getUsersByTeamId } from "../../api/teams";

const DefaultKanbanBoardComponent = () =>{
    const ownBoard = useSelector<IState, IBoard>((state) => state.board);

    const dispatch = useDispatch();
    const [columns1, setColumns1] = useState<Columns[]>();
    const [columnsWithCards, setColumnsWithCards] = useState<Columns[]>();
    const [team, setTeam] = useState<Team>();
    const [teamUsers, setTeamUsers] = useState<User[]>();
    const [showDetails, setShowDetails] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [close, setClose] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [columnToDelete, setColumnToDelete] = useState<string>('');
    
    const handleCloseDetails = () => setShowDetails(false);
    const handleCloseComments = () => setShowComments(false);

    const handleShowDetails = async (card: any) => {
        await dispatch(setCard(card));
        await setClose(false);
        await setShowDetails(true);
    };

    const handleShowComments = async (card: any) => {
        await dispatch(setCard(card));
        await setClose(false);
        await setShowComments(true);
    };


    const refOld = useRef("");
    const refNew = useRef("");
    const refCardId = useRef("");
    const refOutSide = useRef(false);

    useEffect(() => {
        getColumnsAndCards();
        setClose(false);
    }, [close])

    const getColumnsAndCards = async () => {
        const columnsResult = await getColumnByBoardId(ownBoard.id);
        setColumns1(columnsResult);
        const values = await Promise.all<Columns>(columnsResult?.map(async (result: any) => {
            const response = await getCardByColumnId(result.id);

            return {
                ...result,
                cards: response
            }
        }));
        setColumnsWithCards(values);   
        
        const getTeam = await getTeamById(ownBoard.teamId);
        setTeam(getTeam);

        const getUsers = await getUsersByTeamId(ownBoard.teamId);
        setTeamUsers(getUsers);
    }

    const dragStartHandler = async (event: React.DragEvent<HTMLElement>, cId:any, oldCId:any) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);

        refOld.current = oldCId;
        refCardId.current = cId;
        refNew.current = "";
    };

    const dragEndHandler = (event: React.DragEvent<HTMLElement>, columnId:any) => {
        if(refOutSide.current === true) {
            if(refNew.current !== refOld.current)
                event.currentTarget.outerHTML = "";

            refOld.current = "";
            refOutSide.current = false;
        }
    };

    const dropHandler = async (event: React.DragEvent<HTMLElement>, columnId:any) => {
        event.preventDefault();
        if(columnId !== "" && refOld.current !== "") {
            if(columnId !== refOld.current) {
                refOutSide.current = true;
                event.currentTarget.innerHTML += event.dataTransfer.getData("text/html");

                //@ts-ignore
                let childNodes = event.nativeEvent.path[event.nativeEvent.path.length - 9].childNodes;
                for(let i = 0; i < childNodes.length; i++) {
                    if(i > 1) {
                        let cardId = childNodes[i].attributes[0].value;
                        childNodes[i].attributes[1].value = columnId;
                        childNodes[i].addEventListener('dragstart', (e: React.DragEvent<HTMLElement>) => dragStartHandler(e, cardId, columnId));
                        childNodes[i].addEventListener('dragend', (e: React.DragEvent<HTMLElement>) => dragEndHandler(e, columnId))
                    }
                }

                if(refCardId.current !== "") {
                    let response = await getCardById(refCardId.current);
                    await editCard(response.id, response.title, response.description, response.userEmail, columnId, response.statusId, response.createdDate, response.updatedStatusDoneDate, response.deadlineDate, response.priority, response.estimate, response.attachment);
                    refCardId.current = "";
                    refOld.current = "";
                }
            }
        }
    };
    
    const allowDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const dragEnterHandler = (event: React.DragEvent<HTMLElement>) => {
        //@ts-ignore
        let newcolumnid = event.nativeEvent.path[event.nativeEvent.path.length - 9].attributes[0].value
        refNew.current = newcolumnid
    }

    const submitCloseDetails = () => {
        setClose(true);
        handleCloseDetails();
    }
    const submitCloseComments = () => {
        setClose(true);
        handleCloseComments();
    }

    const deleteThisCard = (card: any) => {
        setClose(true);
        deleteCard(card.id);
    }

    const deleteColumnButtonClicked = (columnId: string) => {
        setModalShow(true);
        setColumnToDelete(columnId);
    }

    return (
        <>
            <Container> 
                    <h3>Tablica {ownBoard.name}</h3>
                <Row>
                    {columnsWithCards?.sort((a, b) => a.position-b.position)
                    .map((column, index) =>
                        <Col className="table-column border bg-dark" key={index} data-columnid={column.id} onDragEnter={dragEnterHandler} onDragOver={allowDrop} onDrop={(event) => dropHandler(event, column.id)} draggable={false}>
                            {column.title}

                            <span className="mt-4 mt-md-0 me-5"><AddNewCardButton route={"/add-new-card"} selectedColumn={column} /></span>
                            {column.cards?.sort((a,b) => a.priority-b.priority)
                            .map((card, key) =>
                            <Card className="column-card" key={key} data-cardid={card.id} data-columnid={card.columnId} onDragStart={(event) => dragStartHandler(event, card.id, card.columnId)} onDragEnd={(event) => dragEndHandler(event, column.id)} draggable={true} >
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{card.deadlineDate}</Card.Subtitle>
                                <Card.Text >{card.userEmail}</Card.Text>
                                <Card.Text>
                                    {card.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleShowDetails(card)}>
                                    Szczegóły
                                </Button>
                                <Button variant="danger" onClick={() => deleteThisCard(card)}>
                                    Usuń
                                </Button>  
                                <Button variant="primary" onClick={() => handleShowComments(card)}>
                                    Komentarze
                                </Button>                             
                            </Card.Body>
                        </Card>
                        )}
                        {index > 0 ? (
                                <Button variant="danger" onClick={() => deleteColumnButtonClicked(column.id)}>
                                    Usuń kolumnę
                                </Button> 
                            ) : (
                                <p></p>
                            )} 
                        </Col>
                    )}  
                    <Col sm={2}>
                       Zespół {team?.name}: <br />
                       {teamUsers?.map((user, index) => 
                            <>
                                <span key={index}>{user.firstname} {user.lastname}</span> <br/>
                            </>
                       )}

                    </Col>            
                </Row>

                <RemoveColumnModalComponent
                    setClose={setClose}
                    columnId={columnToDelete}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    />

                <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header closeButton>
                    <Modal.Title>Szczegóły</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <CardDetailsModal />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={submitCloseDetails}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showComments} onHide={handleCloseComments}>
                    <Modal.Header closeButton>
                    <Modal.Title>Komentarze</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <CardCommentsModal />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={submitCloseComments}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>

                <span className="mt-4 mt-md-0 me-5"><AddNewColumnButton route={"/add-new-column"} selectedBoard={ownBoard} /></span>
            </Container>
        </>
    )
}

export default DefaultKanbanBoardComponent;