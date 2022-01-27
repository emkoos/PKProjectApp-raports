import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setBoard } from "../../state/boardColumns/action";
import { setColumns } from "../../state/columnCards/action";
import { IColumnButtonProps } from "./constants";

const AddNewColumnButton= (props: IColumnButtonProps) => {
    const dispatch = useDispatch();

    const setSelectedBoard = () => {
        dispatch(setBoard(props.selectedBoard));
    }

    return (
        <Link to={{pathname: props.route}}>
            <Button onClick={setSelectedBoard} variant="primary">Dodaj kolumnę</Button>
        </Link>
    )
}

export default AddNewColumnButton;