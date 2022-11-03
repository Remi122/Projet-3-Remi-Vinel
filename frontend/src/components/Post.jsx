import PostFooter from "./PostFooter";

const Post = ({ post }) => {
  return (
    <article className="post">
      <p className="name">{post.userName}</p>
      <p className="date">{post.date}</p>
      <p className="message">{post.message}</p>
      {post.imageUrl ? (
        <div className="image">
          <img
            src={post.imageUrl}
            alt={"image accompagnant le post de " + post.userName}
          />
        </div>
      ) : null}

      <PostFooter post={post} />
    </article>
  );
};

export default Post;
