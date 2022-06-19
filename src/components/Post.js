import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, dataBase, storage } from "../data/fireBase";
import { deleteObject, ref } from "firebase/storage";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import LikePost from "../UI/LikePost";
import { useAuthState } from "react-firebase-hooks/auth";
// import Comment from "./Comment";

const Post = () => {
  const [posts, setPosts] = useState([]);
  // const [imageList, setImageList] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getPosts = collection(dataBase, "posts");
    const q = query(getPosts, orderBy("createdtime", "desc"));
    onSnapshot(q, (snapshot) => {
      const post = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      console.log(posts);
      setPosts(post);
    });
  }, []);
  // console.log(posts);

  // const deleteMsgHandler = () => {
  //   setDeleteMsg(true);
  //   setTimeout(() => {
  //     setDeleteMsg(false);
  //   }, 2000);
  //   console.log(deleteMsg);
  // };

  const deleteHandler = async (imageURL, id) => {
    try {
      await deleteDoc(doc(dataBase, "posts", id));
      const storeRef = ref(storage, imageURL);
      await deleteObject(storeRef);
      setDeleteMsg(true);
      setTimeout(() => {
        setDeleteMsg(false);
      }, 2000);
      console.log(deleteMsg);
    } catch (error) {
      console.log(error);
    }
  };

  // const likeHandler = async (id) => {
  //   setIsLiked(!isLiked);
  //   try {
  //     await updateDoc(doc(dataBase, "posts", id), {
  //       isliked: isLiked,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      {deleteMsg && (
        <p className="bg-danger text-center text-light m-5 p-5">
          Post deleted successfully
        </p>
      )}
      {posts.length === 0 ? (
        <p>No Posts added yet!</p>
      ) : (
        posts.map((item) => {
          // console.log(item.image);
          return (
            <div className="border mt-3 p-3 bg-light" key={item.id}>
              <div className="d-flex justify-content-between">
                <div className="col-3 m-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ height: 150, width: 150 }}
                  />
                </div>
                <div className="col-9 ps-5">
                  <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6 d-flex flex-row-reverse"></div>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{item.createdtime.toDate().toDateString()}</p>
                  <h4>{item.description}</h4>
                  <div className="d-flex justify-content-between border align-items-center ">
                    {/* <button className="col-4 btn-sm btn-success">
                      Add Comment
                    </button> */}
                    <Link
                      to={`viewpost/${item.id}`}
                      className="col-4 btn-sm btn-success text-center text-decoration-none"
                    >
                      View Post
                    </Link>
                    {user && <LikePost like={item.likes} id={item.id} />}
                  </div>
                  <div className="d-flex flex-direction-row justify-content-between">
                    {item.comments && (
                      <p className="">{item.comments.length} comments</p>
                    )}
                    {item.likes && (
                      <p className="">{item.likes.length} Likes</p>
                    )}
                  </div>
                  {user && (
                    <button
                      onClick={() => deleteHandler(item.image, item.id)}
                      className="col-4 btn btn-danger p-2 m-2"
                    >
                      Delete Post
                    </button>
                  )}

                  {/* <button id={item.id} className="col-4 btn btn-danger p-2 m-2">
                    Update Post
                  </button> */}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Post;
