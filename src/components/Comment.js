import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
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
  const [updatedComment, setUpdatedComment] = useState("");
  const [WantToUpdateComment, setWantToUpdateComment] = useState(false);
  const [updatedMsgErro, setUpdatedMsgError] = useState(false);
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

  const addCommentHandler = (commentEntered) => {
    if (commentEntered.length > 1) {
      const commentId = Math.random(Math.floor * 100)
        .toString()
        .substring(10);
      const docRef = doc(dataBase, "posts", id);
      updateDoc(docRef, {
        comments: arrayUnion({
          commentId: commentId,
          comment: commentEntered,
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

  const commentUpdateHandler = (comment, commentEntered) => {
    if (commentEntered.length > 2) {
      deleteCommentHandler(comment);
      setWantToUpdateComment(false);
      addCommentHandler(commentEntered);
    } else {
      console.log("error");
      setUpdatedMsgError(true);
      setTimeout(() => {
        setUpdatedMsgError(false);
      }, 2000);
    }
    setWantToUpdateComment(false);
  };

  const onUpateChange = (e) => {
    setUpdatedComment(e.target.value);
  };
  const updateToggleHandler = () => {
    setWantToUpdateComment(true);
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
            onClick={() => addCommentHandler(comment)}
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

      {updatedMsgErro && (
        <p className="bg-danger text-center text-light">
          Input shouldn't be empty
        </p>
      )}

      {comments &&
        comments.map((comment) => (
          <div key={comment.commentId}>
            <div className="d-flex  border p-2 mt-2 row  justify-content-between text-center">
              <div className="col-4">
                <div>{comment.comment}</div>
                {WantToUpdateComment && (
                  <input
                    type="text"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter your new comment"
                    onChange={onUpateChange}
                    style={{ width: "100%" }}
                  />
                )}
              </div>

              <div className="col-4">
                <button
                  className="btn btn btn-danger"
                  onClick={() => deleteCommentHandler(comment)}
                  style={{ width: 120 }}
                >
                  Delete
                </button>
                {WantToUpdateComment ? (
                  <button
                    className="btn btn btn-primary mt-2"
                    onClick={() =>
                      commentUpdateHandler(comment, updatedComment)
                    }
                    style={{ width: 120 }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    className="btn btn btn-primary mt-2"
                    onClick={updateToggleHandler}
                    style={{ width: 120 }}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comment;
