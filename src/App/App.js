import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import './App.css'
import Context from '../Context-Comp/Context'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
    .then(res => res.json())
    .then(resJSON => {
        this.setState({
            folders: resJSON
        })
    })

    fetch('http://localhost:9090/notes')
    .then(res => res.json())
    .then(resJSON => {
        this.setState({
            notes: resJSON
        })
    })
  }

  handleDeleteNote = noteId => {
      this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
      })
  }

  renderNavRoutes() {
    return (
      <React.Fragment>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
            // render={routeProps => (
            //     <NoteListNav
            //         folders={folders}
            //         notes={notes}
            //         {...routeProps}
            //     />
            // )}
          />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </React.Fragment>
    )
  }

  renderMainRoutes() {
    return (
      <React.Fragment>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
            // render={routeProps => {
            //     const {folderId} = routeProps.match.params;
            //     const notesForFolder = getNotesForFolder(
            //         notes,
            //         folderId
            //     );
            //     return (
            //         <NoteListMain
            //             {...routeProps}
            //             notes={notesForFolder}
            //         />
            //     );
            // }}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageMain}
          // render={routeProps => {
          //     const {noteId} = routeProps.match.params;
          //     const note = findNote(notes, noteId);
          //     return <NotePageMain {...routeProps} note={note} />;
          // }}
        />
      </React.Fragment>
    )
  }

  render() {
      const value = {
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.handleDeleteNote
      }
    return (
      <Context.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </Context.Provider>
    )
  }
}

export default App
