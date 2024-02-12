import React,{useContext,useState} from "react"
import ConnectButton from "./connectButton"
import { LoginContext } from "../LoginContext"
import SideMenu from "./sideMenu"

function Header({toggleMenu}){
    const [state,setState] = useContext(LoginContext)
    const [showMenu, setShowMenu] = useState(false)
    return(
        <>
        <div className="header relative grid grid-flow-col h-[64px] px-4">
        <div className="justify-self-start grid grid-flow-col items-center gap-3">
        
          <div onClick={toggleMenu} className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-4xl">&#8801;</div>
          <div className="user-names justify-self-start">
            <div className="store-name text-sm">Welcome</div>
            <div className="profile-name font-semibold">{state.address && state.address.substring(0,5)+"..."+state.address.substring(61,66)}</div>
          </div>
        </div>
        
        
        <div className="connect-button grid justify-self-end items-center text-center">
          <ConnectButton/>
        </div>
      </div>
      
      </>
    )
}

export default Header