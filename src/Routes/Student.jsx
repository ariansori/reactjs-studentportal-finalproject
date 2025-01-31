import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td, Button, Select} from '@chakra-ui/react'

const Student = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();

    // Menampilkan data dari json-server
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3001/student");
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // Menghapus data student
    const handleDeleteStudent = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, { method: "DELETE" });
            setStudents(students.filter((student) => student.id !== id));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // Mengubah filter fakultas
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Memfilter students berdasarkan fakultas yang dipilih
    const filteredStudents = students.filter((student) => {
        return filter === "All" || student.faculty === filter;
    });

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="studentList">
            <Select data-testid="filter" className="Filter-select" onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
                <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
                <option value="Fakultas Teknik">Fakultas Teknik</option>
            </Select>

            {/* Tabel yang menampilkan data student */}
            <TableContainer>
            <Table id="table-student" className="test-table">
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Full Name</Th>
                        <Th>Faculty</Th>
                        <Th>Program Study</Th>
                        <Th>Option</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                            <Tr key={student.id} className="student-data-row">
                                <Td>{index + 1}</Td>
                                <Td onClick={() => navigate(`/student/${student.id}`)}>
                                    {student.fullname}
                                </Td>
                                <Td>{student.faculty}</Td>
                                <Td>{student.programStudy}</Td>
                                <Td>
                                    <Button
                                        className="delete-btn"
                                        type="button"
                                        data-testid={`delete-${student.id}`}
                                        onClick={() => handleDeleteStudent(student.id)}
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan="5">No students found.</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            </TableContainer>
        </div>
    );
};

export default Student;
