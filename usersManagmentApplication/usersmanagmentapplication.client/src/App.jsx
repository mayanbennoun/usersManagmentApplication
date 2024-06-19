import './App.css';
import CreateUserDialog from './components/createUserForm';
import UpdateUserForm from './components/UpdateUser';
import UserList from './components/UserList';

function App() {
    return (
        <>
            <UserList />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '2rem' }}>
                <CreateUserDialog />
                <UpdateUserForm />
            </div>
        </>
    );
    
}

export default App;