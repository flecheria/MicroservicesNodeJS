import React from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  
  const renderedComments = comments.map((comment) => {

    let content;

    if (comment.status === 'pending') {
      content = 'This comment is pending';
    }

    if (comment.status === 'approved') {
      content = comment.content;
    }

    if (comment.status === 'rejected') {
      content = 'this comment has been rejected';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return (
    <ul>{renderedComments}</ul>
  );
};

export default CommentList;
