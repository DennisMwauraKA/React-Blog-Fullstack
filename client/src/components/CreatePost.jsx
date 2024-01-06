import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import axios from "axios";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ list: "ordered" }, { list: "bullet" }],

      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ header: [1, 2, 3, 4, false] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };
  const createPost = async (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", files[0]);
    data.set("content", content);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-post",
        data,

        { withCredentials: true,}
      );
      console.log(data);

      if (response.status === 200) {
        toast.success("Post created Successfuly");
        setRedirect(true);
        navigate("/");
      }
    } catch (error) {
      setRedirect(false);
      console.log(error);
      toast.error("Failed To Create Post, Please Try again");
    }
  };
  return (
    <>
      {redirect && navigate("/")}
      <div className="bg-blue-400 w-full h-screen flex justify-center items-center">
        <form
          onSubmit={createPost}
          className=" w-[90%] sm:w-[60%] md:w-[50%] lg:w-[80%] flex flex-col h-auto bg-white"
        >
          <input
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none border-black border-b-2 mb-4 px-2 py-1 w-full"
          />
          <input
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="outline-none border-black flex-grow border-b-2 px-2 py-2 mb-4"
          />
          <input
            type="file"
            className="mx-2"
            onChange={(e) => setFiles(e.target.files)}
          />
          <ReactQuill
            className="flex-grow mt-4"
            value={content}
            modules={modules}
            onChange={(newValue) => setContent(newValue)}
          />
          <button className="w-[90%] md:w-[50%] self-center bg-blue-500 text-white p-2 my-2">
            Create Post
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
