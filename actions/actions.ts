"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";

const createPost = async (formData: FormData) => {
  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .toLowerCase()
          .replace(/\s+/g, "-"),
        content: formData.get("content") as string,
        author: {
          connect: { email: "ayman@gmail.com" },
        },
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("unique constraint failed");
      }
    }
  }
};

const editPost = async (formData: FormData, id: string) => {
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .toLowerCase()
        .replace(/\s+/g, "-"),
      content: formData.get("content") as string,
    },
  });
};

const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: { id },
  });
};

export { createPost, editPost, deletePost };
