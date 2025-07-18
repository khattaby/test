import { prisma } from "@/lib/prisma";
import { cache } from "react";
type type = {
  params: { slug: string };
};

const getCachedPost = cache((slug: string) => {
  return prisma.post.findUnique({
    where: { slug },
  });
});

const PostPage = async ({ params }: type) => {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-8 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
};

export default PostPage;
