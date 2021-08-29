import React, { createContext, ReactNode, useState, useContext, useCallback } from 'react'
import { toast } from 'react-toastify'

import { api } from '../../service/api'

interface IProps {
  children: ReactNode
}

interface INote {
  description: string
  file_url: string
  created_at: string
  id: string
}

interface INotes {
  note: INote[]
  noteCall: (user_id: string) => Promise<INote[]>
}

const Note = createContext<INotes>({} as INotes)

export function NoteProvider({ children }: IProps) {
  const [note, setNote] = useState<INote[]>([])

  const noteCall = useCallback(async (user_id: string) => {
    try {
      const { data } = await api.get(`notes/${user_id}`)

      setNote(data)
      return data
    } catch (error) {
      toast.error('Houve um erro na listagem de anotações!')
    }
  }, [])

  return (
    <Note.Provider
      value={{
        note,
        noteCall,
      }}
    >
      {children}
    </Note.Provider>
  )
}

export function useNotes() {
  const context = useContext(Note)

  return context
}
