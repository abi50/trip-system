import axiosClient  from "./axiosClient";

export interface StudentLocation{
   _id: string;
   studentId: string;
   latitude: number;
   longitude: number;
   time: string;
}

export const locationApi = {
    getAllLocations: () =>
    axiosClient.get<StudentLocation[]>("/locations"),

  getMyStudentsLocations: () =>
    axiosClient.get<StudentLocation[]>("/locations/my-students"),

  getTeacherLocation: () =>
    axiosClient.get<StudentLocation>("/locations/my-location"),
};