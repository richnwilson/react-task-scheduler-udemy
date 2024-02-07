import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const AddTask = ({ addNewTask }) => {
    const [what, setWhat] = useState('');
    const [when, setWhen] = useState(new Date());
    const [reminder, setReminder] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        if (!what) {
            setErrors({what: 'Please enter a task'});
            return;
        }
        if (!when) {
            setErrors({when: 'Please enter a date/time'});
            return;
        }
        const whenMoment = moment(when).format('MMM Do YYYY [at] h:mm a');

        addNewTask({what, when: whenMoment, reminder});

        setWhat('');
        setWhen('');
        setErrors({});
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label>Task</label>
                <input type='text' value={what} onChange={(e) => setWhat(e.target.value)} placeholder='What is your task ...' />
                {errors.what !== '' && <label style={{color: 'red'}}>{errors.what}</label>}
            </div>
            <div className='form-control'>
                <label>Date and Time</label>
                <DateTimePicker onChange={setWhen} value={when}/>
                {errors.when !== '' && <label style={{color: 'red'}}>{errors.when}</label>}
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input name="reminder" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} type='checkbox' />
            </div>  
            <input type='submit' className='btn btn-block' value='Save Task'/>                      
        </form>
    )
}

export default AddTask
