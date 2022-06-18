import React from "react";
// import { Timestamp } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../data/fireBase';
import { Link } from "react-router-dom";

const Form = ({
  user,
  formData,
  uploadingPost,
  errorMsg,
  onChangeHandler,
  onChangeImage,
  postClick,
  postMessage,
  btnTitle,
  title,
}) => {
  // const [user] = useAuthState(auth)
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   image: "",
  //   createdtime: Timestamp.now().toDate(),
  // });
  //   const [uploadingPost, setUploadingPost] = useState(false);
  //     const [errorMsg, setErrorMsg] = useState(false);

  return (
    <div>
      {user ? (
        <>
          {postMessage && (
            <p className="bg-success text-center text-light">
              Post added successfully
            </p>
          )}
          {errorMsg && (
            <p className="bg-danger text-center  text-light">
              Please fill the inputs
            </p>
          )}
          <h2>{title} Your Post</h2>
          <label htmlFor="">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => onChangeHandler(e)}
          />

          <label htmlFor="">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={(e) => onChangeHandler(e)}
          />

          <label htmlFor="">Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="form-control"
            onChange={(e) => onChangeImage(e)}
          />
          {uploadingPost && (
            <p className="bg-success text-center text-light">loading...</p>
          )}

          <button className="form-control btn-primary mt-2" onClick={postClick}>
            {btnTitle}
          </button>
        </>
      ) : (
        <>
          <p>
            <span>
              <Link to="signin">Loing</Link> to create/add new posts
            </span>
          </p>
          <p>
            if you don't have user account,{" "}
            <span>
              <Link to="register">SignUP</Link>
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
