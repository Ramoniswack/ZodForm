import { useEffect, useState } from "react";

interface Entry {
  name: string;
  age: number;
  email: string;
  address: string;
  gender: string;
  country: string;
  file?: string;
}


const FormDataTable = () =>
{
    const[formData, setFormData] = useState<Entry[]>([]);

    useEffect(() =>
    {
        const saved = localStorage.getItem("formData");
        // using safe parse
        const parsedData = saved ? JSON.parse(saved) : [];
        setFormData(parsedData);
    }, []);



    if(formData.length === 0)
    {
        return <div>No data available</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Age</th>
                        <th className="px-4 py-2 border-b">Address</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Gender</th>
                        <th className="px-4 py-2 border-b">Country</th>
                        <th className="px-4 py-2 border-b">File</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((data, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border-b">{data.name}</td>
                            <td className="px-4 py-2 border-b">{data.age}</td>
                            <td className="px-4 py-2 border-b">{data.address}</td>
                            <td className="px-4 py-2 border-b">{data.email}</td>
                            <td className="px-4 py-2 border-b">{data.gender}</td>
                            <td className="px-4 py-2 border-b">{data.country}</td>
                            <td className="px-4 py-2 border-b">{data.file}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormDataTable;
