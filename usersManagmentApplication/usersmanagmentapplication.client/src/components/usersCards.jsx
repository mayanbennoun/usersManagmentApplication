import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


const ExpandMore = styled((props) => {
    // eslint-disable-next-line no-unused-vars
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const UserCard = () => {
    const [expanded, setExpanded] = useState({});
    const [reqresUsers, setReqresUsers] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        getUsersData();
    }, []);

    const handleExpandClick = (userId) => {
        setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
    };

    const handleDelete = async (userId) => {
        try {
            const result = await fetch(`https://localhost:7002/deleteUser/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (result.status === 204) {
                setResponseMessage(`User with ID ${userId} deleted successfully.`);
                setReqresUsers(reqresUsers.filter(user => user.id !== userId));
            } else {
                const resultData = await result.json();
                setResponseMessage(resultData.error || `Failed to delete user with ID ${userId}.`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setResponseMessage(`Failed to delete user with ID ${userId}.`);
        }
    };

    return (
        <>
            <Typography variant="h4" padding="1rem" align="center" component="div">
                Users
            </Typography>
            {responseMessage && (
                <Typography variant="subtitle1"
                    color={responseMessage.includes("deleted successfully") ? "success.main" : "error.main"} align="center" gutterBottom>
                    {responseMessage}
                </Typography>
            )}
            <Grid container spacing={2} justifyContent="center" padding="2rem">
                {reqresUsers.map((user) => (
                    <Grid item key={user.id} xs={12} sm={6} md={4} >
                        <Card sx={{ maxWidth: '15rem', height: 'auto', margin: '0.5rem' }}>
                            <CardMedia
                                component="img"
                                alt={`${user.first_name} ${user.last_name}`}
                                sx={{ height: '8.75rem' }}
                                image={user.avatar}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {user.first_name} {user.last_name}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button
                                    size="small"
                                    onClick={() => handleDelete(user.id)}
                                    startIcon={<DeleteIcon />}
                                    sx={{ color: 'red' }}
                                >
                                    Delete User
                                </Button>
                                <ExpandMore
                                    expand={expanded[user.id]}
                                    onClick={() => handleExpandClick(user.id)}
                                    aria-expanded={expanded[user.id]}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded[user.id]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>{user.email}</Typography>
                                    <Button size="small" onClick={() => handleExpandClick(user.id)}>
                                        Close
                                    </Button>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );

    async function getUsersData() {
        try {
            const page = 1;
            const response = await fetch(`https://localhost:7002/getUsers/${page}`, {
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
            setReqresUsers(data.data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
};

export default UserCard;