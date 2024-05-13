import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query, connect } from "mongoose";
import { Employee } from "../models/employees.js";
import { FilterInput } from "../types/types";
import {
  addSalaryToFilter,
  validateFields,
  validateFilter,
} from "../helpers/inputValidators.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB = process.env.MONGODB_STRING;

const typeDefs = `#graphql
    type Employee {
        _id: String
        firstName: String
        lastName: String
        dateOfJoining: String
        dateOfBirth: String
        salary: Int
        title: String
        department: String
    }

    input EmployeeInput {
        firstName: String
        lastName: String
        dateOfJoining: String
        dateOfBirth: String
        salary: Int
        title: String
        department: String
    }

    input EmployeeOrderByInput {
        dateOfJoining: Sort
        salary: Sort
    }

    input EmployeeFilterInput {
      title: String,
      department: String,
      minSalary: Int,
      maxSalary: Int
    }

    enum Sort {
      asc
      desc
    }

    type Query {
        getEmployee(ID: ID!): Employee!
        getEmployees(orderBy: EmployeeOrderByInput, filter: EmployeeFilterInput): [Employee]
    }

    type Mutation {
        createEmployee(employeeInput: EmployeeInput): String!
        updateEmployee(ID: ID!, employeeInput: EmployeeInput): String!
        deleteEmployee(ID: ID!): String!
    }
`;

const resolvers = {
  Query: {
    async getEmployee(_, { ID }) {
      return await Employee.findById(ID);
    },
    async getEmployees(_, { orderBy, filter }) {
      if (filter !== undefined) {
        if (filter.hasOwnProperty("department")) {
          filter.department =
            filter.department?.toLowerCase() || filter.department;
        }

        if (filter.hasOwnProperty("title")) {
          filter.title = filter.title?.toLowerCase() || filter.title;
        }

        if (!validateFilter(filter)) {
          throw new Error("Invalid filter input");
        }

        filter = addSalaryToFilter(filter);

        return await Employee.find(filter).sort(orderBy);
      }
      return await Employee.find().sort(orderBy);
    },
  },
  Mutation: {
    async createEmployee(
      _,
      {
        employeeInput: {
          firstName,
          lastName,
          dateOfJoining,
          dateOfBirth,
          salary,
          title,
          department,
        },
      }
    ) {
      title = title?.toLowerCase() || title;
      department = department?.toLowerCase() || department;
      if (
        !validateFields({
          firstName,
          lastName,
          dateOfJoining,
          dateOfBirth,
          salary,
          title,
          department,
        })
      ) {
        throw new Error("Invalid input");
      }
      const res = await new Employee({
        firstName,
        lastName,
        dateOfJoining,
        dateOfBirth,
        salary,
        title,
        department,
      }).save();

      return res._id;
    },
    async updateEmployee(
      _,
      {
        ID,
        employeeInput: {
          firstName,
          lastName,
          dateOfJoining,
          dateOfBirth,
          salary,
          title,
          department,
        },
      }
    ) {
      title = title?.toLowerCase() || title;
      department = department?.toLowerCase() || department;
      if (
        !validateFields({
          firstName,
          lastName,
          dateOfJoining,
          dateOfBirth,
          salary,
          title,
          department,
        })
      ) {
        throw new Error("Invalid input");
      }
      await Employee.updateOne(
        { _id: ID },
        {
          $set: {
            firstName,
            lastName,
            dateOfJoining,
            dateOfBirth,
            salary,
            title,
            department,
          },
        }
      );

      return ID;
    },
    async deleteEmployee(_, { ID }) {
      await Employee.deleteOne({ _id: ID });

      return ID;
    },
  },
};

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = Number.parseInt(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log(`Server is running ${url}`);
