import React, {Component} from 'react';
import axios from 'axios';

import './App.css';
import Header from './Header/Header';
import InputForm from './InputForm/InputForm';
import Tasks from './Tasks/Tasks';
import Filter from './Filter/Filter';
import Loading from './Loading/Loading';
import loading from './Loading/Loading';

class App extends Component {
  state = {
    form: {
      value: "",
      isDone: false
    },
    tasks: null,
    loading: false, 
    currentFilter: 'all'
  };

  componentDidMount = () => {
    axios.get('https://todo-app-7c377-default-rtdb.firebaseio.com/todo.json')
    .then(response => {
      // let tasks = [];
      // console.log(response.data);
      // for (let taskKey in response.data) {
      //   let task = response.data[taskKey];
      //   task.id = taskKey;
      //   tasks.push(task);
      // }
      this.setState({tasks: {...response.data}});
      // console.log(this.state.tasks);
    });
  };

  setFormValueHandler = (event) => {
    this.setState(prevState => {
      return {
        form: {
        ...prevState.form,
        value: event.target.value
        }
      };
    });
  };

  formClickedHandler = () => {
    this.setState(prevState => {
      return {
        form:{
          ...prevState.form,
          isDone: !prevState.form.isDone
        }
      }
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    axios.post('https://todo-app-7c377-default-rtdb.firebaseio.com/todo.json', {
      isDone: this.state.form.isDone,
      value: this.state.form.value
    })
    .then(response => {
      console.log(response);
      this.setState(prevState => {
        console.log(prevState);
        return {
          form: {
            value: "",
            isDone: false
          },
          tasks: {
            ...prevState.tasks,
            [response.data.name] : {
              isDone: prevState.form.isDone,
              value: prevState.form.value
            }
          }
        }
      });
    });
  };

  taskClickedHandler = (id) => {
    axios.patch(`https://todo-app-7c377-default-rtdb.firebaseio.com/todo/${id}.json`, {
      isDone: !this.state.tasks[id].isDone
    });

    this.setState(prevState => {
      return {
        tasks: {
          ...prevState.tasks,
          [id]: {
            ...prevState.tasks[id],
            isDone: !prevState.tasks[id].isDone
          }
        }
      }
    });
  };

  deleteTaskHandler = (id) => {
    axios.delete(`https://todo-app-7c377-default-rtdb.firebaseio.com/todo/${id}.json`);
    this.setState(prevState => {
      let prevTasks = {...prevState.tasks};
      delete prevTasks[id];
      return {
        tasks: prevTasks
      }
    })
  };

  filterCompletedHandler = () => {
    this.setState({loading: true});
    axios.get('https://todo-app-7c377-default-rtdb.firebaseio.com/todo.json')
    .then(response => {
      let filteredTasks = {...response.data};
      for (let taskKey in filteredTasks) {
        if (!filteredTasks[taskKey].isDone) {
          delete filteredTasks[taskKey];
        }
      }
      this.setState({tasks: filteredTasks, loading: false, currentFilter: 'completed'});
    });
  };

  showAllHandler = () => {
    this.setState({loading: true});
    axios.get('https://todo-app-7c377-default-rtdb.firebaseio.com/todo.json')
    .then(response => {
      this.setState({tasks: {...response.data}, loading: false, currentFilter: 'all'});
    });
  };

  filterActiveHandler = () => {
    this.setState({loading: true});
    axios.get('https://todo-app-7c377-default-rtdb.firebaseio.com/todo.json')
    .then(response => {
      let filteredTasks = {...response.data};
      for (let taskKey in filteredTasks) {
        if (filteredTasks[taskKey].isDone) {
          delete filteredTasks[taskKey];
        }
      }
      this.setState({tasks: filteredTasks, loading: false, currentFilter: 'active'});
    });
  };

  deleteCompletedHandler = async () => {
    this.setState({loading: true});
    let updatedTasks = {...this.state.tasks};
    for (let taskKey in this.state.tasks) {
      let task = this.state.tasks[taskKey];
      if (task.isDone){
        await axios.delete(`https://todo-app-7c377-default-rtdb.firebaseio.com/todo/${taskKey}.json`)
        .then(response => {
          delete updatedTasks[taskKey];
        });
      }
    }
    this.setState({tasks: updatedTasks, loading: false});
  };

  render () {
    let main = (
      <React.Fragment>
          <Tasks tasks={this.state.tasks}
          clicked={this.taskClickedHandler}
          delete={this.deleteTaskHandler}/>
          <Filter tasks={this.state.tasks}
          filterName={this.state.currentFilter}
          filterCompleted={this.filterCompletedHandler}
          filterAll={this.showAllHandler}
          filterActive={this.filterActiveHandler}
          deleteCompleted={this.deleteCompletedHandler}/>
      </React.Fragment>
    );
    if (this.state.loading) {
      main = <Loading/>;
    }
    return (
      <div className="App">
        <div className="Container">
          <Header/>
          <InputForm clicked={this.formClickedHandler}
            isDone={this.state.form.isDone}
            value={this.state.form.value}
            setValue={this.setFormValueHandler}
            submit={this.formSubmitHandler}/>
          {main}
        </div>
      </div>
    );
  }
}

export default App;
