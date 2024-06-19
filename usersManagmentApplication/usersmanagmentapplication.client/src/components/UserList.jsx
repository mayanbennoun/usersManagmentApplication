import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import UserCard from './userCard'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4); 
    const [responseMessage, setResponseMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); 
    const [dialogOpen, setDialogOpen] = useState(false); 

    useEffect(() => {
        fetchUsers(page, itemsPerPage);
    }, [page, itemsPerPage]);

    const fetchUsers = async (page, itemsPerPage) => {
        try {
            const response = await fetch(`https://localhost:7002/getUsers/${page}?perPage=${itemsPerPage}`, {
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

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7002/getUser/${userId}`, {
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
            setSelectedUser(data); 
            setDialogOpen(true);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setPage(1); 
    };

    const handleUserDeleted = (message) => {
        setResponseMessage(message);
        fetchUsers(page, itemsPerPage); 
    };

    const handleCardClick = (userId) => {
        fetchUserDetails(userId); 
    };

    const handleCloseDialog = () => {
        setDialogOpen(false); 
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
                    <UserCard key={user.id} user={user} onDelete={handleUserDeleted} onCardClick={handleCardClick} />
                ))}
            </Grid>
            <Grid container justifyContent="center" padding="1rem">
                <TextField
                    label="Items per page"
                    type="number"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                    sx={{ marginBottom: '1rem' }}
                />
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Grid>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <div>
                            <Typography variant="body1">ID: {selectedUser.id}</Typography>
                            <Typography variant="body1">First Name: {selectedUser.first_name}</Typography>
                            <Typography variant="body1">Last Name: {selectedUser.last_name}</Typography>
                            <Typography variant="body1">Email: {selectedUser.email}</Typography>
                            <Typography variant="body1">Avatar: <img src={selectedUser.avatar} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} /></Typography>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserList;
