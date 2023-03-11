import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;

  if (!items) {
    return <p>Loading...</p>;
  }

  if (items.length === 0) {
    return <p>No Comments.</p>;
  }

  return (
    <ul className={classes.comments}>
      {
        /* Render list of comments - fetched from API */
        items.map((item) => (
          <li key={item._id}>
            <p>{item.comment}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default CommentList;
