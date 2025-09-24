"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { user } from "./db/schema";
import { z } from "zod";

const FormSchema = z.object({
  email: z.email(),
  name: z.string(),
});

export type State = {
  errorMessage?: string;
};

export async function createUser(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "Failed to Validate Form Data.",
    };
  }

  const { email, name } = validatedFields.data;
  const newUser = {
    email,
    name,
  };
  try {
    await db.insert(user).values(newUser);
  } catch (error) {
    return {
      errorMessage: "Failed to Create User.",
    };
  }

  revalidatePath("/");
  return {};
}
