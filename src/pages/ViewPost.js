import { doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { auth, dataBase, storage } from "../data/fireBase";
import LikePost from "../UI/LikePost";
import Form from "../UI/Form";

const ViewPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdtime: Timestamp.now().toDate(),
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [uploadingPost, setUploadingPost] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [postMessage, setPostMessage] = useState(false);

  const { id } = useParams();
  const [post, setPost] = useState();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(dataBase, "posts", id);
    onSnapshot(docRef, (snapshot) => {
      setPost({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const postClick = () => {
    const description = formData.description.length > 5;
    const title = formData.title.length > 2;
    if (!title || !description || !formData.image) {
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 3000);
      console.log(formData.image);

      return;
    }
    const docRef = doc(dataBase, "posts", id);
    const storeRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storeRef, formData.image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressGet = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadingPost(true);
        if (progressGet === 100) {
          setUploadingPost(false);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          updateDoc(docRef, {
            title: formData.title,
            description: formData.description,
            image: url,
            createdtime: Timestamp.now().toDate(),
          })
            .then(() => {
              setPostMessage(true);
              setTimeout(() => {
                setPostMessage(false);
              }, 2000);
            })
            .catch((er) => {
              console.log(er);
            });
        });
      }
    );
  };

  return (
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      {post && (
        <div className="row justify-content-between">
          <div className="col-3">
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                padding: 10,
                maxWidth: 300,
                maxHeight: 200,
              }}
            />
            <div className="col-9 mt-3">
              <h2>{post.title}</h2>
              <div>Post's date: {post.createdtime.toDate().toDateString()}</div>
              <hr />
              <h4>{post.description}</h4>

              <div className="d-flex flex-row-reverse">
                {user && <LikePost id={post.id} like={post.likes} />}
              </div>
            </div>
          </div>
          <div className="col-5">
            <Comment id={post.id} />
          </div>

          <div className="col-4">
            <div className="text-center mt-2">
              <button
                className="btn btn-lg btn-primary ms-4 "
                onClick={toggleUpdateForm}
              >
                {showUpdateForm ? "Cancel" : "Upate Post"}
              </button>
            </div>
            {showUpdateForm && (
              <div className="border mt-2">
                <Form
                  user={user}
                  formData={formData}
                  uploadingPost={uploadingPost}
                  errorMsg={errorMsg}
                  onChangeHandler={onChangeHandler}
                  onChangeImage={onChangeImage}
                  postClick={postClick}
                  postMessage={postMessage}
                  btnTitle="Update"
                  title="Update"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
