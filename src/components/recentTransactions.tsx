import React,{useContext, useEffect, useState, useRef} from 'react';
import { LoginContext } from '../LoginContext';

interface Props {
  toggleNewInvoice: Function;
}

const RecentTransactions: React.FC<Props> = ({toggleNewInvoice}) => {
  const [state,setState] = useContext(LoginContext)
  const [transactions,setTransactions] = useState([])
  const [balance,setBalance] = useState(0)
  const [expanded,setExpanded] = useState(false)
  
  const divRef = useRef(null);

  useEffect(()=>{
    getBalance()
    getTransactions()
  },[state.xswd])

  const getTransactions = async () =>{
    const response : any = await state.xswd.wallet.GetTransfers({in:true,out:false,coinbase:false,dstport:1337})
    console.log(response)
    setTransactions(response.result.entries)
  }

  const handleNewInvoice = ()=>{
    console.log("new invoice  ")
    setExpanded(false)
    toggleNewInvoice()

  }

  const getBalance = async () =>{
    const response:any = await state.xswd.wallet.GetBalance()
    console.log(response)
    setBalance(response.result.balance/100000)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="main-container-body relative flex flex-col bg-gray-50">
      

      <div className="clear-both h-8"></div>

      <div  className="recent-txs relative px-4">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        
        <div className="clear-both border-t-[1px]"></div>

        {/* Sample transaction tiles */}
        
          {transactions.map((x:any)=><div className="tx-tile relative gap-4 px-3 py-3 mx-auto cursor-pointer border-b-[1px] space-y-2">
            <div className="invoice-info grid grid-cols-6">
            <p className="invoice-num col-span-5 text-sm leading-6 font-semibold gap-2">
              <span className="mr-3">Invoice 236487654565768</span> <span className="bg-gray-300 px-4 py-1 rounded-full font-normal">Closed</span>
            </p>
            <div className="invoice-price col-span-1">
              <div className="text-base font-semibold text-right">{x.amount}</div>
            </div>
          </div>
          <p className="scid text-sm break-words">
            {x.txid}
          </p>
          <p className="scid text-xs">
            {x.time}
          </p>
          </div>
            
            )}
        
        

        {/* Add more transaction tiles here */}

        {/* Footer */}
        </div>
        
        <div ref={divRef} className="footer fixed bottom-0 w-full h-[80px] border-t-[1px] bg-[#D6D3D1]">
        { expanded &&
        <div className="add-slide-up absolute z-50 bg-[#E7E5E4] w-full bottom-[80px] rounded-t-2xl px-8 py-4">
    <div className="add-menu-items leading-10 space-y-2">
      <p onClick={handleNewInvoice} className="cursor-pointer grid grid-flow-col justify-start items-center gap-4"><span  className="sale-icon text-lg font-semibold">&#65284;</span> New Invoice</p>
      <p className="cursor-pointer grid grid-flow-col justify-start items-center gap-4"><span className="sale-icon text-lg font-semibold">&#10147;</span> Make a Payment</p>
      <p className="cursor-pointer grid grid-flow-col justify-start items-center gap-4"><span className="sale-icon text-lg font-semibold">&#10609;</span> Transfer Funds</p>
    </div>
  </div>
  }
          <div  className="footer-inner h-full relative grid grid-flow-col gap-4 content-center px-4">
            <div className="grid content-center items-center rounded-md leading-snug">
              <div className="text-sm">Balance</div>
              <div className="text-xl font-semibold">{balance}</div>
            </div>
            <div onClick={()=>{setExpanded(true)}} className="grid justify-self-end w-[64px] text-center bg-[#44403C] items-center rounded-md h-[64px] cursor-pointer">
              <div className="text-3xl text-white">&#43;</div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default RecentTransactions;
