import { useContext } from 'react'
import UserContext from '../context/UserContext'
import './Filter.css'

const Filter = () => {
  const { text, changeText } = useContext(UserContext)

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        className="filter"
        type="search"
        id="searchByUser"
        value={text}
        onChange={(e) => changeText(e.target.value)}
        placeholder="Поиск"
      ></input>
    </form>
  )
}

export default Filter
