import { Schema, model } from "mongoose";

interface Iemployee {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfJoining: Date;
  dateOfBirth: Date;
  salary: number;
  title: string;
  department: string;
}

const EmployeeSchema = new Schema<Iemployee>({
  id: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  dateOfBirth: { type: Date, required: true },
  salary: { type: Number, required: true },
  title: {
    type: String,
    enum: ["junior", "mid", "senior", "manager", "worker"],
    default: "worker",
    required: true,
  },
  department: {
    type: String,
    enum: [
      "marketing",
      "information technology",
      "human resources",
      "sales",
      "worker",
    ],
    default: "worker",
    required: true,
  },
});

export const Employee = model<Iemployee>("employees", EmployeeSchema);
