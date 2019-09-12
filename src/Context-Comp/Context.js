import React from 'react'

const context = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {}
});

export default context;