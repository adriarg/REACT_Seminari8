import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { User } from './types';
import Form from './components/Form';
import UsersList from './components/UsersList';
import { fetchUsers, LogIn } from './services/usersService';
import Login from './components/Login';

interface AppState {
    currentUser: User | null;
    users: User[];
    newUsersNumber: number;
    isLoggedIn: boolean;
}

interface UIState {
    isDarkMode: boolean;
    showNotification: boolean;
    notificationMessage: string;
    notificationType: 'create' | 'update';
}

function App() {
    const [users, setUsers] = useState<AppState['users']>([]);
    const [newUsersNumber, setNewUsersNumber] = useState<AppState['newUsersNumber']>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<AppState['isLoggedIn']>(false);
    const [currentUser, setCurrentUser] = useState<AppState['currentUser']>(null);

    const [uiState, setUiState] = useState<UIState>({
        isDarkMode: false,
        showNotification: false,
        notificationMessage: '',
        notificationType: 'create'
    });

    const divRef = useRef<HTMLDivElement>(null);

    const loadUsers = async () => {
        try {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error loading users:', error);
            setUsers([]);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            loadUsers();
        }
    }, [newUsersNumber, isLoggedIn]);

    useEffect(() => {
        if (uiState.showNotification) {
            const timer = setTimeout(() => {
                setUiState((prev) => ({
                    ...prev,
                    showNotification: false,
                }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [uiState.showNotification]);

    const handleNewUser = (newUser: User): void => {
        setNewUsersNumber((n) => n + 1);
        setUiState((prev) => ({
            ...prev,
            notificationMessage: newUser.name,
            showNotification: true,
            notificationType: 'create'
        }));
    };

    const handleUserUpdated = async () => {
        await loadUsers();
        setUiState((prev) => ({
            ...prev,
            showNotification: true,
            notificationMessage: 'User updated successfully!',
            notificationType: 'update'
        }));
    };

    const toggleDarkMode = () => {
        setUiState((prev) => {
            const newMode = !prev.isDarkMode;
            if (divRef.current) {
                divRef.current.style.backgroundColor = newMode ? '#333333' : '#ffffff';
                divRef.current.style.color = newMode ? '#ffffff' : '#000000';
            }
            return { ...prev, isDarkMode: newMode };
        });
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const user = await LogIn(email, password);
            console.log('User logged in:', user);
            setCurrentUser(user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="App" ref={divRef}>
            {uiState.showNotification && (
                <div className={`notification ${uiState.isDarkMode ? 'dark' : 'light'}`}>
                    {uiState.notificationType === 'create' ? (
                        <>User <strong>{uiState.notificationMessage}</strong> has been created successfully!</>
                    ) : (
                        uiState.notificationMessage
                    )}
                </div>
            )}

            <button onClick={toggleDarkMode} className="toggleButton">
                {uiState.isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <div className="content">
                {!isLoggedIn ? (
                    <Login
                        onLogin={({ email, password }) => handleLogin(email, password)}
                    />
                ) : (
                    <>
                        <h2>Bienvenido, {currentUser?.name}!</h2>
                        <UsersList 
                            users={users} 
                            onUserUpdated={handleUserUpdated}
                        />
                        <p>New users: {newUsersNumber}</p>
                        <Form onNewUser={handleNewUser} />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
