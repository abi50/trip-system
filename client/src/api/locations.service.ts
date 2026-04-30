import axsiosClient from "./axiosClient";

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
    getAllLocations: () => axsiosClient.get<StudentLocation[]>("/locations"),
};