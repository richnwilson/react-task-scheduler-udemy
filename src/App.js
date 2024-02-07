import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { MdError } from 'react-icons/md';
import Footer from './components/Footer';
import axios from 'axios';
import About from './components/About';
import { BrowserRouter as Router, Route} from 'react-router-dom';


// State are now global as in top level 'App'
import { useState, useEffect } from 'react';

function App() {

  const [ tasks, setTasks] = useState([])
  const [ showAddTask, setShowAddTask] = useState(false);
  const [ error, setError] = useState('');

  const getLatestData = async() => {
    const { data } = await axios('http://localhost:5000/tasks');
    return setTasks(data);
  }

  const getOneRecord = async(id) => {
    const { data } = await axios(`http://localhost:5000/tasks/${id}`);
    return data;
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios('http://localhost:5000/tasks');
        setTasks(data);
      } catch (e) {
        console.log("Error getting data:",e);
        setError('Error getting data');
        setTasks([]);
      }
    };
    fetchData();
  }, []);


  const addNewTask = async (task) => {
    try {
      await axios.post('http://localhost/5000/tasks', task);
      getLatestData()
    } catch(e) {
      console.log("Error posting data:",e);
      setError('Error posting data');
    }

  }
  const deleteTask =async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      getLatestData()
    } catch (e) {
      console.log("Error deleting data:",e);
      setError('Error deleting data');
    }
  }

  const toggleReminder = async (id) => {
    try {
      const data = await getOneRecord(id);
      await axios.put(`http://localhost/5000/tasks/${id}`, {...data, reminder: ! data.reminder});
      getLatestData()
    } catch(e) {
      console.log("Error updating data:",e);
      setError('Error updating data');
    }
  }

  const toggleAdd = () => {
    setShowAddTask(!showAddTask)
  }
  return (
    <Router>
      <div className="container">
        {error && <p style={{color: "red"}}><MdError style={{color: 'red'}}/>{error}</p> }
        <Header  toggleAdd={toggleAdd} showAddTask={showAddTask}/>
        <Route path='/' exact render={(props) => (
          <>
          {showAddTask && <AddTask toggleAdd={toggleAdd} addNewTask={addNewTask}/>}
          {!tasks.length ? <p>No Tasks available</p> : <Tasks tasks={tasks} onDelete={deleteTask} toggleReminder={toggleReminder}/>}
          <Footer/>
          </>  
          )}/>
        <Route path='/about' component={About}/>
      </div>
    </Router>
  );
}

export default App;
