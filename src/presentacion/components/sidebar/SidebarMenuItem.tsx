import { menuRoutes } from '../../router/router'
import { NavLink } from 'react-router-dom'

export const SidebarMenuItem = () => {
  return (
    <>
    {
            menuRoutes.map( opcion => (
                <NavLink key={opcion.to} to={opcion.to} 
                className={ ({isActive}) =>
                    isActive
                        ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors'
                        : 'flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors'
                } 
                >
                    <i className={`${opcion.icon} text-2xl mr-4 text-indigo-400`}></i>
                    <div className="flex flex-col flex-grow">
                        <span className="text-white text-lg font-semibold">{opcion.title}</span>
                        <span className=" text-gray-400 text-sm">{opcion.description}</span>
                    </div>
                </NavLink>
                
                
                
            ))
        }
    </>
  )
}
