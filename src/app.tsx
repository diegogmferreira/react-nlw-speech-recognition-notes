import { useState } from 'react';
import logo from './assets/logo-nlw.svg';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';

export interface INote {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<INote[]>(() => {
    const notesOnStorage = localStorage.getItem('@NLW-notes');

    if (notesOnStorage) return JSON.parse(notesOnStorage);

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem('@NLW-notes', JSON.stringify(notesArray))
  }

  function onNoteDelete(noteId: string) {
    const notesArray = notes.filter(note => note.id !== noteId);

    setNotes(notesArray);
    localStorage.setItem('@NLW-notes', JSON.stringify(notesArray))
  }

  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes;

  return (
   <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
    <img src={logo} alt="NLW Export logo" />

    <form action="" className='w-full'>
      <input 
        type="text" 
        placeholder='Busque em suas notas...'
        onChange={(event) => setSearch(event.target.value)}
        className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
      />
    </form>

    <div className='h-px bg-slate-700'/>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
      <NewNoteCard 
        onNoteCreated={onNoteCreated}
      />

      {filteredNotes.map(note => (
        <NoteCard 
          key={note.id}
          note={note}
          onNoteDelete={onNoteDelete}
        />
      ))}
    </div>

   </div>
  )
}

