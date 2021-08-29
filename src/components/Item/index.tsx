import React, { useState, useCallback } from 'react'
import { FaUser, FaRegWindowClose } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { format, parseISO, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { Button } from 'primereact/button'

import { api } from '../../service/api'
import { AddSubItem } from '../AddSubItem'
import { useNotes } from '../../hooks/Notes'
import styles from './styles.module.scss'

interface IProps {
  user: {
    id: string
    name: string
  }
}

interface INote {
  description: string
  file_url: string
  created_at: string
  id: string
}

const Item: React.FC<IProps> = ({ user }) => {
  const [show, setShow] = useState<boolean>(false)
  const [notes, setNotes] = useState<INote[]>([])
  const [showList, setShowList] = useState<boolean>(false)

  const { noteCall } = useNotes()

  const handlerDetail = useCallback(async () => {
    try {
      const data = await noteCall(user.id)

      setNotes(data)
      setShow(!show)
      if (!data.length) {
        toast.warn('O usuário não possui nenhuma anotação!')
      } else {
        setShowList(true)
      }
    } catch (error) {
      toast.error('Não foi possível encontrar as anotações do usuário!')
    }
  }, [user.id, setShow, show, noteCall])

  function formatDate(note: INote) {
    return format(subHours(parseISO(note.created_at), 3), "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
      locale: pt,
    })
  }

  async function excludeNote(id: string) {
    try {
      await api.delete(`notes/delete/${id}`)

      const data = await noteCall(user.id)

      setNotes(data)
      toast.success('Anotação apagada com sucesso!')
    } catch (error) {
      toast.error('Não foi possível apagar a anotação!')
    }
  }

  function actionBody(note: INote) {
    return (
      <>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => excludeNote(note.id)}
        />
      </>
    )
  }

  function openFile(file_url: string) {
    return window.open(file_url)
  }

  function buttonFile(note: INote) {
    return (
      <Button
        icon="pi pi-link"
        className="p-button-rounded p-button-success p-mr-2"
        onClick={() => openFile(note.file_url)}
      />
    )
  }

  const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button
        type="button"
        icon="pi pi-plus"
        onClick={() => setShowList(false)}
        className="p-mr-2"
        // data-pr-tooltip="CSV"
      />
    </div>
  )

  return (
    <>
      <button onClick={() => !show && handlerDetail()} className={styles.container}>
        <FaUser color="#fff" size={30} />
        <p>{user.name}</p>

        <Modal isOpen={show} onRequestClose={() => setShow(false)}>
          <h1 className={styles.title}>Anotações de {user.name}</h1>
          <div className={styles.modal}>
            <button className={styles.buttonModal} onClick={() => setShow(false)}>
              <FaRegWindowClose color="#fff" size={25} />
            </button>

            {!showList ? (
              <div className={styles.subItem}>
                <AddSubItem user={user} />
              </div>
            ) : (
              <div className={styles.subItem}>
                <div>
                  <div className="card">
                    <DataTable value={notes} header={header}>
                      <Column field="description" header="Descrição"></Column>
                      <Column body={formatDate} header="Data de Criação"></Column>
                      <Column body={buttonFile} header="Arquivo"></Column>
                      <Column body={actionBody} header="Opções"></Column>
                    </DataTable>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </button>
    </>
  )
}

export { Item }
