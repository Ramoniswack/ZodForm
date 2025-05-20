import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Step 1: Define interface manually
interface FormData {
  name: string;
  address: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
  country: string;
  file: FileList;
}

// Step 2: Define schema with correct matching types
const schema = z.object({
  name: z.string().min(3, "Name is too short"),
  address: z.string().min(3, "Address is too short"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be 18 or older"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  country: z.string().min(1, "Country is required"),
  file: z.custom<FileList>(
    (files) => files instanceof FileList && files.length > 0,
    { message: "File is required" }
  ),
});

const InterfaceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    try {
      const previousData = localStorage.getItem("formData");
      const oldEntries = previousData ? JSON.parse(previousData) : [];

      const fileName =
        data.file && data.file.length > 0 ? data.file[0].name : "";

      const newEntry = {
        ...data,
        file: fileName,
      };

      localStorage.setItem(
        "formData",
        JSON.stringify([...oldEntries, newEntry])
      );

      alert(`Hi ${data.name}, your form has been submitted`);
      console.log("Form submitted successfully:", newEntry);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm h-auto bg-white p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Fill the Form
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label
            htmlFor="age"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            {...register("address")}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label
            htmlFor="gender"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Male"
                defaultChecked
                {...register("gender")}
              />
              <span>Male</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" value="Female" {...register("gender")} />
              <span>Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="country"
            defaultValue="Nepal"
            {...register("country")}
          >
            <option className="text-gray-700" value="Nepal">
              Nepal
            </option>
            <option className="text-gray-700" value="U.S.">
              U.S.
            </option>
            <option className="text-gray-700" value="India">
              India
            </option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div className="flex flex-col">
          <label
            htmlFor="file"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <input
            type="file"
            id="file"
            {...register("file")}
            className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 inline-block"
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InterfaceForm;
