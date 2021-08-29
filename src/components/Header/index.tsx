import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.containerImg}>
          <img src="https://inceres.com.br/wp-content/uploads/2019/07/logo-inceres-VERDE.png" />
        </div>

        <nav>
          <a className={styles.active}>Home</a>
        </nav>
      </div>
    </header>
  )
}
