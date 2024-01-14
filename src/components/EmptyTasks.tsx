import clipboard from "../assets/clipboard.svg";
import styles from "./EmptyTasks.module.css";

export function EmptyTasks() {
  return (
    <div className={styles.wrapper}>
      <img src={clipboard} alt="clipboard icon" />

      <div>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  );
}
