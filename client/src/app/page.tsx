"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authApi, persistAuth, Role } from "@/api/auth.service";
import "../style/Auth.css";
import "../style/Home.css";

interface AuthFormData {
  firstName: string;
  lastName: string;
  id: string;
  className: string;
  role: Role;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState<AuthFormData>({
    firstName: "",
    lastName: "",
    id: "",
    className: "",
    role: "student",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     setFormData((prevData) => ({ ...prevData, file: files[0] }));
  //   } else {
  //     setFormData((prevData) => ({ ...prevData, file: null }));
  //   }
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = isLogin
        ? await authApi.login({
          id: formData.id,
          role: formData.role,
        })
        : await authApi.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          id: formData.id,
          className: formData.className,
          role: formData.role,
        });

      persistAuth(response.data);
      if (response.data.user.role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("הפעולה נכשלה. בדקי שהתעודת זהות קיימת או שהפרטים תקינים");
    }
  };


return (
  <div className="auth-container">
    <div className="auth-box">
      <h2 className="auth-title">{isLogin ? "התחברות" : "הרשמה"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="auth-input"
          >
            <option value="student">תלמידה</option>
            <option value="teacher">מורה</option>
          </select>

        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="שם פרטי"
              value={formData.firstName}
              onChange={handleChange}
              className="auth-input"
            />

            <input
              type="text"
              name="lastName"
              placeholder="שם משפחה"
              value={formData.lastName}
              onChange={handleChange}
              className="auth-input"
            />

            <input
              type="text"
              name="className"
              placeholder="כיתה"
              value={formData.className}
              onChange={handleChange}
              className="auth-input"
            />
          </>
        )}

        <input
          type="text"
          name="id"
          placeholder="תעודת זהות"
          value={formData.id}
          onChange={handleChange}
          className="auth-input"
          required
        />

        <button type="submit" className="auth-button">
          {isLogin ? "התחברות" : "הרשמה"}
        </button>
      </form>

      <p className="auth-toggle">
        {isLogin ? "אין לך משתמש?" : "כבר יש לך משתמש?"}
        <button
          className="auth-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "להרשמה" : "להתחברות"}
        </button>
      </p>
    </div>
  </div>
);
}