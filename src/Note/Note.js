import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import Context from '../Context-Comp/Context'

export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {}
  }

  static contextType = Context

  handleDelete = (e) => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
      this.props.onDeleteNote(noteId)
      this.context.deleteNote(noteId)
      })
  }
  render(){
    const {name, id, modified} = this.props
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={this.handleDelete}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
  }
}
