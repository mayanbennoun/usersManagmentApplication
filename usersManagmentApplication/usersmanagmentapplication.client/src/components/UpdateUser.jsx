import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const defaultTheme = createTheme();

export default function UpdateUserForm() {
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setResponse(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const fullName = data.get("fullName");
        const job = data.get("job");
        const id = data.get("id");

        try {
            const result = await fetch(`https://localhost:7002/updateUser/${id}?fullName=${encodeURIComponent(fullName)}&job=${encodeURIComponent(job)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resultData = await result.json();
            setResponse(resultData);
        } catch (error) {
            console.error("Error creating user:", error);
            setResponse({ error: "Failed to create user" });
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Update User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form to update a existing user.
                    </DialogContentText>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <ManageAccountsIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create User
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="id"
                                    label="User Id"
                                    name="id"
                                    autoComplete="id"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="name"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="job"
                                    label="Job"
                                    type="text"
                                    id="job"
                                    autoComplete="job-title"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    endIcon={<AutoFixHighIcon />}
                                >
                                    Update
                                </Button>
                            </Box>
                            {response && (
                                <Typography
                                    variant="body1"
                                    color={response.error ? "error" : "textPrimary"}
                                    sx={{ mt: 2 }}
                                >
                                    {response.error || JSON.stringify(response)}
                                </Typography>
                            )}
                        </Box>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
