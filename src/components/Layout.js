import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  const [active,setActive]=useState('Home')
  const onSetActive=(name)=>{
    setActive(name)
  }
  return (
    <section >
       <div className='flex justify-between p-3 bg-purple-900'>
          <div>
            <h2 className='font-bold text-white'><Link to={'/'}>Redux Blog</Link></h2>
          </div>
          <div>
            <nav>
              <ul className='flex font-semibold text-gray-300'>
                <li className={`mr-2 ${active==='Home'?'border-b':'border-none'}`} onClick={()=>onSetActive('Home')}><Link to={'/'}>Home</Link></li>
                <li className={`mr-2 ${active==='Posts'?'border-b':'border-none'}`} onClick={()=>onSetActive('Posts')}><Link to={'/posts'}>Posts</Link></li>
                <li className={`mr-2 ${active==='Users'?'border-b':'border-none'}`} onClick={()=>onSetActive('Users')}><Link to={'/users'}>Users</Link></li>
              </ul>
            </nav>
          </div>
       </div>
      <Outlet/>
    </section>
  )
}

export default Layout
