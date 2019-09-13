import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import { findNote } from '../notes-helpers'
import Context from '../Context-Comp/Context'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  }
  static contextType = Context

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = !!findNote(notes, noteId)
      ? findNote(notes, noteId)
      : this.props.history.goBack()

    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    )
  }
}
