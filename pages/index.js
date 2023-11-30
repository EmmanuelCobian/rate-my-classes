import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './login'
import CoverNav from './Coverpage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <div>
    <CoverNav />
    <Login class="signInBtn"></Login>
  </div>
  )
}