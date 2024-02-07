import PropTypes from 'prop-types'
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, toggleAdd, showAddTask }) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            { location.pathname === '/' && <Button props={showAddTask ? {color: 'red', text: 'Close'} : {color: 'green', text: 'Add'}} toggleAdd={toggleAdd}/>}
        </header>
    )
}

Header.propTypes = {
    title : PropTypes.string.isRequired
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header
