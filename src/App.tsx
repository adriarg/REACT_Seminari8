import React, { useState, useEffect } from 'react';
// Importaciones para Ionic
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Importar setupIonicReact para inicializar correctamente Ionic
import { 
    setupIonicReact, 
    IonApp, 
    IonContent, 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonFooter,
    IonText,
    IonItem,
    IonToggle,
    IonIcon,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonBadge
} from '@ionic/react';

import { 
    people, 
    moon, 
    sunny, 
    personAdd, 
    statsChart
} from 'ionicons/icons';

import './App.css';
import { User} from './types';
import Form from './components/Form/Form';
import UsersList from './components/UsersList/UsersList';
import { fetchUsers} from './services/usersService';

// Inicializar Ionic React
setupIonicReact();

interface AppState {
    users: User[];
    newUsersNumber: number;
}

function App() {
    const [users, setUsers] = useState<AppState["users"]>([]);
    const [newUsersNumber, setNewUsersNumber] = useState<AppState["newUsersNumber"]>(0);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error carregant usuaris:', error);
                setUsers([]); 
            }
        };
        loadUsers();
    }, [newUsersNumber]);

    const handleNewUser = (newUser: User): void => {
        setNewUsersNumber(n => n + 1);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', isDarkMode);
    };

    return (
        <IonApp className={isDarkMode ? 'dark-theme' : ''}>
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>
                            <IonIcon icon={people} className="ion-margin-end" /> Gestió d'Usuaris
                        </IonTitle>
                        <IonItem lines="none" slot="end" color="primary">
                            <IonIcon slot="start" icon={isDarkMode ? sunny : moon} />
                            <IonToggle 
                                checked={isDarkMode}
                                onIonChange={toggleDarkMode}
                            />
                        </IonItem>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonCard>
                        <IonCardHeader color="tertiary">
                            <IonCardSubtitle>
                                <IonIcon icon={statsChart} className="ion-margin-end" /> Estadístiques
                            </IonCardSubtitle>
                            <IonCardTitle>Panell de Control</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonChip color="primary">
                                <IonIcon icon={people} />
                                <IonLabel>Total Usuaris: {users.length}</IonLabel>
                            </IonChip>
                            
                            <IonChip color="success">
                                <IonIcon icon={personAdd} />
                                <IonLabel>Nous Usuaris: 
                                    <IonBadge color="danger" className="ion-margin-start">
                                        {newUsersNumber}
                                    </IonBadge>
                                </IonLabel>
                            </IonChip>
                        </IonCardContent>
                    </IonCard>

                    <IonCard>
                        <IonCardHeader color="tertiary">
                            <IonCardTitle>
                                <IonIcon icon={people} className="ion-margin-end" />
                                Llista d'Usuaris
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <UsersList users={users} />
                        </IonCardContent>
                    </IonCard>
                    
                    <Form onNewUser={handleNewUser} />
                </IonContent>

                <IonFooter>
                    <IonToolbar color="light">
                        <IonText color="medium" className="ion-text-center">
                            <p>Demostració React amb Ionic v7 - EETAC UPC</p>
                        </IonText>
                    </IonToolbar>
                </IonFooter>
            </IonPage>
        </IonApp>
    );
}

export default App;