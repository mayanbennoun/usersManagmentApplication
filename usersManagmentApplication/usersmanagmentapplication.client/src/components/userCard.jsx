import { useState } from 'react';
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
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types'; 

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

const UserCard = ({ user, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = async () => {
        try {
            const result = await fetch(`https://localhost:7002/deleteUser/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (result.status === 204) {
                onDelete(`User with ID ${user.id} deleted successfully.`);
            } else {
                const resultData = await result.json();
                onDelete(resultData.error || `Failed to delete user with ID ${user.id}.`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            onDelete(`Failed to delete user with ID ${user.id}.`);
        }
    };

    return (
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
                    onClick={handleDelete}
                    startIcon={<DeleteIcon />}
                    sx={{ color: 'red' }}
                >
                    Delete User
                </Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{user.email}</Typography>
                    <Button size="small" onClick={handleExpandClick}>
                        Close
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserCard;
