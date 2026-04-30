"use client";



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearUser, getSavedUser, UserPayload } from "@/api/auth.service";
export default function StudentPage() {
    const router = useRouter();

    const [student, setStudent] = useState<UserPayload | null>(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        clearUser();
        router.push("/");
    }
    useEffect(() => {
        const savedUser = getSavedUser();

         if (!savedUser) {
            router.push("/");
            return;
        }

        if (savedUser.role !== "student") {
            router.push("/teacher");
            return;
        }
        setStudent(savedUser);

    }, [router]);

    return (
            <div dir="rtl" className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-5xl">                
                <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                             שלום התלמידה {student?.firstName} {student?.lastName}
                            </h1>
                            <p className="mt-2 text-slate-500">כיתה: {student?.className}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-slate-800 px-5 py-2 text-white transition hover:bg-slate-700"
                        >
                            התנתקות
                        </button>
                    </div>
                </div>
        </div>
        </div>
    );
}