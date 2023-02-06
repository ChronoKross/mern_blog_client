import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import './home.css'
import Posts from '../../posts/Posts';
import axios from "axios";

export default function Home() {
 const [posts, setPosts] = useState([]);
 const {search} = useLocation();


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://thedailyescape-api.onrender.com/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
        <div className="home">
          <Posts posts={posts} />
          <Sidebar />
        </div>
    </>
  )
}
