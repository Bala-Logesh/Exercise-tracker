import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import ExercisesList from './components/ExercisesList'
import EditExercise from './components/EditExercise'
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser'

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/edit/:id'>
            <EditExercise />
          </Route>
          <Route path='/create'>
            <CreateExercise />
          </Route>
          <Route path='/user'>
            <CreateUser />
          </Route>
          <Route path='/'>
            <ExercisesList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
