import React, { useState, useCallback } from 'react'
import { FaUser, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { api } from '../../service/api'
import { AddSubItem } from '../AddSubItem'
import styles from './styles.module.scss'

interface IProps {
  user: {
    id: string
    name: string
  }
  hidden: () => void
}

const Item: React.FC<IProps> = ({ user, hidden }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const handlerDetail = useCallback(async () => {
    try {
      const { data } = await api.get(`notes/${user.id}`)

      console.log(data)
      setShowDetail(!showDetail)
      hidden()
      if (data) {
        toast.warn('O usuário não possui nenhuma anotação!')
      }
    } catch (error) {
      toast.error('Não foi possível encontrar as anotações do usuário!')
    }
  }, [user.id, setShowDetail, showDetail, hidden])

  return (
    <>
      {showDetail ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <FaUser color="#1f2729" size={30} />
            <p>{user.name}</p>
          </div>
          <p>Insira suas anotações</p>
          <button>
            <FaPlus color="#fff" size={35} />
          </button>
          <AddSubItem goBack={() => console.log('')} />
        </div>
      ) : (
        <button onClick={handlerDetail} className={styles.container}>
          <FaUser color="#fff" size={30} />
          <p>{user.name}</p>
        </button>
      )}
    </>
  )
}

export { Item }
