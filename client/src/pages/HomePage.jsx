import React, { useEffect, useState } from "react";
import axios from "axios";
import { format} from "date-fns";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("https://react-blog-server-seven.vercel.app/api/get-posts");
        setPosts(response.data);
      } catch (error) {
        console.log("Unable to fetch Your Posts", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <main className="flex justify-center ">
      <div className="flex flex-col mt-4  w-[100%] md:w-[70%] lg:w-[60%]">
        {posts.map((post, index) => (
          <Link key={index} to={`/post-page/${post._id}`}>
            <div className="flex items-center gap-10">
              <div className="mb-4">
                <img
                  src={`https://react-blog-server-seven.vercel.app/${post.file}`}
                  className="w-[300px] h-[200px] cursor-pointer"
                  alt={post.title}
                />
              </div>
              <div className="flex-col cursor-pointer ">
                <h1>{post.title}</h1>
                <p>
                  Created By:
                  {post.author && post.author.username
                    ? post.author.username
                    : "Unknown Author"}
                </p>
                <h1>Created At: {format(new Date(post.createdAt),"EEE do MMMM yyy h:mm a")}</h1>
                <p>{post.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
