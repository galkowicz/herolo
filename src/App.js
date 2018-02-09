import React, {Component} from 'react';
import './App.css';
import {asyncGetBooks} from './server/serverUtil';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {books: {}}
    }

    componentDidMount() {
        asyncGetBooks().then((data) => {
            this.setState({books: data.books})
        });
    }

    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

export default App;
