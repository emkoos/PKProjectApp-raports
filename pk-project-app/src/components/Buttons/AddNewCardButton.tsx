import { faInfoCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setColumns } from "../../state/columnCards/action";
import { ICardButtonProps } from "./constants";
import "./Style.css";

const AddNewCardButton= (props: ICardButtonProps) => {
    const dispatch = useDispatch();

    const setSelectedColumn = () => {
        dispatch(setColumns(props.selectedColumn));
    }

    return (
        <Link to={{pathname: props.route}}>
            <Button title="Dodaj kartę" className="add-card-button" onClick={setSelectedColumn} variant="primary">
                <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </Button>
        </Link>
    )
}

export default AddNewCardButton;