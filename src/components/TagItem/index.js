import './index.css'

const TagItem = props => {
  const {tagItem, activeTagId, updateActiveTagId} = props
  const {displayText, optionId} = tagItem
  const onClickUpdateActiveTagId = () => {
    updateActiveTagId(optionId)
  }
  const activeClass = activeTagId === optionId ? 'active-btn' : 'non-active'
  return (
    <li className="list-item">
      <button
        className={`tag-btn ${activeClass}}`}
        type="button"
        onClick={onClickUpdateActiveTagId}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
