import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'
import numbers from '../data/numbers'
import './NumbersList.css'

const NumbersList = () => {
    const { text } = useContext(UserContext)
    const [sortParam, setSortParam] = useState('number')

    function sortList(list, param) {
        return list.sort((a, b) => (a[param] > b[param] ? 1 : -1))
    }

    const filterNumbersList = numbers.filter(({ number, location, group }) => {
        const matches = String(number)
            .concat(location)
            .concat(group)
            .toLowerCase()
            .includes(String(text).toLowerCase())

        return matches
    })

    sortList(filterNumbersList, sortParam)

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
                    <div className="contact">{number.group}</div>
                </div>
            ))}
        </div>
    )
}

export default NumbersList
