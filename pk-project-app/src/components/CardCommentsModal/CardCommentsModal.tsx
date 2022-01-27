import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ICard, IState, IUser } from "../../state";
import { Comment } from "./constants";
import "react-datepicker/dist/react-datepicker.css";
import { createComment, getCommentByCardId } from "../../api/comments";

const CardCommentsModal = () => {
    const userInfo = useSelector<IState, IUser>((state) => state.userInfo);
    const [comments, setComments] = useState<Comment[] | undefined>();
    const selectedCard = useSelector<IState, ICard>((state) => state.card);
    const [commentAdded, setCommentAdded] = useState(false);

    useEffect(() => {
      getCommentByCardId(selectedCard.id).then((response) => {
        setComments(response);
        setCommentAdded(false);
      }).catch(err => console.log(err))
    }, [commentAdded])

    const submitHandler = (values: any, handlers: any) => {
        createComment(userInfo.email, selectedCard.id, values.comment);
        setCommentAdded(true);
    }


    return (
      <Formik 
        onSubmit={submitHandler}
        initialValues={selectedCard}
        enableReinitialize>
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
                  <Form.Label>Komentarze:</Form.Label>
                  <div>
                    <hr/>
                  {comments?.map((comment, index) =>
                    <div>
                      <p><b>{comment.content} </b> - {comment.userEmail} - {comment.date}</p>
                      <hr/>
                    </div>
                    )}
                  </div>  
        </Form.Group>
        <br/>
        <Form.Group>
                  <Form.Label>Napisz komentarz</Form.Label>
                  <Form.Control
                    type="text"
                    name="comment"
                    placeholder="Napisz..."
                    onChange={handleChange}
                  />
        </Form.Group>
        <Button variant="primary" type="submit">
          Dodaj komentarz
        </Button>
      </Form>
      )}
      </Formik>
    );
  };

  export default CardCommentsModal;