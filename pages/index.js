import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './login'
import CoverNav from './Coverpage'
import ClassPage from './class_page';

import Ratings from '@/components/Ratings.js'
import ClassInfoContainer from '@/components/ClassInfoContainer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <div>
    <CoverNav />
    <Login class="signInBtn"></Login>
   </div>
  )
}