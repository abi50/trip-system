import axiosClient from "./axiosClient";

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  id: string;
  className: string;
}

export const teacherApi = {
  getMyStudents: () =>
    axiosClient.get<Student[]>(`/teachers/my-students`),
};