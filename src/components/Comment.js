import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, dataBase } from "../data/fireBase";

const Comment = ({ id }) => {
  const [comment, setcomment] = useState("");
  const [comments, setComments] = useState([]);
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(dataBase, "posts", id);
    onSnapshot(docRef, (snapShot) => {
      setComments(snapShot.data().comments);
    });
  }, []);

  const deleteCommentHandler = (comment) => {
    const commentRef = doc(dataBase, "posts", id);

    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then(() => {
        console.log("comment removed");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const commentChangeHandler = (e) => {
    setcomment(e.target.value);
  };

  const addCommentHandler = () => {
    if (comment.length > 1) {
      const commentId = Math.random(Math.floor * 100)
        .toString()
        .substring(10);
      const docRef = doc(dataBase, "posts", id);
      updateDoc(docRef, {
        comments: arrayUnion({
          commentId: commentId,
          comment: comment,
          createdTime: new Date(),
        }),
      }).then(() => {
        setcomment("");
      });
    } else {
      console.log("comment can not be empty");
      setIsCommentEmpty(true);
      setTimeout(() => {
        setIsCommentEmpty(false);
      }, 2000);
    }
  };

  //   console.log(comments);

  return (
    <div className="container">
      <h2 className="text-center">Comments</h2>
      {user && (
        <div className="form-group mb-5">
          <input
            type="text"
            className="form-control mt-2 mb-2"
            placeholder="Add comment"
            value={comment}
            onChange={commentChangeHandler}
            style={{
              width: "100%",
            }}
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={addCommentHandler}
          >
            Add
          </button>
          {isCommentEmpty && (
            <div className="bg-danger mt-2">
              <p className="text-center text-light">
                Comment Shouldn't be empty
              </p>
            </div>
          )}
        </div>
      )}

      {comments &&
        comments.map((comment) => (
          <div key={comment.commentId}>
            <div className="d-flex  border p-2 mt-2 row  justify-content-between text-center">
              <div className="col-4">{comment.comment}</div>
              <div className="col-4">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteCommentHandler(comment)}
                >
                  Delete Comment
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comment;
