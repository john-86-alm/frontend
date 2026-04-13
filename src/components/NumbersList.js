import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import './NumbersList.css'

const NumbersList = () => {
  const { text } = useContext(UserContext)
  const [numbers, setNumbers] = useState([])
  const [sortParam, setSortParam] = useState('number')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://127.0.0.1:8000/api/contacts')

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setNumbers(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Не удалось загрузить контакты')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()
  }, [])

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

  if (isLoading) {
    return (
      <div className="phone-table">
        <div className="loader-card">
          <div className="loader-spinner" aria-hidden="true"></div>
          <p className="loader-title">Загружаем контакты</p>
          <p className="loader-subtitle">
            Подготавливаем список номеров для отображения
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="phone-table">
        <div className="error-card">
          <div className="error-icon" aria-hidden="true">
            !
          </div>
          <p className="error-title">{error}</p>
          <p className="error-subtitle">
            Свяжитесь со службой поддержки - вн. номер 777 Евгений, 710 Илья
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="phone-table">
      <div className="conteiner">
        <div className="table-headliners">
          <button
            onClick={() => setSortParam('number')}
            type="button"
            className={`button-headliners ${
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
          <div className="contact">{number.number}</div>
          <div className="contact">{number.location}</div>
          <div className="contact">{number.user}</div>
          <div className="contact">{number.group}</div>
        </div>
      ))}
    </div>
  )
}

export default NumbersList
