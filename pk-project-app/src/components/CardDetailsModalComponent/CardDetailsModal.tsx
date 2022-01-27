import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editCard } from "../../api/cards";
import { getStatus, getStatuses } from "../../api/statuses";
import { ICard, IState, IUser } from "../../state";
import { Comment, Status } from "./constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { getCommentByCardId } from "../../api/comments";

const CardDetailsModal = () => {
    const [statuses, setStatuses] = useState<Status[] | undefined>();
    const [date, setDate] = useState<Date | null | undefined>();
    const [comments, setComments] = useState<Comment[] | undefined>();
    const selectedCard = useSelector<IState, ICard>((state) => state.card);

    useEffect(() => {
      getStatuses().then((response) => {
        setStatuses(response)
      }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
      var selectedDate = new Date(selectedCard.deadlineDate); 
      setDate(selectedDate);
    }, [])

    useEffect(() => {
      getCommentByCardId(selectedCard.id).then((response) => {
        setComments(response);
      }).catch(err => console.log(err))
    }, [])

    const submitHandler = (values: any, handlers: any) => {
      let month: any =(date) ? date.getMonth() + 1 : undefined;
      let day: any = (date) ?  date.getDate() : undefined;
      let hour: any = (date) ? date.getHours() - 1 : undefined;
      let minutes: any = (date) ? date.getMinutes() : undefined;

      let formattedMonth = `${month < 10 ? `0${month}` : month}`;
      let formattedDay = `${day < 10 ? `0${day}` :  day}`;
      let formattedHour = `${hour < 10 ? `0${hour}` : hour}`;
      let formattedMinutes = `${minutes < 10 ? `0${minutes}` :  minutes}`;
      console.log(formattedHour);
      let dateString: any = (date) ? date.getFullYear().toString() + '-' + formattedMonth + '-' + formattedDay + 'T' + formattedHour + ':' + formattedMinutes + ':00.064Z'  : undefined;

      console.log(dateString);
      editCard(selectedCard.id, values.title, values.description, values.userEmail, selectedCard.columnId, values.statusId, selectedCard.createdDate, selectedCard.updatedStatusDoneDate, dateString, values.priority, values.estimate, "");
    }

    const commentHandler = (values: any) => {
      console.log(values.comment);
    }

    return (
      <Formik 
        onSubmit={submitHandler}
        initialValues={selectedCard}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nazwa karty</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder={selectedCard.title}
            defaultValue={selectedCard.title}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Przypisany użytkownik</Form.Label>
          <Form.Control
            type="text"
            name="userEmail"
            placeholder={selectedCard.userEmail}
            defaultValue={selectedCard.userEmail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder={selectedCard.description}
            defaultValue={selectedCard.description}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Termin"
              value={date}
              onChange={(date) => {
                setDate(date);
              }}
            />
          </LocalizationProvider>
        </Form.Group>

        <Form.Group>
          <Form.Label>Priorytet</Form.Label>
          <Form.Control
            type="number"
            name="priority"
            defaultValue={selectedCard.priority}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Effort</Form.Label>
          <Form.Control
            type="number"
            name="estimate"
            defaultValue={selectedCard.estimate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Select name="statusId" className="select-input" value={values.statusId} onChange={handleChange}>
            {statuses?.map((status, index) =>
              <option key={index} value={status.id}>{status.name}</option>
            )}
          </Form.Select>
        </Form.Group>

        <br/>
        <Button variant="primary" type="submit">
          Zapisz zmiany
        </Button>
      </Form>
      )}
      </Formik>
    );
  };

  export default CardDetailsModal;