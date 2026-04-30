import axiosClient  from "./axiosClient";

export interface StudentLocation{
   _id: string;
   studentId: string;
   firstName: string;
   lastName: string;
   className: string;
   latitude: number;
   longitude: number;
   time: string;
}

export const locationApi = {
    getAllLocations: () => axiosClient .get<StudentLocation[]>("/locations"),
    getMyStudentsLocations: (teacherId: string) => axiosClient .get<StudentLocation[]>(`/locations/teacher/${teacherId}`),
};