import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  //pf= public folder for static files/images/etc.
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <img
          className="post--image"
          src={PF + post.photo}
          alt=""
        />
      )}

      <div className="post--info">
        <div className="post--info-catagories">
          {post.categories.map((cat) => (
            <span className="post--info-catagorie">{cat.name}</span>
          ))}
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className="post--info-title">{post.title}</span>
        </Link>
        {/* <hr/> come back and fix */}
        <span className="post--info-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post--description">{post.description}</p>
    </div>
  );
}
