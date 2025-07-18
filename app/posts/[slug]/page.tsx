import { prisma } from "@/lib/prisma";

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return (
      <main className="flex flex-col items-center justify-center pt-8 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center gap-y-5 pt-8 text-center">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
};

export default PostPage;
