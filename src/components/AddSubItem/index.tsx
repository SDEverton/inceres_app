import React, { useState, useCallback } from 'react'
import { FaTasks } from 'react-icons/fa'
import { toast } from 'react-toastify'

import styles from './styles.module.scss'
import { api } from '../../service/api'
import { useList } from '../../hooks/Items'

interface IProps {
  goBack: () => void
}

const AddSubItem: React.FC<IProps> = ({ goBack }) => {
  const [name, setName] = useState<string>('')

  const { listCall } = useList()

  const handlerSubmit = useCallback(async () => {
    try {
      await api.post('users', {
        name,
      })
      toast.success('Usuário salvo com sucesso!')
      goBack()
      listCall()
    } catch (error) {
      toast.error('Não foi possível completar a ação.')
    }
  }, [name, goBack, listCall])

  return (
    <div className={styles.container}>
      <FaTasks color="#004642" size="90" />
      <input value={name} placeholder="Descrição" onChange={(e) => setName(e.target.value)} />
      <input
        type="file"
        value={name}
        placeholder="Descrição"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handlerSubmit}>Enviar</button>
      <a onClick={goBack}>Voltar</a>
    </div>
  )
}

export { AddSubItem }
