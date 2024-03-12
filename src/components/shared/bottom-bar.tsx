
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { bottombarLinks } from '@/constants'
import { INavLink } from '@/types'

export const BottomBar = () => {
  const pathName =useLocation()

  return (
    <section>
      {bottombarLinks.map((link:INavLink)=>{
      const isActive = pathName===link.route
      return(
          <li key={link.label}
           className={`leftsidebar-link ${isActive && 'bg-primary-500 rounded-[10px]'} 
           flex-center flex-col gap-1 p-2 transition`}
          >
            <Link to={link.route}>
               <img src={link.imgURL}  alt={link.label}  
                 className={`group-hover:invert-white ${isActive && 'invert-white'}`}
               />
                  <img src={link.imgURL}  alt={link.label} width={16} height={16} className={`${isActive && 'invert-white'}`} />
                  <p className=' tiny-medium text-light-2'>
              {link.label}
            </p>
            </Link>     
            
          </li>
      )
     })}
     </section>
  )
}
