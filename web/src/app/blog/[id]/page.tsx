import { fetchBlogs, fetchSingleBlog } from "@/databaseServices/blogs";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import React from "react";
import SingleBlog from "../SingleBlog";

export async function generateMetadata({ params, searchParams }: any) {
  // read route params
  const id = parseInt(params?.id);
  const data = await fetchSingleBlog(id);
  return {
    title: data?.title,
  };
}

const BlogPage = async ({ params }: any) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["blog", params?.id], () =>
    fetchSingleBlog(params?.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SingleBlog params={params} />
    </Hydrate>
  );
};

export default BlogPage;


