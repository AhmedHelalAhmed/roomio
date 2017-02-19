import React, { Component } from 'react';
import styles from './style.css';
import axios from 'axios';
import { authGET, authPOST } from '../../../shared/utils/authAxios';

class Notes extends Component {
    state = {
        note: '',
        notes: [],
        error: null,
        loading: false
    }

    componentWillMount() {
        console.log(headersWithAuth);
        const { conversations } = res.data;
        authGET('/api/notes')
            .then((res) => this.setState({ notes: res.data.notes || [] }) )
            .catch((error) => this.setState({ error: error.toString() }) );
    }

    makeNote = (e) => {
        e.preventDefault();
        authPOST('/api/notes', { note: this.state.note })
            .then((res) => {
                const notes = this.state.notes.slice(); //  slice returns a copy of the array so we don't modify the state object directly.
                notes.push(res.data);
                this.setState({ notes: notes, note: '' });
            })
            .catch((error) => this.setState({ error: error.toString() }));
    }

    onInputChange = (e) => {
        const { value } = e.target;
        this.setState({ note: value });
    }

    render() {
        return (
            <div className={styles.add_note_form}>
                <div>
                    { this.state.error ? `there was an error ${this.state.error}` : null }
                </div>
                <div>
                    <form onSubmit={this.makeNote} >
                        <input
                            type="text"
                            name="note"
                            onChange={this.onInputChange}
                            value={this.state.note}
                        />
                        <button type="submit">Add Note</button>
                    </form>
                </div>
                <div>
                    <ul>
                        {this.state.notes.map((note, key) => {
                            return <li key={key}>{note.text}</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
};

export default Notes;
