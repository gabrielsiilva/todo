import { PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import { EmptyTasks } from "./components/EmptyTasks";
import { Header } from "./components/Header";
import { Task } from "./components/Task";
import "./global.css";

export interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [inputText, setInputText] = useState("");

  const completedTasks = tasks.reduce((totalTasksCompleted, task) => {
    return task.isCompleted ? totalTasksCompleted + 1 : totalTasksCompleted;
  }, 0);

  function handleChangeInputText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")
    setInputText(event.target.value);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório")
  }

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault()
    const newTask: TaskType = {
      id: uuidv4(),
      isCompleted: false,
      title: inputText,
    };

    setTasks((previousTask) => [...previousTask, newTask]);
    setInputText('');
  }

  function handleDeleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId);

    if(!confirm("Deseja mesmo apagar esta task?")) return;

    setTasks(tasksWithoutDeletedOne);
  }

  function handleToggleTaskStatus(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return { ...task, isCompleted: !task.isCompleted };
    });

    setTasks(newTasks);
  }

  return (
    <div>
      <Header />

      <main className={styles.wrapper}>
        <form onSubmit={handleAddNewTask} className={styles.inputWrapper}>
          <input
            type="text"
            onChange={handleChangeInputText}
            onInvalid={handleNewTaskInvalid}
            value={inputText}
            placeholder="Adicione uma nova tarefa"
            required
          />
          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </form>

        <div className={styles.tasksInfo}>
          <div className={styles.createdTasks}>
            Tarefas criadas
            <span>{tasks.length}</span>
          </div>

          <div className={styles.completedTasks}>
            Concluídas
            <span>{completedTasks}</span>
          </div>
        </div>

        {tasks.length === 0 && <EmptyTasks />}

        {tasks.map((task) => (
          <Task
            key={task.id}
            content={task}
            onDelete={handleDeleteTask}
            onChangeTaskStatus={handleToggleTaskStatus}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
