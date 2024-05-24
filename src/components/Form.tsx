import React from 'react';
import '../components/Form.css'
import { useState,  useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonLabel,
    IonText

} from '@ionic/react';


interface ModalProps {
  isOpen: boolean;
  storedTasks: [];
  onClose: () => void;
}

interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}

const Form: React.FC<ModalProps> = ({ isOpen, onClose, storedTasks }) => {
    const { register, handleSubmit,reset, formState: {errors} } = useForm<Task>();
    // Estado para almacenar la lista de tareas
    const [tasks, setTasks] = useState<Task[]>(storedTasks);
    //estado para guardar el valor del select
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelectionChange = (event: CustomEvent) => {
      setSelectedValue(event.detail.value);
    };

    const onSubmit: SubmitHandler<Task> = async (data) => {

        const newTask: Task = {
            id: tasks.length + 1,
            nombre: data.nombre,
            descripcion: data.descripcion,
            estado: data.estado
        };

        const updatedTasks: Task[] = [...tasks, newTask]
        setTasks(updatedTasks);
        reset();
        onClose();
        window.location.reload();
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }, [tasks]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss = {onClose}>
      {/* <IonContent>
        <div style={{ padding: '20px' }}>
          <IonButton onClick={onClose}>Cerrar Modal</IonButton>
        </div>
      </IonContent> */}
      <IonCard>
        <IonCardHeader>
            <IonCardTitle className='ion-text-center'>
                Formulario
            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <IonInput
                    label='Nombre'
                    id='Name_task'
                    type='text'
                    placeholder='Nombre de la tarea'
                    labelPlacement="floating"
                    fill="outline"
                    className='card_input'
                    helperText={errors.nombre?.message}
                    {...register("nombre", {required: "El nombre es requerido"})}
                >
                </IonInput>

                <IonTextarea
                    label='Descripcion'
                    id='Description_task'
                    placeholder='Descripcion de la tarea'
                    labelPlacement="floating"
                    fill="outline"
                    className='card_input'
                    helperText={errors.descripcion?.message}
                    {...register("descripcion", {required: "La descripcion es requerido"})}
                >
                </IonTextarea>

                <IonList>
                    <IonItem>
                        <IonSelect
                            label="Estado"
                            value={selectedValue}
                            onIonChange={handleSelectionChange}
                            {...register("estado", { required: "El estado es requerido" })}
                        >
                            <IonSelectOption value="pendiente">Pendiente</IonSelectOption>
                            <IonSelectOption value="en progreso">En progreso</IonSelectOption>
                            <IonSelectOption value="completado">Completado</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    {errors.estado && (
                        <IonItem lines="none">
                            <IonText className='label-select' color="danger">{errors.estado.message}</IonText>
                        </IonItem>
                    )}
                </IonList>


                <p>Selected Value: {selectedValue}</p>

                <IonButton
                    className='ion-text-center'
                    type='submit'
                    // onClick={}
                >
                    Aceptar
                </IonButton>

                <IonButton
                    className='ion-text-center'
                    onClick={onClose}
                >
                    Cancelar
                </IonButton>

            </form>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default Form;
