import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

const EditExercise = () => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const history = useHistory()
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault()
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        
        axios.post('http://localhost:5000/exercises/update/' + params.id, exercise)
            .then(res => console.log(res.data))

        history.push('/')
    }

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/' + params.id)
            .then(res => {
                setUsername(res.data.username)
                setDescription(res.data.description)
                setDuration(res.data.duration)
                setDate(new Date(res.data.date))
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5000/users')
            .then(res => {
                if(res.data.length > 0){
                    setUsers(res.data.map(user => user.username))
                }
            })
    }, [])

    return (
        <div>
            <h3>Edit New Exercise Log</h3>
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default EditExercise
