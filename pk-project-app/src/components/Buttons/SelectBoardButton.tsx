import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setBoard } from "../../state/boardColumns/action";
import "./Style.css";
import { setColumns } from "../../state/columnCards/action";
import { IBoardButtonProps } from "./constants";

const SelectBoardButton= (props: IBoardButtonProps) => {
    const dispatch = useDispatch();

    const setSelectedBoard = () => {
        dispatch(setBoard(props.selectedBoard));
    }

    return (
        <Link to={{pathname: props.route + `-${props.selectedBoard.boardTypeId}`}}>
            <Button className="board-button" onClick={setSelectedBoard} variant="primary">{props.selectedBoard.name}</Button>
        </Link>
    )
}

export default SelectBoardButton;