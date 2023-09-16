"use client";
import { fetchBlogs } from "@/databaseServices/blogs";
import { errorImage } from "@/utils/constant";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import OutsideClickHandler from "../utils/OutsideClickHandler";

const Navbar = () => {
  const inputRef: any = useRef(null);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: blogsData } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="flex py-4 bg-primary px-body items-center justify-between relative">
      <Link href={"/"}>
        {" "}
        <h1 className="text-xl font-semibold text-white">Blogs</h1>
      </Link>
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsSearchOpen(true);
        }}
      >
        <AiOutlineSearch className="text-white text-3xl" />
      </div>

      <Transition
        appear={true}
        className={`absolute top-0 left-0 w-full h-full flex`}
        show={isSearchOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <OutsideClickHandler
          onClick={() => {
            setIsSearchOpen(false);
            setQuery('')
          }}
        >
          <div className="absolute flex left-0 top-0 w-full h-full bg-gray-100 lg:bg-white">
            <div className="flex-1 flex items-center lg:px-0 gap-3">
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                type="text"
                name=""
                id=""
                className="pl-4 pr-2 flex-1 border-l h-full outline-none select-none shadow-md"
                placeholder="Search Blogs"
              />
              <AiOutlineClose
                onClick={() => {
                  setIsSearchOpen(false);
                }}
                className="cursor-pointer text-gray-500 text-3xl mr-3"
              />
            </div>
          </div>

          {query && (
            <Transition
              show={!!query}
              appear={true}
              className={`absolute top-full mt-1 left-0 w-full px-body bg-white z-40`}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-full mt-1 left-0 w-full px-body bg-white z-40">
                <div className="shadow-md shadow-gray-600 px-2 rounded-b-lg flex flex-col w-full h-full gap-2  py-3 max-h-[500px] overflow-y-auto bg-black bg-opacity-5">
                  {blogsData &&
                  blogsData?.filter((blog: any) =>
                    blog?.title.toLowerCase().includes(query.toLowerCase())
                  ).length === 0 ? (
                    <div className="flex justify-center items-center ">
                      <p className="font-semibold">No result found</p>
                    </div>
                  ) : (
                    blogsData
                      ?.filter((blog: any) =>
                        blog?.title.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((singleBlog: any) => {
                        return (
                          <Link
                            href={`/blog/${singleBlog?.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setQuery("");
                            }}
                          >
                            <div
                              key={singleBlog?.title}
                              className="flex gap-2 items-center bg-white hover:bg-gray-200 md:justify-start px-2"
                            >
                              <div className="w-[25%] h-[100px] md:h-[150px]">
                                <Image
                                  width={1000}
                                  height={1000}
                                  className="w-full h-full object-fill"
                                  alt={singleBlog?.title}
                                  src={singleBlog?.image || errorImage}
                                />
                              </div>
                              <div className=" w-[75%] flex-1 flex-col">
                                <div className="">
                                  <h4 className="font-semibold">
                                    {singleBlog?.title}
                                  </h4>
                                </div>
                                <div>
                                  <p>
                                    {moment(singleBlog?.createdAt).format(
                                      "DD MMM, YYYY"
                                    )}
                                  </p>
                                </div>

                                <div className="flex flex-1 overflow-hidden">
                                  <p className="w-full truncate">
                                    {singleBlog?.body}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                  )}
                </div>
              </div>
            </Transition>
          )}
        </OutsideClickHandler>
      </Transition>
    </div>
  );
};

export default Navbar;
