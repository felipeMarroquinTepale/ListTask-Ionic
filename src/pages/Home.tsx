import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton } from '@ionic/react';
import './Home.css';
import Form from '../components/Form';
import Task from '../components/Task';
import { useState } from "react"


const Home: React.FC = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const estado = "pendiente"


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const new_task = (e: any) => {
    setIsModalOpen(true);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center'>Lista de tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <TodoList /> */}
        <IonButton
          className='createTask'
          expand="block"
          onClick={new_task}
          >
          Crear tarea
        </IonButton>
        <Form isOpen={isModalOpen} onClose={handleCloseModal} storedTasks={storedTasks}/>
        <Task tasks={storedTasks} estado={estado}/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
