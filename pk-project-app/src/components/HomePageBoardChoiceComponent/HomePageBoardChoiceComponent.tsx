import { useEffect, useState } from "react";
import { getBoardTypes } from "../../api/boardTypes";
import { BoardTypes } from './constants';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Board } from "../CreateScrumTableComponent/constants";
import { getBoardByTeamId, getMyAllBoards } from "../../api/boards";
import SelectBoardButton from "../Buttons/SelectBoardButton";
import './Style.css';
import LoginComponent from "../AuthComponent/LoginComponent";
import TeamsWithUsersComponent from "../TeamsWithUsersComponent/TeamsWithUsersComponent";
import { ILoggedIn, IState, IToken } from "../../state";
import { useSelector } from "react-redux";

const HomePageBoardChoiceComponent = () =>{
    const userToken = useSelector<IState, IToken>((state) => state.token);
    const [boardTypes, setBoardTypes] = useState<BoardTypes[]>();
    const [boards, setBoards] = useState<Board[]>();
    let boardType = "";

    useEffect(() => {
        getBoardTypesAndBoards();
    }, [])

    const getBoardTypesAndBoards = async () => {

        const boardTypesResponse = await getBoardTypes();
        setBoardTypes(boardTypesResponse);
        
        const boardsResponse = await getMyAllBoards();
        setBoards(boardsResponse);
    }

    return (
        <>
                <Row>
                <Col sm={8}>
                    <Row>
                        <h3>Wybierz na jakiej tablicy chcesz działać</h3>
                    </Row>
                    <Row>
                        {boardTypes?.map((boardType, index) =>
                            <Link to={`/new-${boardType.name}`}>
                                <Button key={index} type="submit">{boardType.name}</Button>
                            </Link>
                        )}
                        
                    </Row>

                    {userToken.token != "" ? (
                        <>
                            <Row>
                            <h3>Twoje tablice:</h3>
                            </Row>
                            <Row>
                                {boards?.map((board, index) =>     
                                    <span className="mt-4 mt-md-0 me-5"><SelectBoardButton route={`/table`} selectedBoard={board} /></span>
                                )}           
                            </Row>
                        </>
                    ) : (
                        <p></p>
                    )}
                </Col>
                <Col sm={4}>
                    {userToken.token != "" ? (
                        <TeamsWithUsersComponent />
                    ) : (
                        <p></p>
                    )}
                    
                </Col>
                </Row>
        </>
    )
}

export default HomePageBoardChoiceComponent;