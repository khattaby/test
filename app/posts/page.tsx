import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPost } from "@/actions/actions";

const PostsPage = async () => {

  const user = await prisma.user.findUnique({
    where: { email: "ayman@gmail.com" },
    include: { posts: true },
  });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-8 text-center">
      <h1 className="text-3xl font-semibold">ALL Posts ({user?.posts.length})</h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {user?.posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{`- ${post.title}`}</Link>
          </li>
        ))}
      </ul>
      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="px-2 py-1 rounded-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors"
        >
          Create Post
        </button>
      </form>
    </main>
  );
};

export default PostsPage;
