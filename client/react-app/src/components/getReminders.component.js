import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Home from './home.component';
import {Link } from 'react-router-dom';
class GetReminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get('https://b0bafdf64a63.ngrok.io/tasks/'+`${this.props.id}`).then((response) => {
            this.setState({data: response.data})
            console.log(this.state.data)
        })
    }

    render() {
        var navStyle = {
            marginTop: "50px"
        }
        return (
        <div>
            <Home></Home>
            <div class="container"style={navStyle}>
                <table class="jumbotron bg-white text-secondary table table-bordered">
                <thead class="text-white">
                    <tr>
                        <th class="text-secondary">Description</th>
                        <th class="text-secondary">Responsible</th>
                        <th class="text-secondary">Frequency</th>
                        <th class="text-secondary">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(id => (
                    <Row id = {id} />
                ))}
                </tbody>
                </table>
            </div>
            <div class="footer">
                <footer class="page-footer font-small blue">
                    <div class="footer-copyright text-center py-3 bg-secondary text-white">© 2020 Copyright:
                <a class="text-info" href="https://mdbootstrap.com/"> MDBootstrap.com</a>
                </div>
                </footer>
                </div>
        </div>
    )}
}

const Row = ({ id }) => (
    <tr>
      <td>{id.reminder_description}</td>
      <td>{id.reminder_responsible}</td>
      <td>{id.reminder_frequency}</td>
      <td><Link to={{pathname: "/notes", state: {notes: id.notes}}}>Link</Link></td>
    </tr>
  );

const mapStateToProps = (state) => (state.loginReducer);

export default connect(mapStateToProps)(GetReminders);