import { Link as ReachLink } from "react-router-dom"
import { Flex, Spacer, Link } from '@chakra-ui/react'

function Navbar() {
    return (
        <nav>
            <Flex p={4}>
                <Link as={ReachLink} to="/" data-testid="home-page">Student Portal</Link>
                <Spacer />
                <Link as={ReachLink} to="/student" data-testid="student-page">All Student</Link>
                <Link as={ReachLink} to="/add" data-testid="add-page">Add Student</Link>
            </Flex>
        </nav>
    );
}

export default Navbar;