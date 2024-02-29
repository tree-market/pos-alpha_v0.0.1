//import {useContext} from "react"

//import { LoginContext } from "../LoginContext"


function InvoiceHeader({handleBackButton}:any){
   // const [state]:any = useContext(LoginContext)
    return(
      <div className="payment-header relative grid grid-flow-col h-[64px] px-4 pt-2">
      <div className="justify-self-start grid grid-flow-col items-center gap-3">
        <div onClick={()=>{handleBackButton()}} className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-2xl"> <img src="https://tree.market/img/icons/chevron-left-icon.png" className="w-[20px]" />
        </div>
        <div className="user-names justify-self-start">
          <div className="profile-name font-semibold">New Invoice
          </div>
        </div>
      </div>
      <div className="connect-button grid justify-self-end items-center text-center">
        <div className="px-4 py-1 bg-slate-200 rounded-full">
          Open
        </div>
      </div>
    </div>
    )
}

export default InvoiceHeader