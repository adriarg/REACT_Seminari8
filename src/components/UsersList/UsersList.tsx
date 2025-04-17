import React, { useState } from "react";
import { User } from '../../types';
import styles from './UsersList.module.css'; // Import CSS module
import EditUserForm from '../Form/EditUserForm';

interface Props {
    users: User[];
    onUserUpdated: () => void;
}

const UsersList: React.FC<Props> = ({ users, onUserUpdated }) => {
    const [editingUser, setEditingUser] = useState<(User & { _id?: string }) | null>(null);

    const handleEditClick = (user: User & { _id?: string }) => {
        setEditingUser(user);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleUserUpdated = () => {
        setEditingUser(null);
        onUserUpdated();
    };

    const renderList = (): React.ReactNode[] => {
        return users.map((user: User & { _id?: string }) => (
            <li key={user._id || user.name} className={styles.listItem}>
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                    {user.phone && <p className={styles.phone}>Phone: {user.phone}</p>}
                </div>
                <button 
                    onClick={() => handleEditClick(user)}
                    className={styles.editButton}
                >
                    Edit
                </button>
            </li>
        ));
    };

    if (editingUser) {
        return (
            <EditUserForm
                user={editingUser}
                onUserUpdated={handleUserUpdated}
                onCancel={handleCancelEdit}
            />
        );
    }

    return (
        <ul className={styles.list}>
            {renderList()}
        </ul>
    );
};

export default UsersList;