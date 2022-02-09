import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/button'
import styles from '../styles/Home.module.css'
import Text from '../components/text'
import Header from '../components/header'

export default function Home() {
  return (
    <div className={styles.container} className="m-0">
      <Header/>
    </div>
  )
}
