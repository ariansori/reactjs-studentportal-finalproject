import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, } from '@chakra-ui/react';

const AddStudent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        fullname: "",  
        profilePicture: "",  
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: ""
    });

    // Mapping fakultas berdasarkan program studi
    const facultyMap = {
        'Ekonomi': 'Fakultas Ekonomi',
        'Manajemen': 'Fakultas Ekonomi',
        'Akuntansi': 'Fakultas Ekonomi',
        'Administrasi Publik': 'Fakultas Ilmu Sosial dan Politik',
        'Administrasi Bisnis': 'Fakultas Ilmu Sosial dan Politik',
        'Hubungan Internasional': 'Fakultas Ilmu Sosial dan Politik',
        'Teknik Sipil': 'Fakultas Teknik',
        'Arsitektur': 'Fakultas Teknik',
        'Matematika': 'Fakultas Teknologi Informasi dan Sains',
        'Fisika': 'Fakultas Teknologi Informasi dan Sains',
        'Informatika': 'Fakultas Teknologi Informasi dan Sains',
    };

    // Mengubah nilai setiap atribut student
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value
        }));
    };

    // Menambahkan data student baru
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const studentData = {
            ...student,
            faculty: facultyMap[student.programStudy]
        };

        try {
            await fetch(`http://localhost:3001/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            // Reset form setelah submit
            setStudent({
                fullname: "", 
                profilePicture: "",
                address: "",
                phoneNumber: "",
                birthDate: "",
                gender: "Male",
                programStudy: ""
            });

            // Navigasi ke halaman student
            navigate('/student');
        } catch (error) {
            console.log('Error adding student data:', error);
        }
    };

    return (
        <>
        <form id="form-student" onSubmit={handleSubmit}>
            <label htmlFor="input-name">Fullname</label>
            <Input 
                data-testid="name" 
                type="text" 
                id="input-name" 
                name="fullname" 
                value={student.fullname} 
                onChange={handleChange} 
            />

            <label htmlFor="input-profile-picture">Profile Picture</label>
            <Input 
                data-testid="profilePicture" 
                type="text" 
                id="input-profile-picture" 
                name="profilePicture"
                value={student.profilePicture} 
                onChange={handleChange} 
            />

            <label htmlFor="input-address">Address</label>
            <Input 
                data-testid="address" 
                type="text" 
                id="input-address" 
                name="address" 
                value={student.address} 
                onChange={handleChange}  
            />

            <label htmlFor="input-phone-number">Phone Number</label>
            <Input 
                data-testid="phoneNumber" 
                type="text" 
                id="input-phone-number" 
                name="phoneNumber" 
                value={student.phoneNumber} 
                onChange={handleChange}  
            />

            <label htmlFor="input-date">Birth Date</label>
            <Input 
                data-testid="date" 
                type="date" 
                id="input-date" 
                name="birthDate" 
                value={student.birthDate} 
                onChange={handleChange} 
            />

            <label htmlFor="input-gender">Gender</label>
            <select 
                data-testid="gender" 
                id="input-gender" 
                name="gender"
                value={student.gender} 
                onChange={handleChange}
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label htmlFor="input-prody">Program Study</label>
            <select 
                data-testid="prody" 
                id="input-prody" 
                name="programStudy"
                value={student.programStudy} 
                onChange={handleChange}
            >
                <option value="">Select Program Study</option>
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

            <Button data-testid="add-btn" type="submit">Add Student</Button>
        </form>
        </>
    );
};

export default AddStudent;