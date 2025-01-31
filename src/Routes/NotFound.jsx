import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; 

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <div>
            <h1>404 | Not Found</h1>
            <Button 
                data-testid="back" 
                onClick={handleGoBack} 
            >
                Go Back
            </Button>
        </div>
    );
};

export default NotFound;
