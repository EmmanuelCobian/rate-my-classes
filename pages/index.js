import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <div>
    <Login class="signInBtn"></Login>
    <header>
    <h1>My Menu Heading</h1>
    </header>

    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </nav>
  </div>
  )
}