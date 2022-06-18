import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, dataBase } from "../data/fireBase";

const LikePost = ({ id, like }) => {
  const [user] = useAuthState(auth);

  const likesRef = doc(dataBase, "posts", id);

  const likeHandler = () => {
    if (like?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log(like, "unliked");
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log(like, "liked");
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  // console.log(like);
  // console.log(user);

  return (
    <div>
      <button className="btn btn-light p-2" onClick={likeHandler}>
        <i
          className={
            !like?.includes(user.uid) ? "fa fa-heart-o" : "fa fa-heart"
          }
        ></i>
      </button>
    </div>
  );
};

export default LikePost;
