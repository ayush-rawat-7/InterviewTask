"use client";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TextFieldsComponent = ({
  state,
  selectedFile,
  setState,
  setSelectedFile,
  handleChange,
  handleSubmit,
  loading,
}: any) => {
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const handleAdd = (type: string) => {
    if (type === "tag") {
      let arr = state.tags;
      arr.push(tagInput);
      setState((val: any) => {
        return { ...val, tags: arr };
      });
      setTagInput("");
    } else {
      let arr = state.categories;
      arr.push(categoryInput);
      setState((val: any) => {
        return { ...val, categories: arr };
      });
      setCategoryInput("");
    }
  };

  const handleRemove = (type: string, index: number) => {
    if (type === "tag") {
      let arr: [] = state.tags;
      arr.splice(index, 1);
      setState({ ...state, tags: arr });
    } else {
      let arr: [] = state.categories;
      arr.splice(index, 1);
      setState({ ...state, categories: arr });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-1 ">
        <p className="font-medium">Select Cover Image</p>
        <input
          type="file"
          accept="image/*"
          name=""
          id=""
          onChange={(e) => setSelectedFile(e.target.files)}
        />
      </div>
      <div className="flex w-full flex-col gap-3 mt-4">
        <div className="border border-gray-300 w-full rounded-sm">
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Title*"
            className=" px-2 py-2 w-full outline-none rounded-sm"
          />
        </div>
        <div className="border border-gray-300  w-full rounded-sm">
          <textarea
            id=""
            value={state.body}
            name="body"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            cols={30}
            rows={7}
            className=" px-2 py-2 w-full outline-none rounded-sm"
            placeholder="Body*"
          />
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <p>Tags</p>
          <div className="flex">
            <div className="border border-gray-300  w-full rounded-sm">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Tag"
                onKeyDown={(e) => {
                  //   console.log(e.key);
                  if (e.key === "Enter") {
                    handleAdd("tag");
                  }
                }}
                className=" px-2 py-2 w-full outline-none rounded-sm"
              />
            </div>
            <button
              className="px-3 py-2 bg-black text-white rounded-tr-sm rounded-br-sm"
              onClick={() => handleAdd("tag")}
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {state?.tags?.map((tag: any, idx: number) => {
              return (
                <p
                  className="bg-black text-white px-2 py-1 rounded-full flex gap-2 items-center"
                  key={tag}
                >
                  {tag}

                  <span
                    onClick={() => {
                      handleRemove("tag", idx);
                    }}
                  >
                    <AiOutlineClose className="cursor-pointer text-white font-bold text-lg" />
                  </span>
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <p>Categories</p>
          <div className="flex">
            <div className="border border-gray-300  w-full rounded-sm">
              <input
                type="text"
                value={categoryInput}
                onKeyDown={(e) => {
                  //   console.log(e.key);
                  if (e.key === "Enter") {
                    handleAdd("category");
                  }
                }}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Category"
                className=" px-2 py-2 w-full outline-none rounded-sm"
              />
            </div>
            <button
              className="px-3 py-2 bg-black text-white rounded-tr-sm rounded-br-sm"
              onClick={() => handleAdd("category")}
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {state?.categories?.map((category: any, idx: number) => {
              return (
                <p
                  className="bg-black text-white px-2 py-1 rounded-full flex gap-2 items-center"
                  key={category}
                >
                  {category}

                  <span
                    onClick={() => {
                      handleRemove("category", idx);
                    }}
                  >
                    <AiOutlineClose className="cursor-pointer text-white font-bold text-lg" />
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 mb-6">
        <button
          onClick={loading ? null : handleSubmit}
          className="bg-black px-4 rounded-md py-2 text-white border border-black hover:text-black hover:bg-white"
        >
          {loading ? (
            <p className="px-6">
              <CircularProgress className="!text-white hover:!text-black" size={25} />
            </p>
          ) : (
            "Submit Blog"
          )}
        </button>
      </div>
    </div>
  );
};

export default TextFieldsComponent;
