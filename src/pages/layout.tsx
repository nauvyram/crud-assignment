import { Outlet } from "react-router-dom"

import '../App.scss';
import '../theme/helper.scss'
import Alert from '../components/Alert/Alert'

const Layout = () => {
    return (
        <div className="App grid text-light">
            <header className="App__header text-center text-light">Employee Directory</header>
            <main className="App__main">
                <Outlet />
            </main>
            <footer className="App__footer text-light text-center">&copy; 2022</footer>
            <Alert />
        </div>
    )
}

export default Layout