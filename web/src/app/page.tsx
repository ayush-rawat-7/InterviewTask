import HomeComponent from "@/Components/HomeComponent";
import { fetchBlogs } from "@/databaseServices/blogs";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/react-query";
import Image from "next/image";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["blogs"], fetchBlogs);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomeComponent />
    </Hydrate>
  );
}
