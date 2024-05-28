import './index.css'

const TaskItem = props => {
  const {taskItem} = props
  console.log(taskItem)
  const {task, tag} = taskItem
  return (
    <li className="task-list-item">
      <p className="task-title">{task}</p>
      <p className="task-tag">{tag}</p>
    </li>
  )
}

export default TaskItem
