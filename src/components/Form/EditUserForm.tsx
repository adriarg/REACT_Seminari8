import React, { useState } from 'react';
import { User } from '../../types';
import styles from './Form.module.css';
import { updateUser } from '../../services/usersService';

interface EditUserFormProps {
    user: User & { _id?: string };
    onUserUpdated: () => void;
    onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onUserUpdated, onCancel }) => {
    const [formData, setFormData] = useState<User>({
        name: user.name,
        age: user.age,
        email: user.email || '',
        phone: user.phone || 0
    });

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!user._id) {
            alert('Error: User ID not found');
            return;
        }
        
        try {
            await updateUser(user._id, formData);
            onUserUpdated();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user. Please try again.');
        }
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'phone' ? Number(value) : value
        }));
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age" className={styles.label}>Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        min="0"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone</label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        min="0"
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} className={styles.button}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.button}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm; 