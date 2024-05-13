export interface FilterInput {
  title?: "junior" | "mid" | "senior" | "manager" | "worker";
  department?:
    | "marketing"
    | "information technology"
    | "human resources"
    | "sales"
    | "worker";
  minSalary?: number;
  maxSalary?: number;
  salary?: object;
}

export interface EmployeeInput {
  title?: "junior" | "mid" | "senior" | "manager" | "worker";
  department?:
    | "marketing"
    | "information technology"
    | "human resources"
    | "sales"
    | "worker";
  firstName?: string;
  lastName?: string;
  dateOfJoining?: Date;
  dateOfBirth?: Date;
  salary?: number;
}
