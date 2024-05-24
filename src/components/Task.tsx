// import React, { useState, useEffect } from 'react';

// interface Task {
//   text: string;
//   completed: boolean;
// }
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption

} from '@ionic/react';

import '../components/Task.css'

import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

interface TaskProps {
  tasks: Task[];
  estado: string;
}

const Task: React.FC <TaskProps> = ({ tasks, estado }) => {


  const [selectedValue, setSelectedValue] = useState<string>('');

  const [taskss, setTasks] = useState<Task[]>(tasks);


  const handleEdit = () => {
    console.log("edit task", selectedValue)
  }

  const handleSelectionChange = (event: CustomEvent, taskItem: Task) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskItem.id) {
        return { ...task, estado: event.detail.value };
      }
      return task;
    });
    setTasks(newTasks);
    window.location.reload();
  };

  const handleDelete = (taskToDelete: Task) => {
    const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    window.location.reload();

  };


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskss));

  }, [taskss]);


  return (
    <>
      {tasks
        .filter(taskItem => taskItem.estado === estado) // Filtrar solo las tareas con estado 'pendiente'
        .map((taskItem, index) => (
          <IonCard className='card' key={index}>
            <IonCardHeader>
              <IonCardTitle>
                {
                  taskItem.estado === 'completado' ?
                  <h5 className='completado'>Tarea: {taskItem.nombre}</h5>
                  :
                  <h5>Tarea: {taskItem.nombre}</h5>
                }
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

              {
                taskItem.estado === 'completado' ?
                <h5 className='completado'> Descripción: {taskItem.descripcion}</h5>
                :
                <h5>Descripción: {taskItem.descripcion}</h5>

              }
            </IonCardContent>

            <IonList>
              <IonItem>
                <IonSelect
                  label="Estado"
                  value={selectedValue === '' ? taskItem.estado : selectedValue}
                  onIonChange={(event) => handleSelectionChange(event, taskItem)}
                >

                  <IonSelectOption value="pendiente">Pendiente</IonSelectOption>
                  <IonSelectOption value="en progreso">En progreso</IonSelectOption>
                  <IonSelectOption value="completado">Completado</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>

            <IonButton onClick={() => handleDelete(taskItem)} fill="clear">Eliminar</IonButton>
          </IonCard>
        ))}
    </>
  );
};

export default Task;
