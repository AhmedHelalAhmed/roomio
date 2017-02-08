import React, { Component } from 'react';
import styles from './style.css';
import axios from 'axios';

const authHeaders = {
    Authorization: `Bearer ${window.user ? window.user.token : ''}`
};

class Notes extends Component {
    state = {
        note: '',
        notes: [],
        error: null,
        loading: false
    };

    componentWillMount() {
        const args = { headers: {...authHeaders} };
        axios.get('/api/notes', args)
            .then((res) => this.setState({ notes: res.data.notes || [] }) )
            .catch((error) => this.setState({ error: error.toString() }) );
    }

    makeNote = (e) => {
        e.preventDefault();
        const args = { headers: {...authHeaders} };
        const data = { ...this.state.fields };
        axios.post('/api/notes', data, args)
            .then((res) => {
                const notes = this.state.notes.slice(); //  slice returns a copy of the array so we don't modify the state object directly.
                notes.push(res.data);
                this.setState({ notes: notes, fields: { note: '' } });
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
                    { this.state.error ? 'there was an error' : null }
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
