import { Check, Trash } from "@phosphor-icons/react";
import { TaskType } from "../App";
import styles from "./Task.module.css";

interface TaskProps {
  onDelete: (taskId: string) => void;
  onChangeTaskStatus: (taskId: string) => void;
  content: TaskType;
}

export function Task({ content, onDelete, onChangeTaskStatus }: TaskProps) {
  function handleDeleteTask() {
    onDelete(content.id);
  }

  function handleCompleteTask() {
    onChangeTaskStatus(content.id);
  }

  const checkboxCheckedClassname = content.isCompleted
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"];
  const paragraphCheckedClassname = content.isCompleted
    ? styles["paragraph-checked"]
    : "";

  return (
    <article className={styles.taskWrapper}>
      <label htmlFor="checkbox" onClick={handleCompleteTask}>
        <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
          {content.isCompleted && <Check size={12} />}
        </span>

        <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
          {content.title}
        </p>
      </label>
      <button onClick={handleDeleteTask} title="Excluir task">
        <Trash size={24} />
      </button>
    </article>
  );
}
