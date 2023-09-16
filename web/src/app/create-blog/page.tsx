"use client";
import TextField from "@/Components/TextField";
import { uploadBlog, uploadFile } from "@/databaseServices/blogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const router = useRouter();
  const [state, setState] = useState({
    title: "",
    body: "",
    tags: [],
    categories: [],
  });
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    const { body, categories, tags, title } = state;
    if (!title || !body) {
      toast.error("Please fill the details correctly.");
      return;
    }

    let url;

    if (!selectedFile || (selectedFile && selectedFile.length === 0)) {
      toast.error("Please select a cover image.");
      return;
    }

    setLoading(true);

    let file = selectedFile[0];
    url = await uploadFile({ file });

    let blog = {
      title,
      body,
      tags,
      categories,
      image: url,
    };

    const data = await uploadBlog({ blog });
    if (data.status === 201) {
      setLoading(false);
      toast.success("Blog Uploaded Successfully");
      router.push("/");
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="px-body flex flex-col">
      <div className="relative flex items-center justify-center my-4">
        <div
          className="absolute cursor-pointer left-0 top-0 h-full flex items-center bg-black rounded-full p-3"
          onClick={() => {
            router.back();
          }}
        >
          <AiOutlineArrowLeft className="text-xl text-white" />
        </div>
        <h1 className="text-2xl lg:text-3xl text-center font-bold ">
          {" "}
          Create New Blog
        </h1>
      </div>
      {selectedFile && (
        <div>
          <Image
            src={URL.createObjectURL(selectedFile[0])}
            alt="ascassa"
            width={400}
            height={300}
          />
        </div>
      )}
      <TextField
        state={state}
        loading={loading}
        setState={setState}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateBlog;
