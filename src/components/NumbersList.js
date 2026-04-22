import { useContext, useEffect, useState } from 'react'
import numbers from '../data/numbers'
import UserContext from '../context/UserContext'
import './NumbersList.css'

const NumbersList = () => {
  const { text } = useContext(UserContext)
  const [sortParam, setSortParam] = useState('number')

  function sortList(list, param) {
    return list.sort((a, b) => (a[param] > b[param] ? 1 : -1))
  }

  const filterNumbersList = numbers.filter(
    ({ number, location, user, group }) => {
      const matches = String(number)
        .concat(location)
        .concat(user)
        .concat(group)
        .toLowerCase()
        .includes(String(text).toLowerCase())

      return matches
    },
  )

  sortList(filterNumbersList, sortParam)

  return (
    <div className="phone-table">
      <div className="conteiner">
        <div className="table-headliners table-headliners-number">
          <button
            onClick={() => setSortParam('number')}
            type="button"
            className={`button-headliners button-headliners-number ${
              sortParam === 'number' ? 'headliners-sort' : ''
            } `}
          >
            Номер
          </button>
        </div>
        <div className="table-headliners">
          <button
            onClick={() => setSortParam('location')}
            type="button"
            className={`button-headliners ${
              sortParam === 'location' ? 'headliners-sort' : ''
            } `}
          >
            Расположение
          </button>
        </div>
        <div className="table-headliners">
          <button
            onClick={() => setSortParam('user')}
            type="button"
            className={`button-headliners ${
              sortParam === 'user' ? 'headliners-sort' : ''
            } `}
          >
            Пользователь
          </button>
        </div>
        <div className="table-headliners">
          <button
            onClick={() => setSortParam('group')}
            type="button"
            className={`button-headliners ${
              sortParam === 'group' ? 'headliners-sort' : ''
            } `}
          >
            Отдел
          </button>
        </div>
      </div>
      {filterNumbersList.map((number, i) => (
        <div className="conteiner" key={i}>
          <div className="contact contact-number">{number.number}</div>
          <div className="contact">{number.location}</div>
          <div className="contact">{number.user}</div>
          <div className="contact">{number.group}</div>
        </div>
      ))}
    </div>
  )
}

export default NumbersList
