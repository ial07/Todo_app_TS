import { z } from "zod";

// 🔹 Validation for Add Todo form
export const todoSchema  = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)), // check valid date
    { message: "Invalid date format" }
  ),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"],  
    "Priority must be LOW, MEDIUM, or HIGH"),
  completed: z.boolean(), // default false when creating
});

// 🔹 Type inference for form
export type TodoSchema = z.infer<typeof todoSchema >;
