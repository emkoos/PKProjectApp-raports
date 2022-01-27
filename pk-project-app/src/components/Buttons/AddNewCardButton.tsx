import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setColumns } from "../../state/columnCards/action";
import { ICardButtonProps } from "./constants";

const AddNewCardButton= (props: ICardButtonProps) => {
    const dispatch = useDispatch();

    const setSelectedColumn = () => {
        dispatch(setColumns(props.selectedColumn));
    }

    return (
        <Link to={{pathname: props.route}}>
            <Button onClick={setSelectedColumn} variant="primary">Dodaj kartę +</Button>
        </Link>
    )
}

export default AddNewCardButton;