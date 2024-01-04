import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import CircleLoader from "react-spinners/CircleLoader";
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [remove, setRemove] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchById();
  }, []);
  const override = {
    display: "block",
    margin: "0 auto",
    marginTop:10
  };
  
  const fetchById = async () => {
    try {
      const response = await axios.get(
        `https://react-blog-server-seven.vercel.app/api/get-posts/${id}`
      );
      setPost(response.data);
      setLoading(false); 
    } catch (error) {
      alert("Unable to fetch the details of this blog post");
      setLoading(false); 
    }
  };

  const deletePost = async () => {
    try {
      const response = await axios.post(
        `https://react-blog-server-seven.vercel.app/api/delete-posts/${id}`
      );
      setRemove(true);
      navigate("/");
    } catch (error) {
      toast.error("Unable to delete the post");
    }
  };

  return (
    <main className="flex justify-center">
      <div className="w-[100%] md:w-[60%] lg:w-70%]  flex-col ">
        {loading ? (
          <CircleLoader
          color="blue"
          loading={loading}
          cssOverride={override}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        ) : post ? (
          <div>
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>

            <p>
              Created by:{" "}
              {post.author && post.author.username
                ? post.author.username
                : "Unkown Author"}
            </p>
            {post.createdAt && (
              <p>
                Created At:{" "}
                {format(new Date(post.createdAt), "EEE do MMMM yyy h:mm a")}
              </p>
            )}
          </div>
        ) : (
          <p>Error loading post</p>
        )}

        {!loading && post && (
          <div>
            <img
              src={`https://react-blog-server-seven.vercel.app/${post.file}`}
              className="w-[500px] h-[200px] cursor-pointer"
              alt={post.title}
            />
          </div>
        )}

        {!loading && post && (
          <div>
            <p>{post.content}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Link to="/edit-page">
            <button className="bg-blue-500 text-white font-bold text-lg p-2 mt-1   rounded w-[150px]">
              Edit Post
            </button>
          </Link>
          {remove ? (
            <p>Successfully deleted</p>
          ) : (
            <button
              className="bg-red-700  text-white font-bold text-lg p-2  mt-1 rounded w-[150px]"
              onClick={deletePost}
            >
              Delete post
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default PostPage;
