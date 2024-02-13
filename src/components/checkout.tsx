import React, { useState } from 'react';
import Payment from './paymentPage';

interface Product {
    title: string;
    description: string;
    price: number;
    selected: boolean;
    quantity: number;
  }

interface Props {
  invoice: Product[];
  invoiceTotal:number;
  setViewCheckout:any;
}

const Checkout: React.FC<Props> = ({ invoice,invoiceTotal, setViewCheckout }) => {
    const [tip,setTip] = useState(0.005)
    const [customTip,setCustomTip] = useState(false)
    const [isTipping,setIsTipping] = useState(true)
    const [currentInvoice,setCurrentInvoice] = useState(invoice)
    const [currentInvoiceTotal,setCurrentInvoiceTotal] = useState(invoiceTotal)
    const [viewPayment,setViewPayment] = useState(false)

    const handleChangeInvoice = (e:any,index:any) =>{
        const newInvoice = [...currentInvoice];
  
        
        
        // Update the selected property of the clicked product
        newInvoice[index] = {
          ...newInvoice[index],
          quantity: e.target.value
        };
        
        // Update the state with the new products array
        setCurrentInvoice(newInvoice.filter(x=>x.quantity>0));
  
        let total = 0
        for(let i=0;i<newInvoice.length;i++){
          total += newInvoice[i].quantity * newInvoice[i].price
        }
        
        setCurrentInvoiceTotal(total)
      }
  return (
    <>
    {viewPayment?<Payment invoice={currentInvoice} invoiceTotal={currentInvoiceTotal} tip={tip}/>:
    <div className="main-container-body relative flex flex-col bg-gray-50 h-screen">
      <div className="payment-header relative grid grid-flow-col h-[64px] px-4 mb-4">
        <div className="justify-self-start grid grid-flow-col items-center gap-3">
          <div onClick={()=>{setViewCheckout(false)}}className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-2xl">&#10094;</div>
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
        <h2 className="text-lg font-semibold mb-4 mx-4">Items</h2>

        {currentInvoice.map((product, index) => (
          <div key={index} className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-200 px-6 py-3 ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer">
            <div className="cat-name">
              <div className="category-name text-sm">{product.title}</div>
              <div className="product-name text-lg font-semibold">{product.description}</div>
            </div>
            <div className="grid grid-flow-col gap-6 items-center justify-end">
              <div className="qty relative pr-1 rounded-sm ring-1 ring-gray-400">
                <select onChange={(e)=>handleChangeInvoice(e,index)} value={product.quantity} id={`amt-${index}`} name={`amt-${index}`} className="text-center h-full inline-block rounded-md border-0 bg-transparent text-gray-500 px-2 py-2">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="price">
                <div className="category-name text-xl font-semibold">{Math.round(product.quantity*product.price)/100000}</div>
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-flow-col justify-between mx-4">
          <h3 className="text-lg font-semibold mb-4 mx-4">Sales</h3>
          <h3 className="text-lg font-semibold mb-4 mx-4">{currentInvoiceTotal/100000}</h3>
        </div>

        <div className="clear-both h-4"></div>

        <div className="addons">
          <h2 className="text-lg font-semibold mb-4 mx-4">Addons</h2>

          <div className="donation-addon px-6 py-4 bg-stone-200 space-y-4 rounded-sm mx-2 mb-8">
          <div className="checkboxarea grid grid-flow-col justify-between items-center">
            <div className="grid grid-flow-col justify-start items-center gap-3">
              <input id="donation-checkbox" type="checkbox" checked={isTipping}
        onChange={()=>{setIsTipping(!isTipping)}} className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-2 checked" />
              <label htmlFor="donation-checkbox" className="checkbox font-semibold text-lg">Yes, donate {Math.round(currentInvoiceTotal*tip)/100000}</label>
            </div>
          </div>
          <div className="description">
            Support the development of Tree.Market
          </div>
          <div className="donation-selections">
            <div className="donation-options py-2">
              <div className="stars grid grid-flow-col gap-6 items-center">
                <div onClick={()=>{setTip(0.005);setCustomTip(false)}} className={`${!customTip&&tip==0.005? 'active ring-2 ring-[#A0CFB3] bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]':'bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]'}`}>0.5%</div> 
                <div onClick={()=>{setTip(0.01);setCustomTip(false)}} className={`${!customTip&&tip==0.01? 'active ring-2 ring-[#A0CFB3] bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]':'bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]'}`}>1%</div>
                <div onClick={()=>{setTip(0.02);setCustomTip(false)}} className={`${!customTip&&tip==0.02? 'active ring-2 ring-[#A0CFB3] bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]':'bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]'}`}>2%</div>
                <div onClick={()=>{setTip(0.05);setCustomTip(false)}} className={`${!customTip&&tip==0.05? 'active ring-2 ring-[#A0CFB3] bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]':'bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]'}`}>5%</div>
                <div onClick={()=>{setCustomTip(true)}} className={`${customTip? 'active ring-2 ring-[#A0CFB3] bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]':'bg-blue-900 text-center text-white py-1 rounded-md cursor-pointer hover:ring-2 hover:ring-[#A0CFB3]'}`}>Custom</div>
              </div>
            </div>
           { customTip && <div className="relative inline-block rounded-md w-full mb-4">
          <label htmlFor="price" className="block text-sm font-bold leading-6">Custom Donation</label>
          <input onChange={(e)=>setTip(parseFloat(e.target.value)*100000/currentInvoiceTotal)} value={Math.round(currentInvoiceTotal*tip)/100000} type="number" name="price" id="price" className="appearance-none inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8] text-base leading-8" placeholder="0.00000" />
        </div>}
          </div>
        </div>
        </div>

        <div className="clear-both h-8"></div>

        <h2 className="text-xl font-semibold mb-4 mx-4">Network Fees</h2>
        {/* Network Fees content */}

        <div className="clear-both border-dashed border-t-2 my-6"></div>

        <div className="grid grid-flow-col justify-between mx-4">
          <h3 className="text-lg font-semibold mb-4 mx-4">Total After Deductions</h3>
          <h3 className="text-xl font-semibold mb-4 mx-4">{Math.round(currentInvoiceTotal-(isTipping?1:0)*currentInvoiceTotal*tip)/100000}</h3>
        </div>
      </div>

      <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
        <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">
          {/* Checkout steps content */}
        </div>
        <div className="footer-inner h-[80px] relative grid items-stretch gap-4 content-center px-4 border-t-[1px] border-black">
        <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
    <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">
      <div className="step1 text-gray-400">
       <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Invoicing</div>
      </div>
     <div className="interstep-icon text-gray-400">&#9903;</div>
      <div className="step2">
        <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Check Out</div>
      </div>
      <div className="interstep-icon text-gray-400">&#9903;</div>
      <div className="step3 text-gray-400">
        <div className="step-icon text-2xl">&#9873;</div>
        <div className="clear-both"></div>
        <div className="text-sm">Payment</div>
      </div>
    </div>
    <div className="footer-inner h-[80px] relative grid items-stretch gap-4 content-center px-4 border-t-[1px] border-black">
      <div onClick={()=>setViewPayment(true)} className="grid text-center items-center bg-[#A0CFB370] rounded-md h-[64px] cursor-pointer">
        <div className="text-xl">Proceed to Payment | {Math.round(currentInvoiceTotal-(isTipping?1:0)*currentInvoiceTotal*tip)/100000}</div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>}
    </>
  );
}

export default Checkout;
