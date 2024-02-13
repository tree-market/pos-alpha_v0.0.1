import React,{useState,useContext} from 'react';
import { LoginContext } from '../LoginContext';

interface CatalogProps{
    products: any[];
}


const Catalog: React.FC<CatalogProps> = ({products}) => {
    const index = products.length.toString().padStart(5,"0")
    const [state]:any = useContext(LoginContext)
    const [product, setProduct] = useState({
        title:"",
        description:"",
        price:1
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
                ],
                fees:600
            }
        )
console.log(response)

    }




  return (
    <div className="main-container-body relative flex min-h-screen flex-col overflow-hidden bg-gray-50">
      

     

      <div className="catalog-listings px-4">
        <h2 className="text-base font-semibold mb-1">My Catalog</h2>
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>

        <div className="relative inline-block rounded-md w-full mb-4">
          <label htmlFor="title" className="block text-sm font-bold leading-6">Item Name</label>
          <input value={product.title} onChange={handleChange} type="text" name="title" id="title" className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8] text-base leading-8" placeholder="Add a name for the item" />
        </div>

        <div className="relative inline-block rounded-md w-full mb-4">
          <label htmlFor="description" className="block text-sm font-bold leading-6">Item Description</label>
          <input onChange={handleChange} value={product.description} type="text" name="description" id="description" className="inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8] text-base leading-8" placeholder="Add a description for the item" />
          <p className="text-xs mt-2 text-[#61C0A8]">Maximum characters: 120</p>
        </div>

        <div className="relative inline-block rounded-md w-full mb-4">
          <label htmlFor="price" className="block text-sm font-bold leading-6">Item Price</label>
          <input value={product.price/100000 ||""} onChange={handleChange} type="number" name="price" id="price" className="appearance-none inline-block w-full rounded-md border-0 py-1.5 pl-4 pr-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#61C0A8] text-base leading-8" placeholder="0.00000" />
        </div>
      </div>
      <div onClick={addItem} className="btn-add px-4 w-full">
    <div className="text-center border-dashed border-2 border-gray-300 py-4 rounded-lg font-semibold cursor-pointer">
      &#43; Add Item
    </div>
  </div>
     
    </div>
  );
}

export default Catalog;
