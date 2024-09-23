import z from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "content must be atleat of 10 characters")
    .max(300, "message must be no longer than 300 characters"),
});
