import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

const CreateExercise = () => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))

        history.push('/')
    }

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                if(res.data.length > 0){
                    setUsers(res.data.map(user => user.username))
                    setUsername(res.data[0].username)
                }
            })
    },[])

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            value={username}
                            onChange={e => setUsername(e.target.value)}>
                            {
                                users.map((user, i) => 
                                    <option key={i}
                                        value={user}>
                                        {user}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={duration}
                            onChange={e => setDuration(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <br/>
                        <DatePicker
                            selected={date}
                            onChange={e => setDate(e)} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
