//import { useEffect, useState } from 'react';
import './App.css';
import UserCard from './components/usersCards';
import CreateUserDialog from './components/createUserForm';
//import UserDialog from './components/newUserForm';
import UpdateUserForm from './components/UpdateUser';

function App() {
    return (
        <>
            <UserCard/>
            <CreateUserDialog />
            <UpdateUserForm/>
        </>

    );
    
}

export default App;