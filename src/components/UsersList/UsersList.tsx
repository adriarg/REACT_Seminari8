import React, { useState } from "react";
import { User } from '../../types';
import { 
    IonList, 
    IonItem, 
    IonLabel, 
    IonText,
    IonIcon,
    IonAvatar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonBadge,
    IonAlert
} from '@ionic/react';
import { 
    personCircle, 
    mail, 
    trash, 
    create, 
    chatbubbleEllipses,
    informationCircle,
    star,
    calendarOutline
} from 'ionicons/icons';

interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    if (users.length === 0) {
        return (
            <IonText color="medium" className="ion-text-center ion-padding">
                <h5>No hi ha usuaris registrats</h5>
                <p>Utilitza el formulari per afegir nous usuaris</p>
            </IonText>
        );
    }

    const handleShowInfo = (user: User) => {
        setSelectedUser(user);
        setShowAlert(true);
    };

    const getUserAgeCategory = (age: number) => {
        if (age < 18) return { color: 'warning', text: 'Menor' };
        if (age < 30) return { color: 'success', text: 'Jove' };
        if (age < 60) return { color: 'primary', text: 'Adult' };
        return { color: 'tertiary', text: 'Sènior' };
    };

    return (
        <>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={`Informació de ${selectedUser?.name}`}
                subHeader={`Detalls complets`}
                message={selectedUser ? `
                    <strong>Nom:</strong> ${selectedUser.name}<br>
                    <strong>Edat:</strong> ${selectedUser.age} anys<br>
                    <strong>Email:</strong> ${selectedUser.email}<br>
                    <br>
                    <small>Aquest usuari va ser registrat al sistema.</small>
                ` : ''}
                buttons={['Tancar']}
            />
            
            <div className="ion-padding-bottom">
                <IonText color="medium">
                    <p><i>Llisca a l'esquerra per veure opcions</i></p>
                </IonText>
            </div>
            
            <IonList>
                {users.map((user) => {
                    const ageCategory = getUserAgeCategory(user.age);
                    return (
                        <IonItemSliding key={user.name}>
                            <IonItem detail button onClick={() => handleShowInfo(user)}>
                                <IonAvatar slot="start">
                                    <IonIcon icon={personCircle} size="large" color="primary" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>
                                        {user.name}
                                        {user.age > 40 && (
                                            <IonIcon icon={star} color="warning" className="ion-margin-start" />
                                        )}
                                    </h2>
                                    <h3>
                                        <IonBadge color={ageCategory.color}>{ageCategory.text}</IonBadge>
                                        <IonIcon icon={calendarOutline} size="small" className="ion-margin-start ion-margin-end" />
                                        <IonText color="medium">{user.age} anys</IonText>
                                    </h3>
                                    <p>
                                        <IonIcon icon={mail} size="small" className="ion-margin-end" />
                                        {user.email}
                                    </p>
                                </IonLabel>
                            </IonItem>
                            
                            <IonItemOptions side="end">
                                <IonItemOption color="primary" onClick={() => handleShowInfo(user)}>
                                    <IonIcon slot="icon-only" icon={informationCircle} />
                                </IonItemOption>
                                <IonItemOption color="success">
                                    <IonIcon slot="icon-only" icon={chatbubbleEllipses} />
                                </IonItemOption>
                                <IonItemOption color="warning">
                                    <IonIcon slot="icon-only" icon={create} />
                                </IonItemOption>
                                <IonItemOption color="danger">
                                    <IonIcon slot="icon-only" icon={trash} />
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    );
                })}
            </IonList>
        </>
    );
};

export default UsersList;