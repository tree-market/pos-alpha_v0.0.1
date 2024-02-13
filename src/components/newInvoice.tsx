import React, { useState,useRef } from 'react';
import Checkout from './checkout';

interface Props {
    setView: Function;
    items: any[]
}

const NewInvoice: React.FC<Props> = ({setView,items}) => {
    const [showAddItems,setShowAddItems] = useState(false)
    const [products, setProducts] = useState(items)
    const [viewCheckout,setViewCheckout]:any = useState(false)
    const [invoice,setInvoice]:any = useState([])
    const [invoiceTotal,setInvoiceTotal]:any = useState(0)
    const divRef = useRef(null)

    const handleAddItems = ()=>{
      
      const newInvoice = products.filter(x=>x.selected).concat(invoice)
      let total = 0
      for(let i=0;i<newInvoice.length;i++){
        total += newInvoice[i].quantity * newInvoice[i].price
      }
      setInvoice(newInvoice)
      setInvoiceTotal(total)
      setShowAddItems(false)
    }

    const handleShowAddItems = ()=>{
      setShowAddItems(true)
      setProducts(items)
    }

    const handleSelectItem = (e:any, index:any) => {
      // Check if the clicked element is the select element
      if (e.target.tagName.toLowerCase() === 'select' || e.target.tagName.toLowerCase() === 'option') {
        return; // Do nothing if the clicked element is the select element
      }
    
      // Create a shallow copy of the products array
      const newProducts = [...products];
      
      // Update the selected property of the clicked product
      newProducts[index] = {
        ...newProducts[index],
        selected: !products[index].selected
      };
      
      // Update the state with the new products array
      setProducts(newProducts);
    };

    const handleChangeAmount = (e:any,index:any) =>{
      const newProducts = [...products];
      
      // Update the selected property of the clicked product
      newProducts[index] = {
        ...newProducts[index],
        quantity: e.target.value
      };
      
      // Update the state with the new products array
      setProducts(newProducts);
    }

    const handleChangeInvoice = (e:any,index:any) =>{
      const newInvoice = [...invoice];

      
      
      // Update the selected property of the clicked product
      newInvoice[index] = {
        ...newInvoice[index],
        quantity: e.target.value
      };
      
      // Update the state with the new products array
      setInvoice(newInvoice.filter(x=>x.quantity>0));

      let total = 0
      for(let i=0;i<newInvoice.length;i++){
        total += newInvoice[i].quantity * newInvoice[i].price
      }
      
      setInvoiceTotal(total)
    }
    

  return (
<>
    {viewCheckout?
    
    <Checkout invoice={invoice} invoiceTotal={invoiceTotal} setViewCheckout={setViewCheckout}/>:
    <><div className="main-container-body relative flex flex-col bg-gray-50 h-screen pb-[200px]">
        <div className={`max-w-[95vw] add-invoice-panel absolute right-0 top-0 h-screen z-50 bg-[#E7E5E4] w-[95vh] rounded-l-2xl ${!showAddItems && 'hidden'}`}>
    <div className="slide-out-header relative grid grid-flow-col h-[64px] px-4">
    <div className="justify-self-start grid grid-flow-col items-center gap-5">  
      <div className="user-names justify-self-start">
        <div className="profile-name font-semibold">Add Item to Invoice</div>
      </div>
    </div>
    <div className="connect-button grid justify-self-end items-center text-center">
      <div onClick={()=>{setShowAddItems(false)}} className="px-4 py-2 cursor-pointer">
        &#10005;
      </div>
    </div>
  </div>
  <div className="clear-both h-4"></div>
  <div className="catalog-listings px-4">
    <h2 className="text-lg font-semibold mb-4">My Catalog</h2>
    {products && products.map((x,i)=>
        <>
        <div key={i} onClick={(e)=>{handleSelectItem(e,i)}}id={i.toString()}  className={`product-tile relative grid grid-flow-col gap-4 items-center bg-gray-${products[i].selected==true?3:2}00 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer focus:bg-gray-300`}>
          
      <div className="cat-name">
        <div className="category-name text-sm">{x.title}</div>
        <div className="product-name text-lg font-semibold">{x.description}</div>
      </div>
      <div className="grid grid-flow-col gap-6 items-center justify-end">
      <div className={`qty relative pr-1 rounded-sm ring-1 ring-gray-400 ${products[i].selected? '':'hidden'}`}>
        <select ref={divRef} value={products[i].quantity} onChange={(e)=>handleChangeAmount(e,i)}id="amt" name="amt" className={`h-full inline-block rounded-md border-0 bg-transparent text-gray-500 px-2 py-2`}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="price justify-self-end">
        <div className="category-name text-xl font-semibold">{x.price/100000}</div>
      </div>
      </div>
    </div>
    
        </>)}
        {products.filter(x=>x.selected).length>0? <>
        <div onClick={handleAddItems} className="btn-add px-4 w-full">
    <div className="text-center border-dashed border-2 border-gray-300 py-4 rounded-lg font-semibold cursor-pointer">
      &#43;{` Add ${products.filter(x=>x.selected).length} to Invoice`}
    </div>
   </div>
    </>:""}
  
    
</div>
 </div>


      <div className="payment-header relative grid grid-flow-col h-[64px] px-4 pt-2">
        <div className="justify-self-start grid grid-flow-col items-center gap-3">
          <div onClick={()=>{setView("home")}} className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-2xl"> <img src="https://tree.market/img/icons/chevron-left-icon.png" className="w-[20px]" /></div>
          <div className="user-names justify-self-start">
            <div className="profile-name font-semibold">New Invoice</div>
          </div>
        </div>
        <div className="connect-button grid justify-self-end items-center text-center">
          <div className="px-4 py-1 bg-slate-200 rounded-full">
            Open
          </div>
        </div>
      </div>
      <div className="clear-both border-b-[1px] mt-2 mx-4"></div>
      <div className="clear-both h-6"></div>
      <div className="new-invoice relative px-4">
        
        <h2 className="text-lg font-semibold mb-4 mx-4">Items</h2>

        {invoice.filter((x:any)=>x.quantity>0).map((x:any,i:number)=><div className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-200 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer">
      <div className="cat-name">
        <div className="category-name text-sm">{x.title}</div>
        <div className="product-name text-lg font-semibold">{x.description}</div>
      </div>
      <div className="grid grid-flow-col gap-6 items-center justify-end">
        <div className="qty relative pr-1 rounded-sm ring-1 ring-gray-400">
          <select value={invoice[i].quantity} onChange={(e)=>{handleChangeInvoice(e,i)}} id="amt" name="amt" className="text-center h-full inline-block rounded-md border-0 bg-transparent text-gray-500 px-2 py-2">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>

        </div>
        <div className="price">
          <div className="category-name text-xl font-semibold">{invoice[i].quantity*invoice[i].price/100000}</div>
        </div>
      </div>
    </div>)}
        <div onClick={handleShowAddItems} className={`btn-add-item relative grid content-center w-full px-4 py-6 border-dashed border-2 border-gray-300 rounded-lg ${invoice.length>0?'':'h-[52vh]'} cursor-pointer`}>
          <div className="text-center font-semibold">
            &#43; Add Item
          </div>
        </div>
        <div className="clear-both h-[180px]"></div>
      </div>
      
      <div className="payment-footer fixed bottom-0 w-full h-[160px] bg-gray-50">
        <div className="checkoutsteps grid grid-flow-col items-center text-center h-[80px] border-t-[1px] border-black">
          <div className="step1">
            <div className="step-icon"> <img src="https://tree.market/img/icons/cart-icon.png" className="w-[28px] mx-auto" /></div>
            <div className="clear-both"></div>
            <div className="text-sm">Invoicing</div>
          </div>
          <div className="interstep-icon text-gray-400">&#9903;</div>
          <div className="step2 text-gray-400">
            <div className="step-icon"><img src="https://tree.market/img/icons/checkout-icon.png" className="w-[22px] mx-auto mb-1" /></div>
            <div className="clear-both"></div>
            <div className="text-sm">Check Out</div>
          </div>
          <div className="interstep-icon text-gray-400">&#9903;</div>
          <div className="step3 text-gray-400">
            <div className="step-icon"><img src="https://tree.market/img/icons/payment-icon.png" className="w-[28px] mx-auto mb-1" /></div>
            <div className="clear-both"></div>
            <div className="text-sm">Payment</div>
          </div>
          
        </div>

        <div className="footer-inner h-[80px] relative grid items-stretch gap-4 content-center px-4 border-t-[1px] border-black">
          <div className={`grid text-center items-center bg-[#A0B4CF] rounded-md h-[64px] ${invoiceTotal>0?'cursor-pointer':''}`}>
            <div onClick={()=>{setViewCheckout(true)}} className={`text-xl ${invoiceTotal==0?'text-gray-500':''}`}>Check Out | {invoiceTotal/100000}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  }
  </>
  );
}

export default NewInvoice;
