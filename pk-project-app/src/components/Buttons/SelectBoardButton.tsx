import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setBoard } from "../../state/boardColumns/action";
import { setColumns } from "../../state/columnCards/action";
import { IBoardButtonProps } from "./constants";

const SelectBoardButton= (props: IBoardButtonProps) => {
    const dispatch = useDispatch();

    const setSelectedBoard = () => {
        dispatch(setBoard(props.selectedBoard));
    }

    return (
        <Link to={{pathname: props.route + `-${props.selectedBoard.boardTypeId}`}}>
            <Button onClick={setSelectedBoard} variant="primary">{props.selectedBoard.name}</Button>
        </Link>
        
    )
}

export default SelectBoardButton;