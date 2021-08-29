import React, { createContext, ReactNode, useState, useContext, useCallback } from 'react'
import { toast } from 'react-toastify'

import { api } from '../../service/api'

interface IProps {
  children: ReactNode
}

interface IList {
  id: string
  name: string
}

interface IListAll {
  list: IList[]
  listCall: () => void
}

const List = createContext<IListAll>({} as IListAll)

export function ListProvider({ children }: IProps) {
  const [list, setList] = useState<IList[]>([])

  const listCall = useCallback(async () => {
    try {
      const { data } = await api.get('users/list')

      setList(data)
    } catch (error) {
      toast.error('Houve um erro na listagem de usuários!')
    }
  }, [])

  return (
    <List.Provider
      value={{
        list,
        listCall,
      }}
    >
      {children}
    </List.Provider>
  )
}

export function useList() {
  const context = useContext(List)

  return context
}
