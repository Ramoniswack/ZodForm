export interface FormData {
  name: string;
  address: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
  country: string;
  file: FileList;
}
