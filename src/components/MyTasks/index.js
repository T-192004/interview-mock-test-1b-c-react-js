import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from '../TagItem'
import TaskItem from '../TaskItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]
class MyTasks extends Component {
  state = {
    taskInput: '',
    activeTagId: null,
    tagsInput: tagsList[0].optionId,
    tasksList: [],
  }

  updateTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  updateActiveTagId = optionId => {
    const {activeTagId} = this.state
    if (activeTagId === optionId) {
      this.setState({activeTagId: null})
    } else {
      this.setState({activeTagId: optionId})
    }
  }

  renderInputTaskElement = () => {
    const {taskInput} = this.state

    return (
      <>
        <label className="input-label" htmlFor="task">
          Task
        </label>
        <input
          className="input-box"
          type="text"
          id="task"
          onChange={this.updateTaskInput}
          placeholder="Enter the task here"
          value={taskInput}
        />
      </>
    )
  }

  updateTagsInput = event => {
    this.setState({tagsInput: event.target.value})
  }

  renderInputTagsElement = () => (
    <>
      <label className="input-label" htmlFor="tags">
        Tags
      </label>
      <select
        className="input-box"
        onChange={this.updateTagsInput}
        name="tags-List"
        id="tags"
      >
        {tagsList.map(tag => (
          <option
            value={tag.optionId}
            key={tag.optionId}
            className="option-item"
            onChange={this.updateActiveTagId}
          >
            {tag.displayText}
          </option>
        ))}
      </select>
    </>
  )

  addTaskItemInList = event => {
    event.preventDefault()
    const {tagsInput, taskInput} = this.state
    const newTask = {
      task: taskInput,
      taskId: uuidv4(),
      tag: tagsInput,
      optionId: tagsInput,
    }
    this.setState(prev => ({
      tasksList: [...prev.tasksList, newTask],
      taskInput: '',
      tagsInput: tagsList[0].optionId,
    }))
  }

  render() {
    const {tasksList, activeTagId} = this.state
    let filteredTasksList = tasksList
    if (activeTagId !== null) {
      filteredTasksList = tasksList.filter(
        task => task.optionId === activeTagId,
      )
    }
    console.log(filteredTasksList)
    return (
      <div className="app-container">
        <div className="create-task-container">
          <h1 className="create-task-main-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.addTaskItemInList}>
            <div className="input-container">
              {this.renderInputTaskElement()}
            </div>
            <div className="input-container">
              {this.renderInputTagsElement()}
            </div>
            <button className="task-add-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="tasks-container">
          <h1 className="tasks-main-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(tagItem => (
              <TagItem
                key={tagItem.optionId}
                tagItem={tagItem}
                updateActiveTagId={this.updateActiveTagId}
                activeTagId={activeTagId}
              />
            ))}
          </ul>
          <h1 className="tasks-main-heading">Tasks</h1>
          <div className="tasks-result-container">
            {filteredTasksList.length === 0 ? (
              <p className="result-title">No Tasks Added Yet</p>
            ) : (
              <ul className="tasks-list">
                {filteredTasksList.map(taskItem => (
                  <TaskItem
                    taskItem={taskItem}
                    key={taskItem.taskId}
                    onClick={this.updateActiveTagId}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
