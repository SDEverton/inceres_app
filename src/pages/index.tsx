import React, { useState, useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa'

import styles from './home.module.scss'
import { useList } from '../hooks/Items'
import { Item } from '../components/Item'
import { AddItem } from '../components/AddItem'

export default function Home() {
  const [addItem, setAddItem] = useState<boolean>(false)
  const { list, listCall } = useList()

  useEffect(() => {
    listCall()
  }, [listCall])

  return (
    <div className={styles.contentContainer}>
      {addItem ? (
        <AddItem goBack={() => setAddItem(!addItem)} />
      ) : (
        <>
          <div className={styles.containerButton}>
            <button onClick={() => setAddItem(!addItem)}>
              <FaUserPlus size={32} color="#fff" />
            </button>
          </div>

          <div className={styles.scroll}>
            {list.map((item) => (
              <Item key={item.id} user={item} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
