import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://thedailyescape-api.onrender.com/api/posts/" + path
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      // console.log(location)
    };

    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description,
      });
    //   window.location.reload();
    setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePost--image" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            className="singlePost--title-input"
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePost--title">
            {title}
            {/*if your current user of post, displays edit && delete */}
            {post.username === user?.username && (
              <div
                className="singlePost--edit"
                onClick={() => setUpdateMode(true)}
              >
                <i className="singlePost--icon fa-solid fa-pen-to-square"></i>
                <i
                  className="singlePost--icon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePost--info">
          <span className="singlePost--author">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePost--date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePost--description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlePost--description">{description}</p>
        )}
        {updateMode && (
          <button className="singlePost--button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
