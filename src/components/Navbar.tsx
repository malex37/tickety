import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

const App = () => {

  return (
  <>
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-primary">Ticketer</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
          <li tabIndex={0}>
            <a>Tools</a>
            <ul className='p-2'>
              <NavLink to='/addressBook'>Address book</NavLink>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </>
  )
}

export default App
