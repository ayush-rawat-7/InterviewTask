"use client";
import { fetchBlogs } from "@/databaseServices/blogs";
import { errorImage } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import Modal from "./Modal";
import FilterModal from "./FilterModal";

const HomeComponent = () => {
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [hoveredBlog, setHoveredBlog] = useState("");
  const [loadingFilters, setLoadingFilters]: any = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters]: any = useState({
    category: [],
    tags: [],
  });
  const [selectedFilters, setSelectedFilters]: any = useState({
    category: [],
    tags: [],
  });

  function initFilters() {
    if (blogsData) {
      let categories: any = [];
      let tags: any = [];

      for (const blog of blogsData) {
        if (blog?.categories && blog.categories.length > 0) {
          categories = [...categories, ...blog?.categories];
        }
        if (blog?.tags && blog.tags.length > 0) {
          tags = [...tags, ...blog?.tags];
        }
      }

      setFilters({ categories, tags });
    }
  }

  function getFilteredBlogs(blogs: any) {
    if (
      selectedFilters.category.length === 0 &&
      selectedFilters.tags.length === 0
    ) {
      return blogs;
    }

    let filteredArray = blogs?.filter((val: any) => {
      let inCategory = false;
      let inTags = false;
      for (const category of val.categories) {
        if (selectedFilters.category.includes(category)) {
          inCategory = true;
          break;
        }
      }
      for (const tag of val.tags) {
        if (selectedFilters.tags.includes(tag)) {
          inTags = true;
          break;
        }
      }

      return inCategory || inTags;
    });

    return filteredArray;
  }

  useEffect(() => {
    initFilters();
  }, [blogsData]);

  return (
    <>
      <div className="flex justify-end items-center px-body my-4">
        <Link href={"/create-blog"}>
          <button className="bg-black text-white font-semibold px-3 py-2 rounded-md border border-black hover:bg-white hover:text-black">
            Create New Blog
          </button>
        </Link>
      </div>

      <div className="px-body bg-amber-50 py-3 flex justify-between items-center">
        <p className="font-semibold">Filters</p>
        <button
          className="bg-black text-white px-2 py-1 rounded-md text-sm lg:text-base"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Apply Filters
        </button>
      </div>

      <FilterModal
        setIsFilterApplied={setIsFilterApplied}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <div className="grid grid-cols-1 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 lg:py-7 gap-6  py-4 px-body ">
        {blogsData &&
          (isFilterApplied ? getFilteredBlogs(blogsData) : blogsData).map(
            (blog: any) => {
              return (
                // <Link href={`/blog/${blog?.id}`}>
                <div
                  onMouseEnter={() => {
                    setHoveredBlog(blog?.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredBlog("");
                  }}
                  className="flex  flex-col flex-1 h-full  w-full py-3 border px-3 border-gray-100 shadow-md shadow-gray-600 rounded-md"
                  key={blog?.id}
                >
                  <div className="h-[170px] relative">
                    <Image
                      src={blog?.image || errorImage}
                      alt="blog image"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-contain"
                      onError={() => {
                        console.log("ERROR");
                      }}
                    />

                    {hoveredBlog === blog?.id && (
                      <div className="hidden  absolute top-0 left-0 w-full h-full lg:flex justify-center items-center gap-2 bg-black bg-opacity-25">
                        <Link href={`/edit-blog/${blog?.id}`}>
                          <div className="bg-black rounded-full p-2">
                            <AiFillEdit className="text-white text-2xl" />
                          </div>
                        </Link>
                        <Link href={`/blog/${blog?.id}`}>
                          <div className="bg-black rounded-full p-2">
                            <AiFillEye className="text-white text-2xl" />
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    {blog?.tags && blog?.tags?.length > 0 && (
                      <p>
                        <span className="font-semibold"> Tags: </span>{" "}
                        {blog?.tags?.join(", ")}
                      </p>
                    )}
                    {blog?.categories && blog?.categories?.length > 0 && (
                      <p>
                        <span className="font-semibold"> Categories: </span>{" "}
                        {blog?.categories?.join(", ")}
                      </p>
                    )}
                    <p>
                      <span className="font-semibold">Posted on: </span>
                      {moment(blog?.createdAt).format("DD MMM, YYYY")}
                    </p>
                    <h6>
                      <span className="font-semibold">Title: </span>
                      {blog?.title}
                    </h6>
                    <div className="flex">
                      <span className="font-semibold">Content: &nbsp;</span>
                      <p className="w-full truncate">&nbsp;{blog?.body}</p>
                    </div>
                  </div>

                  <div className="flex lg:hidden justify-between gap-3">
                    <Link
                      href={`/edit-blog/${blog?.id}`}
                      className="flex-1 bg-black text-white py-2 font-medium rounded-md justify-center flex"
                    >
                      <button className="">Edit</button>
                    </Link>
                    <Link
                      href={`/blog/${blog?.id}`}
                      className="flex-1 bg-black text-white py-2 font-medium rounded-md justify-center flex"
                    >
                      <button className="">View</button>
                    </Link>
                  </div>
                </div>
                // </Link>
              );
            }
          )}
      </div>
    </>
  );
};

export default HomeComponent;
