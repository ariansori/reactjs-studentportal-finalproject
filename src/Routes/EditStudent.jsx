import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, } from '@chakra-ui/react';

const EditStudent = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mengambil data student berdasarkan id setiap kali komponen dirender
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/student/${id}`);
                const data = await response.json();
                setStudent(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };

        fetchStudent();
    }, [id]);

    // Fungsi untuk menangani perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    // Fungsi untuk mengirim data yang telah diedit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const facultyMap = {
            "Ekonomi": "Fakultas Ekonomi",
            "Manajemen": "Fakultas Ekonomi",
            "Akuntansi": "Fakultas Ekonomi",
            "Administrasi Publik": "Fakultas Ilmu Sosial dan Politik",
            "Administrasi Bisnis": "Fakultas Ilmu Sosial dan Politik",
            "Hubungan Internasional": "Fakultas Ilmu Sosial dan Politik",
            "Teknik Sipil": "Fakultas Teknik",
            "Arsitektur": "Fakultas Teknik",
            "Matematika": "Fakultas Teknologi Informasi dan Sains",
            "Fisika": "Fakultas Teknologi Informasi dan Sains",
            "Informatika": "Fakultas Teknologi Informasi dan Sains",
        };

        const faculty = facultyMap[student.programStudy];

        const updatedStudent = {
            ...student,
            faculty,
        };

        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedStudent),
            });
            navigate("/student");
        } catch (error) {
            console.error("Error updating student data:", error);
        }
    };

    if (loading) {
        return <p>Loading ...</p>; 
    }

    return (
        <>
            <img src={student.profilePicture} alt="Profile" />
            <form id="form-student" onSubmit={handleSubmit}>
                <div>
                    <label>Fullname:
                        <Input
                            type="text"
                            name="fullname"
                            data-testid="name"
                            value={student.fullname}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Address:
                        <Input
                            type="text"
                            name="address"
                            data-testid="address"
                            value={student.address}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Phone Number:
                        <Input
                            type="text"
                            name="phoneNumber"
                            data-testid="phoneNumber"
                            value={student.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Birth Date:
                        <Input
                            type="date"
                            name="birthDate"
                            data-testid="date"
                            value={student.birthDate}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Gender:
                        <select
                            name="gender"
                            data-testid="gender"
                            value={student.gender}
                            onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Program Study:
                        <select
                            name="programStudy"
                            data-testid="prody"
                            value={student.programStudy}
                            onChange={handleChange}
                        >
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Administrasi Publik">Administrasi Publik</option>
                            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                            <option value="Hubungan Internasional">Hubungan Internasional</option>
                            <option value="Teknik Sipil">Teknik Sipil</option>
                            <option value="Arsitektur">Arsitektur</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Fisika">Fisika</option>
                            <option value="Informatika">Informatika</option>
                        </select>
                    </label>
                </div>
                <Button type="submit" className="add-button" data-testid="edit-btn">Edit Student</Button>
            </form>
        </>
    );
};

export default EditStudent;