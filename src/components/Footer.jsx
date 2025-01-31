import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box className="footer" padding="4" bgColor="gray.200" textAlign="center">
            <p className="studentName">Khoirul Ansori</p>
            <p>-</p>
            <p className="studentId">FS11534226</p>
        </Box>
    );
};

export default Footer;
