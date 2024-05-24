import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonPage } from '@ionic/react';
import Task from '../components/Task';


const Task_finalizada: React.FC = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const estado = "completado"


    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle className='ion-text-center' >Lista de tareas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Task tasks={storedTasks} estado={estado}/>
            </IonContent>
        </IonPage>
    )
}


export default Task_finalizada;