import Image from 'next/image'
import styles from '@/styles/header.module.scss' 
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface HeaderProps {
    query: string
    setQuery: (query: string) => void
}

export default function Header({ query, setQuery }: HeaderProps) {
    const router = useRouter()
    const [username, setUsername] = useState('')

    useEffect(() => {
        // Verifique se está no lado do cliente
        if (typeof window !== 'undefined') {
          const storedUsername = localStorage.getItem('username');
          if(storedUsername !== null) {
            setUsername(storedUsername);
          }
        }
      }, []);

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleLogout() {
        localStorage.removeItem("authToken")
        router.push('/')
    }

    return (
        <header className={styles.navContainer}>
            <Image alt='Notes icon' src={'/images/notes_icon.png'} width={32} height={32}></Image>
            <h2 className={styles.title}>CoreNotes</h2>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar Notas" value={query} onChange={(e) => {handleInput(e)}}/>
                <Image alt='Magnifying glass icon' src={'/images/magnifying_glass.png'} width={16} height={16}></Image>
            </div>
            <p>{username}</p>
            <Image className={styles.closeButton} alt='Close button button' src={'/images/x_button.png'} onClick={handleLogout} width={16} height={16}></Image>
        </header>
    )
}