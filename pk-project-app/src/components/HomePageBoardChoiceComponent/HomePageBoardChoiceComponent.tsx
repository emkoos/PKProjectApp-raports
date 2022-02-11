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
import RaportsDoneUserComponent from "../RaportsComponent/RaportsDoneUserComponent";

const HomePageBoardChoiceComponent = () =>{
    const userToken = useSelector<IState, IToken>((state) => state.token);
    const [boardTypes, setBoardTypes] = useState<BoardTypes[]>();
    const [boards, setBoards] = useState<Board[]>();
    const [info, setInfo] = useState<string | null>('');
    let boardType = "";

    useEffect(() => {
        getBoardTypesAndBoards();
        setInfo(localStorage.getItem("Info"));
        localStorage.setItem("Info", '');
    }, [])

    const getBoardTypesAndBoards = async () => {

        const boardTypesResponse = await getBoardTypes();
        setBoardTypes(boardTypesResponse);
        
        const boardsResponse = await getMyAllBoards();
        setBoards(boardsResponse);
    }

    const generateRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const rgbGenerate = () => {
        let r = generateRandomNumber(0, 255);
        let g = generateRandomNumber(0, 255);
        let b = generateRandomNumber(0, 255);

        return r + ',' + g + ',' + b;
    }

    const formatDate = (date: any, isHours = false) => {
        let dateStr = '';

        if (isHours) {
            dateStr =
                date.getFullYear() + "-" +
                ("00" + date.getDate()).slice(-2) + "-" +
                ("00" + (date.getMonth() + 1)).slice(-2) + " " +
                ("00" + date.getHours()).slice(-2) + ":" +
                ("00" + date.getMinutes()).slice(-2) + ":" +
                ("00" + date.getSeconds()).slice(-2);
        }
        else {
            dateStr =
                date.getFullYear() + "-" +
                ("00" + date.getDate()).slice(-2) + "-" +
                ("00" + (date.getMonth() + 1)).slice(-2);
        }

        return dateStr;
    }

    const dateRange = (isHours = false) => {
        const dateArray = [];

        for (let i = 13; i >= 0; i--) {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);
            dateArray.push(formatDate(new Date(currentDate), isHours));
        }
        return dateArray;
    }

    const labels = dateRange();

    return (
        <>
                <Row>
                <Col sm={8}>
                    {info != '' ? (
                        <Row className="registerInfo">
                            <h6>{info}</h6>
                        </Row>
                    ) : (
                        <></>
                    )}        
                    <Row>
                        <h3>Utwórz nową tablicę:</h3>
                    </Row>
                    <Row className="mt-3">
                        {boardTypes?.map((boardType, index) =>
                        <>
                        <Col>
                            <Link to={`/new-${boardType.name}`}>
                                <button className="board-type-button" key={index} type="submit">{boardType.name == "Own" ? (
                                        <>Własna</>
                                    ) : (
                                        <>{boardType.name}</>
                                    )}
                                </button>
                            </Link>
                            <div className="clear"></div>
                        </Col>
                        </>
                        )}
                        
                    </Row>

                    {userToken.token != "" ? (
                        <>
                            <Row className="mt-5">
                            <h3>Twoje tablice:</h3>
                            </Row>
                            <Row className="board-list">
                                
                                {boards?.map((board, index) =>    
                                    <div className="board-element">
                                    <SelectBoardButton route={`/table`} selectedBoard={board} />
                                    </div>
                                )}           
                            </Row>
                            <Row>
                                <Col className="raport-col">
                                    <RaportsDoneUserComponent labels={labels} rgbGenerate={rgbGenerate} formatDate={formatDate} />
                                </Col>
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