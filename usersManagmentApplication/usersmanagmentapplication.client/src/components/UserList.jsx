import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import UserCard from './userCard';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [responseMessage, setResponseMessage] = useState('');
    const usersPerPage = 4; // Number of users per page

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        try {
            const response = await fetch(`https://localhost:7002/getUsers/${page}?per_page=${usersPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data.data);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleUserDeleted = (message) => {
        setResponseMessage(message);
        fetchUsers(page); // Refetch users after deletion
    };

    return (
        <>
            <Typography variant="h3" padding="1rem" align="center" component="div">
                Users
            </Typography>
            {responseMessage && (
                <Typography
                    variant="subtitle1"
                    color={responseMessage.includes("deleted successfully") ? "success.main" : "error.main"}
                    align="center"
                    gutterBottom
                >
                    {responseMessage}
                </Typography>
            )}
            <Grid container spacing={3} justifyContent="center" padding="1rem">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} onDelete={handleUserDeleted} />
                ))}
            </Grid>
            <Grid container justifyContent="center" padding="1rem">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Grid>
        </>
    );
};

export default UserList;
