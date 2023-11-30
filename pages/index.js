import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Login></Login>
  )
}