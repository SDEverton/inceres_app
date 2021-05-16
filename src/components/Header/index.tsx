import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>CONTELE</h1>
        <nav>
          <a className={styles.active}>Home</a>
        </nav>
      </div>
    </header>
  )
}