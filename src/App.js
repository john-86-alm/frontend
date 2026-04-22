import { useState } from 'react'
import UserContext from './context/UserContext'
import NumbersList from './components/NumbersList'
import Filter from './components/Filter'
import './App.css'

function App() {
    const [userText, setUserText] = useState('')

    return (
        <UserContext.Provider
            value={{ text: userText, changeText: setUserText }}
        >
            <div className="app">
                <header className="app-header">
                    <h1>Справочник внутренних номеров</h1>
                </header>
                <div className="app-search">
                    <Filter />
                </div>
                <main className="app-main">
                    <NumbersList />
                </main>
            </div>
        </UserContext.Provider>
    )
}

export default App
