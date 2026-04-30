"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearUser, getSavedUser, UserPayload } from "@/api/auth.service";
import { teacherApi, Student } from "@/api/teacher.service";
import "@/style/Auth.css";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import { locationApi, StudentLocation } from "@/api/locations.service";


export default function TeacherPage() {
    const router = useRouter();

    const [teacher, setTeacher] = useState<UserPayload | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const [showMap, setShowMap] = useState(false);

    const [locations, setLocations] = useState<StudentLocation[]>([]);
    const mapContainerStyle = {
        width: "100%",
        height: "800px",
        borderRadius: "12px",
        marginTop: "40px",
    };


    const loadLocations = async () => {
        try {
            const response = await locationApi.getAllLocations();
            setLocations(response.data);
        } catch (error) {
            console.error("Error loading locations:", error);
        }
    };


    useEffect(() => {
        const savedUser = getSavedUser();

        if (!savedUser) {
            router.push("/");
            return;
        }

        if (savedUser.role !== "teacher") {
            router.push("/student");
            return;
        }

        setTeacher(savedUser);
        loadStudents(savedUser.id);
        loadLocations();

        const intervalId = setInterval(() => {
            loadLocations();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [router]);

    const loadStudents = async (teacherId: string) => {
        try {
            const response = await teacherApi.getStudentsByTeacherId(teacherId);
            setStudents(response.data);
        } catch (error) {
            console.error("Error loading students:", error);
            alert("שגיאה בטעינת התלמידות");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        clearUser();
        router.push("/");
    };

    if (loading) {
        return <div className="home-container">טוען...</div>;
    }

    return (
        <div dir="rtl" className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                                שלום המורה {teacher?.firstName} {teacher?.lastName}
                            </h1>
                            <p className="mt-2 text-slate-500">כיתה: {teacher?.className}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-slate-800 px-5 py-2 text-white transition hover:bg-slate-700"
                        >
                            התנתקות
                        </button>
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                תלמידות הכיתה
                            </h2>
                            <p className="text-sm text-slate-500">
                                 {students.length} תלמידות
                            </p>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-xl bg-slate-800 px-5 py-2 text-white transition hover:bg-slate-700"
                        >
                            {isOpen ? "הסתר" : "הצג תלמידות"}
                        </button>
                    </div>

                    {/* הרשימה */}
                    {isOpen && (
                        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {students.map((student) => (
                                <div
                                    key={student._id}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white font-bold">
                                        {student.firstName?.charAt(0)}
                                        {student.lastName?.charAt(0)}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800">
                                        {student.firstName} {student.lastName}
                                    </h3>

                                    <div className="mt-3 text-sm text-slate-600">
                                        <p>תעודת זהות: {student.id}</p>
                                        <p>כיתה: {student.className}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            מפת מיקומי תלמידות
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            הצגת מיקום התלמידות בזמן אמת
                        </p>
                    </div>

                </div>

                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={
                            locations.length > 0
                                ? {
                                    lat: locations[0].latitude,
                                    lng: locations[0].longitude,
                                }
                                : {
                                    lat: 32.0853,
                                    lng: 34.8054,
                                }}
                        zoom={13}
                    >
                        {locations.map((location) => (
                            <Marker
                                key={location.studentId}
                                position={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                title={` ${location.firstName} ${location.lastName} `}
                                label={{
                                    text: location.studentId,
                                    color: "black",
                                    fontSize: "12px",
                                    fontWeight: "bold",

                                }} />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>


        </div>
    );
}