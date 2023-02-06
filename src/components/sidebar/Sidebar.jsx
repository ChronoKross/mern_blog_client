import './sidebar.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get(
        "https://thedailyescape-api.onrender.com/api/categories"
      );
      setCategories(res.data);
    }
    getCategory()
  }, [])


  return (
    <div className="sidebar">
      <div className="sidebar--item">
        <span className="sidebar--title">ABOUT ME</span>
        <img
          className="sidebar--picture"
          src="https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-9/158432679_4043535989010946_2862607138705131839_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bnwr1lVRUtIAX8brlTr&_nc_ht=scontent-iad3-2.xx&oh=00_AfAXxzyQfe-lft9FcRf6hn2e3w0OsuFM38Ap0fe1j8kCYw&oe=63D58C05"
          alt="profile pic"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore neque
          nulla placeat sequi?
        </p>
      </div>
      <div className="sidebar--item">
        <span className="sidebar--title">CATEGORIES</span>
        <ul className="sidebar--list">
          {categories.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebar--list-item" key={c._id}>
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebar--item">
        <span className="sidebar--title">FOLLOW ME</span>
        <div className="sidebar--social">
          <i className="sidebar--icon fa-brands fa-facebook"></i>
          <i className="sidebar--icon fa-brands fa-instagram"></i>
          <i className="sidebar--icon fa-brands fa-youtube"></i>
        </div>
      </div>
    </div>
  );
}
