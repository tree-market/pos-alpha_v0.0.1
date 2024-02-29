//import {useContext} from "react"

//import { LoginContext } from "../LoginContext"


function InvoiceFooter({invoiceTotal,step,setStep,isTipping,tip}:any){
   const handleNextStep = ()=>{
    if(invoiceTotal==0 || step == 3){
      return
    }else{
      setStep(step+1)
    }
   }
    return(
      <>
      <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
        <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">

          <div className={`step1 ${step==1?'':'text-gray-400'}`}>
            <div className={`step-icon `}> <img src="https://tree.market/img/icons/cart-icon.png" className="w-[28px] mx-auto" /></div>
            
            <div className="clear-both"></div>
            <div className="text-sm">Invoicing</div>
          </div>

          <div className="interstep-icon text-gray-400">&#9903;</div>

          <div className={`step2 ${step==2?'':'text-gray-400'}`}>
            <div className="step-icon">
              <img src="https://tree.market/img/icons/checkout-icon.png" className="w-[22px] mx-auto mb-1" /></div>

            <div className="clear-both"></div>
            <div className="text-sm">Check Out</div>
          </div>

          <div className="interstep-icon text-gray-400">&#9903;</div>

          <div className={`step3 ${step==3?'':'text-gray-400'}`}>
            <div className="step-icon"><img src="https://tree.market/img/icons/payment-icon.png" className="w-[28px] mx-auto mb-1" /></div>
            <div className="clear-both"></div>
            <div className="text-sm">Payment</div>
          </div>
          
        </div>

        <div className="footer-inner h-[80px] relative grid items-stretch gap-4 content-center px-4 border-t-[1px] border-black">
          <div className={
            `grid text-center items-center ${step==1?'bg-[#A0B4CF]':step==2?'bg-[#A0CFB370]':'bg-[#CFA0A070]'} rounded-md h-[64px] ${invoiceTotal>0?'cursor-pointer':''}`
            }>
            <div  onClick={()=>handleNextStep()} className={`text-xl ${invoiceTotal==0?'text-gray-500':''}`}>
              {step ==1?
              `Check Out | ${invoiceTotal/100000}`
              : step ==2?
              `Proceed to Payment | ${Math.round(invoiceTotal-(isTipping?1:0)*invoiceTotal*tip)/100000}`
              : `Cancel Payment | ${(invoiceTotal-Math.round(invoiceTotal*tip))/100000}`
              
              }</div>
          </div>
        </div>


      </div>
      </>
    )
}

export default InvoiceFooter