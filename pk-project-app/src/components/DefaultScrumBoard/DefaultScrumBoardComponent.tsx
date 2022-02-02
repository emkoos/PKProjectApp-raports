import React, { useEffect, useState, useRef } from "react";
import './Style.css';
import { Columns } from './constants';
import { Container, Row, Button, Col, Card, Modal } from 'react-bootstrap';
import { getColumnByBoardId } from "../../api/columns";
import { getCardByColumnId, getCardById, editCard, deleteCard } from "../../api/cards";
import AddNewCardButton from "../Buttons/AddNewCardButton";
import AddNewColumnButton from "../Buttons/AddNewColumnButton";
import { IBoard, ICard, IState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import columnReducer from "../../state/columnCards/reducers";
import { reduceEachTrailingCommentRange } from "typescript";
import { setCard } from "../../state/cardInfo/action";
import CardDetailsModal from "../CardDetailsModalComponent/CardDetailsModal";
import CardCommentsModal from "../CardCommentsModal/CardCommentsModal";
import RemoveColumnModalComponent from "../RemoveColumnModalComponent/RemoveColumnModalComponent";
import { setColumns } from "../../state/columnCards/action";
import { getTeamById, getUsersByTeamId } from "../../api/teams";
import { Team } from "../CreateScrumTableComponent/constants";
import { User } from "../TeamsWithUsersComponent/constants";
import { faComments, faInfoCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DefaultScrumBoardComponent = () =>{
    const scrumBoard = useSelector<IState, IBoard>((state) => state.board);
    
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

    const handleCloseDetails = () => setShowDetails(false);
    const handleCloseComments = () => setShowComments(false);

    const refOld = useRef("");
    const refNew = useRef("");
    const refCardId = useRef("");
    const refOutSide = useRef(false);

    useEffect(() => {
        setClose(false);
        getColumnsAndCards();
    }, [close])



    const getColumnsAndCards = async () => {
        const columnsResult = await getColumnByBoardId(scrumBoard.id);
        setColumns1(columnsResult);
        const values = await Promise.all<Columns>(columnsResult?.map(async (result: any) => {
            const response = await getCardByColumnId(result.id);
            return {
                ...result,
                cards: response
            }
        }));
        setColumnsWithCards(values);    
        
        const getTeam = await getTeamById(scrumBoard.teamId);
        setTeam(getTeam);

        const getUsers = await getUsersByTeamId(scrumBoard.teamId);
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

                console.log(event);
                //@ts-ignore
                let childNodes = event.nativeEvent.path[event.nativeEvent.path.length - 9].childNodes;
                for(let i = 0; i < childNodes.length; i++) {
                    if(i == 3) {
                        if(childNodes[i].id === "deleteColumn") {
                            childNodes[i].childNodes[0].addEventListener('click', () => deleteColumnButtonClicked(columnId));
                        }
                    }
                    if(i > 3) {
                        let cardId = childNodes[i].attributes[1].value;
                        childNodes[i].attributes[2].value = columnId;
                        childNodes[i].addEventListener('dragstart', (e: React.DragEvent<HTMLElement>) => dragStartHandler(e, cardId, columnId));
                        childNodes[i].addEventListener('dragend', (e: React.DragEvent<HTMLElement>) => dragEndHandler(e, columnId));
                    }
                }

                if(refCardId.current !== "") {
                    let response = await getCardById(refCardId.current);
                    await editCard(response.id, response.title, response.description, response.userEmail, columnId, response.statusId, response.createdDate, response.updatedStatusDoneDate, response.deadlineDate, response.priority, response.estimate, response.attachment);
                    refCardId.current = "";
                    refOld.current = "";

                    //@ts-ignore
                    let childNodes = event.nativeEvent.path[event.nativeEvent.path.length - 9].childNodes;
                    for(let i = 0; i < childNodes.length; i++) {
                        if(childNodes[i].id === "card") {
                            if(childNodes[i].childNodes[0].id === "card-body") {
                                let num = childNodes[i].children[0].childNodes.length;
                                let child = childNodes[i].childNodes[0].childNodes;
                                let card = await getCardById(response.id);
                                
                                for(let i=num-1; i>num-4; i--) {
                                    if(child[i].id === "card-body-button-details") {
                                        child[i].addEventListener('click', () => handleShowDetails(card));
                                    }
                                    else if(child[i].id === "card-body-button-delete") {
                                        child[i].addEventListener('click', () => deleteThisCard(card));
                                    }
                                    else if(child[i].id === "card-body-button-comment") {
                                        child[i].addEventListener('click', () => handleShowComments(card));
                                    }
                                }
                            }
                        }
                    }
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
        setColumnsWithCards([]); 
        setClose(true);
        handleCloseDetails();
    }
    const submitCloseComments = () => {
        setColumnsWithCards([]); 
        setClose(true);
        handleCloseComments();
    }

    const deleteThisCard = (card: any) => {
        setColumnsWithCards([]); 
        setClose(true);
        deleteCard(card.id);
    }

    const deleteColumnButtonClicked = (columnId: string) => {
        setColumnsWithCards([]); 
        setClose(true);
        setModalShow(true);
        setColumnToDelete(columnId);
    }

    return (

            <Container> 
                    <h3>Tablica {scrumBoard.name} </h3>
                    <h6>Zespół <b>{team?.name}:</b> 
                        {teamUsers?.map((user, index) => 
                            <>
                                <span className="user-names"><i key={index}> {user.firstname} {user.lastname}</i></span><span className="comma">,</span>
                            </>
                       )}</h6>
                    
                    
                <Row>
                    {columnsWithCards?.sort((a, b) => a.position-b.position)
                    .map((column, index) =>
                        <Col className="table-column border bg-dark position-relative" key={index} data-columnid={column.id} onDragEnter={dragEnterHandler} onDragOver={allowDrop} onDrop={(event) => dropHandler(event, column.id)} draggable={false}>
                                {column.title}<br/>
                                <span className="mt-4 mt-md-0 me-5"><AddNewCardButton route={"/add-new-card"} selectedColumn={column} /></span>
                            <div id="deleteColumn" className="deleteButton bg-dark">
                                <button className="del-column-button" onClick={() => deleteColumnButtonClicked(column.id)}>
                                    Usuń kolumnę
                                </button> 
                            </div>
                            {column.cards?.sort((a,b) => a.priority-b.priority)
                            .map((card, key) =>
                            <Card className="column-card" key={key} id="card" data-cardid={card.id} data-columnid={card.columnId} onDragStart={(event) => dragStartHandler(event, card.id, card.columnId)} onDragEnd={(event) => dragEndHandler(event, column.id)} draggable={true}>
                            <Card.Body id="card-body">
                                <Card.Title><b>{card.title}</b></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Termin: {card.deadlineDate}</Card.Subtitle>
                                <Card.Text>Effort: {card.estimate}</Card.Text>
                                <Card.Text>
                                    {card.userEmail}
                                </Card.Text>
                                <Button className="card-button" title="Zobacz szczegóły" id="card-body-button-details" onClick={() => handleShowDetails(card)}>
                                    <FontAwesomeIcon className="font-aw" icon={faInfoCircle} size="2x" />
                                </Button>
                                <Button className="card-button ms-2" title="Komentarze" id="card-body-button-comment" onClick={() => handleShowComments(card)}>
                                    <FontAwesomeIcon className="font-aw" icon={faComments} size="2x" />
                                </Button>    
                                <Button className="ms-2" variant="danger" title="Usuń kartę" id="card-body-button-delete" onClick={() => deleteThisCard(card)}>
                                    <FontAwesomeIcon className="font-aw" icon={faTrashAlt} size="2x" />
                                </Button>                        
                            </Card.Body>
                        </Card>
                            )}    
                        </Col>
                        
                    )}   
                        
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
                <Row className="btnbackground bg-dark"><Col></Col></Row>
                <span className="mt-4 mt-md-0 me-5 add-col-button"><AddNewColumnButton route={"/add-new-column"} selectedBoard={scrumBoard} /></span>
            </Container>
    )
}

export default DefaultScrumBoardComponent;