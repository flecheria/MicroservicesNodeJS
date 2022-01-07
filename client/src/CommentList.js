import React from "react";
// import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // https://namespaceit.com/blog/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <ul>{renderedComments}</ul>
  );
};

export default CommentList;
