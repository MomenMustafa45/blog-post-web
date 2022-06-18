import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, dataBase, storage } from "../data/fireBase";
import Form from "../UI/Form";

const AddPost = ({ renderHandler }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdtime: Timestamp.now().toDate(),
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [postMessage, setPostMessage] = useState(false);
  const [uploadingPost, setUploadingPost] = useState(false);
  const [user] = useAuthState(auth);

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
      renderHandler();
      return;
    }
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
          const postRef = collection(dataBase, "posts");
          addDoc(postRef, {
            title: formData.title,
            description: formData.description,
            image: url,
            createdtime: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
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
    renderHandler();
    console.log(formData.image);
  };

  //   console.log(formData);

  return (
    <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
      <Form
        user={user}
        formData={formData}
        uploadingPost={uploadingPost}
        errorMsg={errorMsg}
        onChangeHandler={onChangeHandler}
        onChangeImage={onChangeImage}
        postClick={postClick}
        postMessage={postMessage}
        btnTitle="Post"
        title="Create"
      />
    </div>
  );
};

export default AddPost;
