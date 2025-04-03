import React, { useReducer, useState } from 'react';
import { User } from '../../types';
import { addUser } from '../../services/usersService';
import { 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonToast,
    IonText
} from '@ionic/react';

import {
    personAdd,
    mailOutline,
    todayOutline,
    saveOutline,
    refreshOutline,
    checkmarkCircle,
    alertCircle
} from 'ionicons/icons';

interface FormState {
    inputValues: User;
}

interface FormProps {
    onNewUser: (newUser: User) => void;
}

const INITIAL_STATE = {
    name: '',
    age: 0,
    email: ''
};

type FormReducerAction = {
    type: "change_value", 
    payload: { inputName: string, inputValue: string | number };
} | {
    type: "clear";
};

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case "change_value":
            const { inputName, inputValue } = action.payload;
            return {
                ...state,
                [inputName]: inputValue
            };
        case "clear":
            return INITIAL_STATE;
        default:
            return state;
    }
};

const Form = ({ onNewUser }: FormProps) => {
    const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('success');

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!inputValues.name || !inputValues.age || !inputValues.email) {
            setToastMessage('Si us plau, completa tots els camps');
            setToastColor('danger');
            setShowToast(true);
            return;
        }
        
        try {
            const addedUser = await addUser(inputValues);
            onNewUser(addedUser);
            handleClear();
            setToastMessage('Usuari afegit amb èxit!');
            setToastColor('success');
            setShowToast(true);
        } catch (error) {
            console.error('Error al enviar formulari:', error);
            setToastMessage('Error al guardar l\'usuari');
            setToastColor('danger');
            setShowToast(true);
        }
    };

    const handleChange = (name: string, value: string | number | null | undefined) => {
        if (value !== null && value !== undefined) {
            dispatch({
                type: "change_value",
                payload: {
                    inputName: name,
                    inputValue: value
                }
            });
        }
    };

    const handleClear = () => {
        dispatch({
            type: "clear"
        });
    };

    return (
        <>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={3000}
                position="top"
                color={toastColor}
                icon={toastColor === 'success' ? checkmarkCircle : alertCircle}
            />
            
            <IonCard className="ion-margin-top">
                <IonCardHeader color="tertiary">
                    <IonCardTitle>
                        <IonIcon icon={personAdd} className="ion-margin-end" />
                        Afegir Nou Usuari
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <form onSubmit={handleSubmit}>
                        <IonItem className="ion-margin-bottom">
                            <IonIcon icon={personAdd} slot="start" color="primary" />
                            <IonLabel position="floating">Nom <IonText color="danger">*</IonText></IonLabel>
                            <IonInput
                                value={inputValues.name}
                                onIonChange={(e) => handleChange("name", e.detail.value!)}
                                type="text"
                                name="name"
                                placeholder="Introdueix el teu nom"
                            />
                        </IonItem>
                        
                        <IonItem className="ion-margin-bottom">
                            <IonIcon icon={todayOutline} slot="start" color="primary" />
                            <IonLabel position="floating">Edat <IonText color="danger">*</IonText></IonLabel>
                            <IonInput
                                value={inputValues.age || ''}
                                onIonChange={(e) => {
                                    const value = e.detail.value ? parseInt(e.detail.value) : 0;
                                    handleChange("age", value);
                                }}
                                type="number"
                                name="age"
                                placeholder="Introdueix la teva edat"
                            />
                        </IonItem>
                        
                        <IonItem className="ion-margin-bottom">
                            <IonIcon icon={mailOutline} slot="start" color="primary" />
                            <IonLabel position="floating">Email <IonText color="danger">*</IonText></IonLabel>
                            <IonInput
                                value={inputValues.email}
                                onIonChange={(e) => handleChange("email", e.detail.value!)}
                                type="email"
                                name="email"
                                placeholder="Introdueix el teu email"
                            />
                        </IonItem>
                        
                        <IonGrid>
                            <IonRow className="ion-margin-top">
                                <IonCol>
                                    <IonButton 
                                        expand="block" 
                                        fill="outline" 
                                        onClick={handleClear} 
                                        type="button"
                                        color="medium"
                                    >
                                        <IonIcon slot="start" icon={refreshOutline} />
                                        Netejar
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton 
                                        expand="block" 
                                        type="submit"
                                        color="tertiary"
                                    >
                                        <IonIcon slot="start" icon={saveOutline} />
                                        Desar
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                </IonCardContent>
            </IonCard>
        </>
    );
};

export default Form;