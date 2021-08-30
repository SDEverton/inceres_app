import React, { useState, useCallback } from 'react'
import { FaFileSignature } from 'react-icons/fa'
import { toast } from 'react-toastify'

import styles from './styles.module.scss'
import { api } from '../../service/api'

interface IProps {
  user: {
    id: string
  }
  note?: INote
  goBack: () => void
}

interface IFile {
  file: any
}

interface INote {
  description: string
  file_url: string
  created_at: string
  id: string
}

const AddSubItem: React.FC<IProps> = ({ user, note, goBack }) => {
  console.log(note)
  const [description, setDescription] = useState<string>(note?.description || '')
  const [file, setFile] = useState<IFile>()

  const handlerSubmit = useCallback(async () => {
    const formData = new FormData()

    formData.append('file', file?.file[0])
    formData.append('description', description)
    formData.append('type_file', file?.file[0].type)
    formData.append('user_id', user.id)

    try {
      if (note) {
        console.log('aqui')
        await api.put(`notes/${note.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        console.log('alí')
        await api.post('notes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      setDescription('')
      goBack()
      setFile(undefined)
      toast.success('Usuário salvo com sucesso!')
    } catch (error) {
      toast.error('Não foi possível completar a ação.')
    }
  }, [description, file, user.id, goBack, note])

  return (
    <div className={styles.container}>
      <FaFileSignature color="#004642" size="80" />
      <input
        value={description}
        placeholder="Descrição"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile({ file: e.target.files })} />
      <p style={{ color: 'black' }}>{file?.file[0].name}</p>
      <button onClick={handlerSubmit}>Enviar</button>
    </div>
  )
}

export { AddSubItem }
