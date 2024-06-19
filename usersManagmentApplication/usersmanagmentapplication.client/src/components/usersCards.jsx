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

//const users = [
//    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', avatar: 'https://reqres.in/img/faces/11-image.jpg' },
//    { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', avatar: 'https://reqres.in/img/faces/12-image.jpg' },
//    { id: 3, first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com', avatar: 'https://reqres.in/img/faces/3-image.jpg' },
//    { id: 4, first_name: 'Bob', last_name: 'Brown', email: 'bob.brown@example.com', avatar: 'https://reqres.in/img/faces/4-image.jpg' },
//    { id: 5, first_name: 'Charlie', last_name: 'Davis', email: 'charlie.davis@example.com', avatar: 'https://reqres.in/img/faces/5-image.jpg' },
//    { id: 6, first_name: 'Eve', last_name: 'Martinez', email: 'eve.martinez@example.com', avatar: 'https://reqres.in/img/faces/6-image.jpg' },
//    { id: 7, first_name: 'Frank', last_name: 'Wilson', email: 'frank.wilson@example.com', avatar: 'https://reqres.in/img/faces/7-image.jpg' },
//    { id: 8, first_name: 'Grace', last_name: 'Taylor', email: 'grace.taylor@example.com', avatar: 'https://reqres.in/img/faces/8-image.jpg' },
//    { id: 9, first_name: 'Hank', last_name: 'Anderson', email: 'hank.anderson@example.com', avatar: 'https://reqres.in/img/faces/9-image.jpg' },
//    { id: 10, first_name: 'Ivy', last_name: 'Thomas', email: 'ivy.thomas@example.com', avatar: 'https://reqres.in/img/faces/10-image.jpg' },
//    { id: 11, first_name: 'Jack', last_name: 'Moore', email: 'jack.moore@example.com', avatar: 'https://reqres.in/img/faces/11-image.jpg' },
//    { id: 12, first_name: 'Kara', last_name: 'Clark', email: 'kara.clark@example.com', avatar: 'https://reqres.in/img/faces/12-image.jpg' },
//];

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
    useEffect( () => {
         getUsersData();
        console.log(reqresUsers)
    }, []);

    const handleExpandClick = (userId) => {
        setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
    };

    const handleDelete = (userId) => {
        // Handle the user deletion logic here
        console.log(`User with ID ${userId} deleted`);
    };

    return (
        <>
            <Typography variant="h3" padding="1rem" align="center" component="div">
                Users
            </Typography>
            <Grid container spacing={3} justifyContent="center" padding="1rem">
                {reqresUsers.map((user) => (
                    <Grid item key={user.id} xs={12} sm={6} md={4} lg={2.4}>
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
            console.log("data ", data);
            setReqresUsers(data.data); // Use the 'data' field from your response
        }
        catch (error) {
        console.error('Fetch error:', error);
        }
  
    }
};


export default UserCard;