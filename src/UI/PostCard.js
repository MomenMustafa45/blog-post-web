import React from "react";
import LikePost from "./LikePost";

const PostCard = ({
  id,
  image,
  title,
  createdTime,
  description,
  likedHandler,
  isLiked,
  deletePostHandler,
}) => {
  return (
    <>
      <div className="border mt-3 p-3 bg-light">
        <div className="d-flex justify-content-between">
          <div className="col-3">
            <img src={image} alt={title} style={{ height: 180, width: 180 }} />
          </div>
          <div className="col-9 ps-5">
            <h2>{title}</h2>
            <p>{createdTime}</p>
            <h4>{description}</h4>
            <div className="d-flex justify-content-between border align-items-center ">
              <button className="col-4 btn-sm btn-success">Add Comment</button>
              <button className="col-4 btn-sm btn-success">
                View Comments
              </button>
              <button
                className="btn btn-light p-2"
                onClick={() => likedHandler(id)}
              >
                <LikePost like={isLiked} />
              </button>
            </div>
            <button
              onClick={() => deletePostHandler(image, id)}
              className="col-4 btn btn-danger p-2 m-2"
            >
              Delete Post
            </button>
            <button className="col-4 btn btn-primary p-2 m-2">
              Update Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
