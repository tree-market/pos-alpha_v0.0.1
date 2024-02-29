import React,{useState,useContext} from 'react';
import { LoginContext } from '../LoginContext';

interface CatalogProps{
    products: any[];
    invoice: boolean;
}


const AddToCatalog: React.FC<CatalogProps> = ({products,invoice}) => {
    const index = products.length.toString().padStart(5,"0")
    const [state]:any = useContext(LoginContext)
    const [product, setProduct] = useState({
        title:"",
        description:"",
        price:100000
    })

    const handleChange = (e:any) => {
        let { name, value } = e.target;
        if(name=="price"){
          value = value*100000
        }
        setProduct({
          ...product,
          [name]: value,
        });
      };
    
    const addItem = async () =>{
        //add get gas estimate
        
        let productString = `{"title":"${product.title}","description":"${product.description}","price":${product.price}}`
       const response:any = await state.xswd.wallet.transfer(
            {
                scid:"9d189d114a5ef9c99ec46daa0f29aa44629d2d711f83c7cad92824cf7eadc6ea",
                ringsize:2,
                
                sc_rpc:[
                  {name:"SC_ACTION",
                datatype:"U",
              value:0},
              {
                name:"SC_ID",
                datatype:"H",
                value:"9d189d114a5ef9c99ec46daa0f29aa44629d2d711f83c7cad92824cf7eadc6ea"
              },
                    {
                        name:"entrypoint",
                        datatype:"S",
                        value:"UpdateAddress"
                    },
                    {
                        name:"c",
                        datatype:"S",
                        value:"0"
                    },
                    {
                        name:"k",
                        datatype:"S",
                        value:`product-${index}`
                    },
                    {
                        name:"v",
                        datatype:"S",
                        value:productString
                    }
                ]
            }
        )
console.log(response)
console.log(productString,state.address,index,)

    }




  return (
    
    <div className={`main-container-slide-out relative flex min-h-screen flex-col ${invoice?'bg-[#F7E5E4]':'bg-gray-50' }`}>
    
      <div className="slide-out-header relative grid grid-flow-col h-[64px] px-4">
    
        <div className="justify-self-start grid grid-flow-col items-center gap-5">
          
          <div className="user-names justify-self-start">
            <div className="profile-name font-semibold">Add Item to Catalog</div>
          </div>
        </div>
    
        <div className="connect-button grid justify-self-end items-center text-center">
         
        </div>
    
      </div>
    
      <div className="clear-both h-4"></div>
    
      <div className="catalog-listings px-4">
    
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
    
        <div className="input-tile relative grid items-center px-2 py-2 shadow-inner ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4">
          <label htmlFor="item_name" className="category-name text-sm font-semibold px-2">Item Name</label>
          <input value={product.title} onChange={handleChange} type="text" name="title" id="title" placeholder="Enter a name for the item" className="py-1 text-lg bg-transparent focus:border-none focus:ring-0 focus:ring-inset focus:ring-gray-50 px-2"/>
        </div>
    
        <div className="input-tile relative grid items-center px-2 py-2 shadow-inner ring-1 ring-gray-900/5 mx-auto rounded-lg">
          <label htmlFor="item_name" className="category-name text-sm font-semibold px-2">Item Description</label>
          <input onChange={handleChange} value={product.description} type="text" name="description" id="description" placeholder="Enter a description for the item" className="py-1 text-lg bg-transparent focus:border-none focus:ring-0 focus:ring-inset px-2"/>
        </div>
        <p className="text-xs mt-2 text-green-800 mb-4 mx-4">Maximum characters: 120</p>
    
        <div className="input-tile relative grid items-center px-2 py-2 shadow-inner ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4">
          <label htmlFor="item_name" className="category-name text-sm font-semibold px-2">Item Price</label>
          <input value={product.price/100000 ||""} onChange={handleChange} type="number" name="price" id="price" placeholder="0.00000" className="py-1 text-lg bg-transparent focus:border-none focus:ring-0 focus:ring-inset px-2"/>
        </div>
    
      </div>

    { invoice? <div className="add-catalog grid grid-flow-col justify-start items-center gap-3 mx-auto mt-6 mb-10">
    <input id="cashback-checkbox" type="checkbox" value="" className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-2" checked/>
    <label htmlFor="cashback-checkbox" className="checkbox font-semibold text-lg">Add Item to My Catalog</label>
  </div>:''}
    
     
    
      <div onClick={addItem} className="btn-add px-4 w-full">
        <div className="text-center border-dashed border-2 border-gray-300 py-4 rounded-lg font-semibold cursor-pointer">
          &#43; Add to {invoice?'Invoice':'Catalog'}
        </div>
      </div>
    
      
    
     
    </div>
    
  );
}

export default AddToCatalog;
