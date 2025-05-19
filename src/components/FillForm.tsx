import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  address: string;
  email: string;
  gender: string;
  country: string;
  file: FileList;

};

const FillForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm h-auto bg-white p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Fill the Form</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name Required" })}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            {...register("address", { required: "Address Required" })}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1 ">{errors.address.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
            Email
            </label>
          <input
            id="email" 
            {...register("email", {required:"Email Required",
              pattern:{
                value: /^[a-zA-Z0-9.+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"},})
              
            }
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            />
             {errors.email && (
            <p className="text-red-500 text-sm mt-1 ">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="mb-1 text-sm font-medium text-gray-700">
            Gender
          </label>

         <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Male"
              defaultChecked
              {...register("gender", { required: "Required" })}
         />
         <span>Male</span>
         </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Female"
              
              {...register("gender", { required: "Required" })}
         />
         <span>Female</span>
         </label>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1 ">{errors.gender.message}</p>
          )}
</div>
      </div>

          <div className="flex flex-col">
          <label htmlFor="country" className="mb-1 text-sm font-medium text-gray-700">
            Country
          </label>
          <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="country"
            {
              ...register("country", { required: "Required" })
            }
            >
              <option className="text-gray-700" value="" selected>Nepal</option>
               <option className="text-gray-700" value="">Us</option>
              <option className="text-gray-700" value="">India</option>

            
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="file" className="mb-1 text-sm font-medium text-gray-700">
              Upload File
            </label>

            <input
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="file"
            id="file"
            {...register("file", {required: "Upload your file"})}
            className="hidden"
            />
            <label htmlFor="file"
    className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-900">Choose file</label>

            {errors.file && (
              <p className="text-red-500 text-sm mt-1 ">{errors.file.message}</p>
            )}

            </div>



        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FillForm;
