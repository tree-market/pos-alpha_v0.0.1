import React,{useContext, useEffect, useState} from 'react';
import { LoginContext } from '../LoginContext';




interface Product {
  title: string;
  description: string;
  price: number;
  selected: boolean;
  quantity: number;
}

interface Props {
  invoice: Product[]
  invoiceTotal:number;
  tip:number;
}

const Payment: React.FC<Props> = ({invoice,invoiceTotal,tip}) => {
  const [state]:any = useContext(LoginContext)
  const [integrated,setIntegrated] = useState("")
  const [cash,setCash] = useState(false)
  const [confirmed,setConfirmed] = useState(false)

  const getPaid = async() =>{
   // const heightResponse = await state.xswd.node.GetHeight()
    //const height = heightResponse.result.stableheight
    const balanceResponse = await state.xswd.wallet.GetBalance()
    const balance = balanceResponse.result.balance
    await state.xswd.subscribe({
      event: "new_balance",
      callback: async (newBalance:any) => {
        console.log(newBalance);
        console.log(balance)
        console.log(invoiceTotal)
        if(newBalance.balance - balance == invoiceTotal){
          console.log("we got paid")
          setConfirmed(true)
            await state.xswd.wallet.transfer(
            {
              ringsize:2,
              transfers:[
                {
                  destination:"dero1qyd8s5twqsdq907wlxangumusjrqc5yx0ja84wv6ns286haurguh2qgrh6nhd",
              amount:Math.round(tip*invoiceTotal),
              payload_rpc:[
                {
                  name:"C",
                  datatype:"S",
                  value:"Thank you for using tree.market!"
                },
                {
                  name:"D",
                  datatype:"U",
                  value:1337
                }
              ]
                }
              ]
              
            }
          )
        }else{
          console.log("keep waiting")
          getPaid()
        }

        /* let newTXResult = await state.xswd.wallet.GetTransfers({in:true,out:false,coinbase:false,dstport:1337,min_height:height})
        console.log(newTXResult)
          if(Object.keys(newTXResult.result).length==0){
            console.log("empty")
            getPaid()
          } */
      },
    });
  }

  const makeIntegrated = async () =>{
    const integrated = await state.xswd.wallet.MakeIntegratedAddress({
      payload_rpc: [
        {
          name: "C",
          datatype: "S",
          value: "Thank you for using tree.market",
        },
        {
          name: "D",
          datatype: "U",
          value: 1337,
        },
        {
          name: "N",
          datatype: "U",
          value: 1,
        },
        {
          name: "V",
          datatype: "U",
          value: invoiceTotal,
        },
      ],
    });
    setIntegrated(integrated.result.integrated_address)
    getPaid()
  }
  useEffect(()=>{
    if(integrated){return}
    makeIntegrated()

  },[invoice])

  const closeSale = async ()=>{
    await state.xswd.wallet.transfer(
      {
        ringsize:2,
        transfers:[
          {
            destination:"dero1qyd8s5twqsdq907wlxangumusjrqc5yx0ja84wv6ns286haurguh2qgrh6nhd",
        amount:Math.round(tip*invoiceTotal),
        payload_rpc:[
          {
            name:"C",
            datatype:"S",
            value:"Thank you for using tree.market!"
          },
          {
            name:"D",
            datatype:"U",
            value:1337
          }
        ]
          }
        ]
        
      }
    )
    setConfirmed(true)
  }

  return (
    <>
    
   {confirmed? <>

 

<div className="main-container-body relative flex flex-col bg-gray-50 h-screen">

  <div className="payment-header relative grid grid-flow-col h-[64px] px-4 mb-4 pt-2">
    <div className="justify-self-start grid grid-flow-col items-center gap-3">
      <div className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-2xl"><img src="https://tree.market/img/icons/chevron-left-icon.png" className="w-[20px]" /></div>
      <div className="justify-self-start">
        <div className="page-name font-semibold">Invoice </div>
      </div>
    </div>
    <div className="connect-button grid justify-self-end items-center text-center">
      <div className="px-4 py-1 bg-slate-200 rounded-full">
        confirmed
      </div>
    </div>
  </div>
  <div className="clear-both h-[50vh]"></div>

  <div className="new-invoice relative px-4 h-full pb-[200px]">
      <div className="confirmation-mark w-[350px] mx-auto grid-flow-row space-y-8">
        <div className="confirmation-img grid items-center text-center w-[200px] h-[200px] shadow-inner mx-auto rounded-full p-4 ring-8 ring-green-800">
          <div className="text-9xl text-green-800">&#10003;</div>
        </div>
        <div className="grid text-center text-3xl text-green-800 mx-4">
          <h2 className="font-bold mb-4">Payment Received</h2>
        </div>
      </div>
    </div>

    <div className="clear-both h-8"></div>


    <div className="clear-both h-[180px]"></div>
  </div>

  <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
    <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">
      <div className="step1 text-gray-400">
       <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Invoicing</div>
      </div>
     <div className="interstep-icon text-gray-400">&#9903;</div>
      <div className="step2 text-gray-400">
        <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Check Out</div>
      </div>
      <div className="interstep-icon text-gray-400">&#9903;</div>
      <div className="step3">
        <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Payment</div>
      </div>
    </div>
    <div className="footer-inner h-[80px] relative grid items-stretch gap-4 content-center px-4 border-t-[1px] border-black">
      <div className="grid text-center items-center bg-gray-300 rounded-md h-[64px] cursor-pointer">
        <div className="text-xl">Close</div>
      </div>
    </div>
  </div>



   </>:
   <div className="main-container-body relative flex flex-col bg-gray-50 h-screen">
      <div className="payment-header relative grid grid-flow-col h-[64px] px-4 mb-4 pt-2">
        <div className="justify-self-start grid grid-flow-col items-center gap-3">
          <div className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-2xl"><img src="https://tree.market/img/icons/chevron-left-icon.png" className="w-[20px]" /></div>
          <div className="justify-self-start">
            <div className="page-name font-semibold">New Invoice</div>
          </div>
        </div>
        <div className="connect-button grid justify-self-end items-center text-center">
          <div className="px-4 py-1 bg-slate-200 rounded-full">
            Open
          </div>
        </div>
      </div>
      <div className="new-invoice relative px-4 h-full pb-[200px]">
        <h2 className="text-lg font-semibold mb-4 mx-4">Payment Method</h2>
        <div className="radio-pay grid grid-cols-2 items-center gap-4 text-center my-4">
          <div className="py-4 ring-1 ring-blue-300 rounded-md bg-blue-200 cursor-pointer">
            <input onChange={()=>setCash(!cash)} checked={!cash} type="radio" name="pay-dero" className="radio radio-primary"  />
            <label htmlFor="pay-dero">Dero</label>
          </div>
          <div className="py-4 ring-1 ring-green-300 rounded-md bg-green-200 cursor-pointer">
            <input onChange={()=>setCash(!cash)} checked={cash} type="radio" name="pay-cash" className="radio radio-primary" />
            <label htmlFor="pay-cash">Cash</label>
          </div>
        </div>


        <div className="currency-carousel relative overflow-auto hidden">
          <div className="relative w-full flex gap-6 snap-x snap-proximity overflow-x-auto pb-7">
            {/* Carousel images here */}
          </div>
        </div>


        <div className="clear-both h-4"></div>

        <div className="payment-info ring-1 ring-gray-200 rounded-lg px-2 py-4 bg-white shadow-lg space-y-6">

          <h2 className="text-lg font-semibold mb-4 mx-4">Payment</h2>

          <div className="price-code w-[350px] mx-auto grid-flow-row space-y-4">
          {cash?<></>:<><div className="qrcode break-words w-[300px]  items-center shadow-inner mx-auto rounded-lg p-4 ring-1 ring-gray-200">
          <div className="break-words">{integrated}</div>
           </div>
         </> }
       
        <div className="grid grid-flow-col justify-between text-2xl mx-4">
          <h3 className="font-semibold mb-4">Total</h3>
          <h3 className="font-semibold mb-4">{invoiceTotal/100000}</h3>
        </div>
            
          </div>
          <div className="function-buttons space-y-5 mx-4">
            {cash?<div onClick={()=>{closeSale()}} className="grid text-center items-center ring-1 ring-gray-800 rounded-md h-[64px] cursor-pointer bg-green-200">
          <div className="text-lg">Close Invoice</div>
        </div>:
        <div onClick={()=>{navigator.clipboard.writeText(integrated)}} className="grid text-center items-center ring-1 ring-gray-800 rounded-md h-[64px] cursor-pointer">
          <div className="text-lg">Copy ID to Clipboard</div>
        </div>
}

       
      </div>
        </div>
        <div className="clear-both h-8"></div>
        <div className="payment-summary ring-1 ring-gray-200 rounded-lg px-2 py-4 bg-white shadow-lg space-y-6">
          <h2 className="text-lg font-semibold mb-4 mx-4">Summary</h2>
          <div className="clear-both border-dashed border-t-2 mx-4"></div>

      <div className="grid grid-flow-col justify-between mx-4">
        <h3 className="text-lg font-semibold mb-4 mx-4">Sales</h3>
        <h3 className="text-lg font-semibold mb-4 mx-4">{invoiceTotal/100000}</h3>
      </div>

      <div className="grid grid-flow-col justify-between mx-4">
        <h3 className="text-lg font-semibold mb-4 mx-4">Addons Total</h3>
        <h3 className="text-lg font-semibold mb-4 mx-4">-{Math.round(invoiceTotal*tip)/100000}</h3>
      </div>
      
      

      <div className="clear-both border-dashed border-t-2 mx-4"></div>

      <div className="grid grid-flow-col justify-between mx-4">
        <h3 className="text-xl font-semibold mb-4 mx-4">Total After Deductions</h3>
        <h3 className="text-xl font-semibold mb-4 mx-4">{(invoiceTotal-Math.round(invoiceTotal*tip))/100000}</h3>
      </div>
      <div className="clear-both h-[180px]"></div>
        </div>
      </div>
      <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
        <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">
          {/* Checkout steps here */}
          <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
    <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">
      <div className="step1 text-gray-400">
       <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Invoicing</div>
      </div>
     <div className="interstep-icon text-gray-400">&#9903;</div>
      <div className="step2 text-gray-400">
        <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Check Out</div>
      </div>
      <div className="interstep-icon text-gray-400">&#9903;</div>
      <div className="step3">
        <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Payment</div>
      </div>
    </div>
    </div>
        </div>
        <div className="footer-inner h-[80px] relative grid items-stretch gap-4 content-center px-4 border-t-[1px] border-black">
          <div className="grid text-center items-center bg-[#CFA0A070] rounded-md h-[64px] cursor-pointer">
            <div className="text-xl">Cancel Payment | {(invoiceTotal-Math.round(invoiceTotal*tip))/100000}</div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default Payment;
