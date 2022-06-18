import React from "react";
import AddPost from "../components/AddPost";
import Post from "../components/Post";

const PostsPage = ({ render, renderHandler }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <Post render={render} />
        </div>
        <div className="col-md-4">
          <AddPost renderHandler={renderHandler} />
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
