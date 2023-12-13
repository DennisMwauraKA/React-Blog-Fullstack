import React from 'react'
import Header from '../pages/Header'
import { Outlet } from 'react-router-dom'


function MainLayout({children}) {
  return (
    <main>

      <Header/>
     <Outlet/>
    </main>
  )
}

export default MainLayout
