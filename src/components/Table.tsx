import {useEffect, useState} from 'react';

type Entry = {
name: string;
address: string;
email: string;
age: number;
gender: string;
country: string;
file: string;
};



const Table = () => {

    // All saved entries will go in this
    const [entries, setEntries] = useState<Entry[]>([]);

    // when page loads, get data from local storage

    useEffect(() =>
    {
        const data = localStorage.getItem("formData");
        if (data) {
            const parsedData = JSON.parse(data);
            setEntries(parsedData);
        }   

    }, []);

    return (

    <div className="items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <h2 className="text-xl font-bold text-center mb-4">Saved Entries</h2>

      {entries.length === 0 ? (
        <p className="text-center text-gray-500">No entries yet.</p>
      ) : (
            <table className="min-w-full border border-collapse border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Age</th>
              <th className="border px-2 py-1">Address</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Gender</th>
              <th className="border px-2 py-1">Country</th>
              <th className="border px-2 py-1">File</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{entry.name}</td>
                <td className="border px-2 py-1">{entry.age}</td>
                <td className="border px-2 py-1">{entry.address}</td>
                <td className="border px-2 py-1">{entry.email}</td>
                <td className="border px-2 py-1">{entry.gender}</td>
                <td className="border px-2 py-1">{entry.country}</td>
                <td className="border px-2 py-1">{entry.file}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;