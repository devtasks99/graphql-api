import { FilterInput, EmployeeInput } from "../types/types";

export function validateFilter(filter: FilterInput): boolean {
  if (
    filter.title !== undefined &&
    !["junior", "mid", "senior", "manager", "worker"].includes(filter.title)
  ) {
    console.error("Invalid value for title");
    return false;
  }

  if (
    filter.department !== undefined &&
    ![
      "marketing",
      "information technology",
      "human resources",
      "sales",
      "worker",
    ].includes(filter.department)
  ) {
    console.error("Invalid value for department");
    return false;
  }

  if (filter.minSalary === null || filter.minSalary < 0) {
    console.error("Invalid value for minSalary");
    return false;
  }

  if (filter.maxSalary === null || filter.maxSalary < 0) {
    console.error("Invalid value for maxSalary");
    return false;
  }

  return true;
}

export function addSalaryToFilter(filter: FilterInput): FilterInput {
  if (filter.minSalary !== undefined && filter.maxSalary !== undefined) {
    filter.salary = { $gte: filter.minSalary, $lte: filter.maxSalary };
    delete filter.minSalary;
    delete filter.maxSalary;
  } else {
    if (filter.minSalary !== undefined) {
      filter.salary = { $gte: filter.minSalary };
      delete filter.minSalary;
    }

    if (filter.maxSalary !== undefined) {
      filter.salary = { $lte: filter.maxSalary };
      delete filter.maxSalary;
    }
  }
  return filter;
}

export function validateFields({
  firstName,
  lastName,
  dateOfJoining,
  dateOfBirth,
  salary,
  title,
  department,
}: EmployeeInput): boolean {
  if (
    title !== undefined &&
    !["junior", "mid", "senior", "manager", "worker"].includes(title)
  ) {
    console.error("Invalid value for title");
    return false;
  }

  if (
    department !== undefined &&
    ![
      "marketing",
      "information technology",
      "human resources",
      "sales",
      "worker",
    ].includes(department)
  ) {
    console.error("Invalid value for department");
    return false;
  }
  if (salary === null || salary < 0) {
    console.error("Invalid value for salary");
    return false;
  }

  if (firstName === null) {
    console.error("Invalid value for firstName");
    return false;
  }

  if (lastName === null) {
    console.error("Invalid value for lastName");
    return false;
  }

  if (dateOfJoining === null) {
    console.error("Invalid value for dateOfJoining");
    return false;
  }

  if (dateOfBirth === null) {
    console.error("Invalid value for dateOfBirth");
    return false;
  }
  return true;
}
