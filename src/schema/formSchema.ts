import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  address: z.string().min(3, "Address is too short"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be 18 or older"),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required",
  }),
  country: z.string().min(1, "Country is required"),
  file: z.custom<FileList>(
    (files) => files instanceof FileList && files.length > 0,
    { message: "File is required" }
  ),
});
