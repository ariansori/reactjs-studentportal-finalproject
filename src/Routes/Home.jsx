import React from "react";
import { Link } from "react-router-dom";
import { Button } from '@chakra-ui/react'

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Student Portal</h1>
            <Link to="/student">
                <Button data-testid="student-btn">
                    All Student
                </Button>
            </Link>
        </div>
    );
};

export default Home;