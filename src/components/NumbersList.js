import { useContext, useState } from 'react'
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
      <div className="conteiner table-row table-header-row">
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
        <div className="conteiner table-row table-data-row" key={i}>
          <div
            className="contact contact-number"
            data-label={'\u041d\u043e\u043c\u0435\u0440'}
          >
            {number.number}
          </div>
          <div className="contact" data-label={'\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435'}>
            {number.location}
          </div>
          <div className="contact" data-label={'\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c'}>
            {number.user}
          </div>
          <div className="contact" data-label={'\u041e\u0442\u0434\u0435\u043b'}>
            {number.group}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NumbersList
