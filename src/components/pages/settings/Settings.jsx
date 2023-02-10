import "./settings.css";
import Sidebar from "../../sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://thedailyescape-api.onrender.com/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        "https://thedailyescape-api.onrender.com/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };

  return (
    <div className="settings">
      <div className="settings--wrapper">
        <div className="settings--title">
          <span className="settings--update-title">Update Your Account</span>
          <span className="settings--delete-title">Delete Account</span>
        </div>
        <form className="settings--form" onSubmit={handleSubmit}>
          <label>Profile picture</label>
          <div className="settings--profile-pic">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePicture}
              alt=""
            />
            <label htmlFor="settings--file-input">
              <i className="settings--profile-pic-icon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="settings--file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="settings--submit-btn" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              Profile updated succesfully!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
