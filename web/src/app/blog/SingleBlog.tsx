"use client";
import { fetchSingleBlog } from "@/databaseServices/blogs";
import { errorImage } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SingleBlog = ({ params }: any) => {
  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blog", params?.id],
    queryFn: () => fetchSingleBlog(params?.id),
  });
  const router = useRouter();
  return (
    <div className="px-body flex flex-col gap-2 py-5">
      <div className="relative flex items-center justify-center">
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
          {blogData?.title}
        </h1>
      </div>
      <div className="w-full h-[170px]  md:h-[250px] lg:h-[400px] mt-2">
        <Image
          src={blogData?.image || errorImage}
          alt={blogData?.title}
          width={1000}
          height={1000}
          className=" w-full h-full object-contain"
        />
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-5 h-[2px] bg-red-500"></div>
        <p className="text-sm font-medium">
          {moment(blogData?.createdAt).format("DD MMM, YYYY")}
        </p>
        <div className="w-5 h-[2px] bg-red-500"></div>
      </div>
      <div className="text-justify mt-2">
        <p>{blogData?.body}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
