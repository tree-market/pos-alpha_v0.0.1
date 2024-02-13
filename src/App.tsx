import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";
import hex2a from "./hex2a";
import SlideOutComponent from "./components/catalog";
import Catalog from "./components/addNew";
import RecentTransactions from "./components/recentTransactions";
import Header from "./components/header";
import SideMenu from "./components/sideMenu";
import NewInvoice from "./components/newInvoice";

interface Product {
  title: string;
  description: string;
  price: number;
  selected: boolean;
  quantity: number;
}


function App() {
  const [state]:any = useContext(LoginContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] :[string,Function] = useState("landing")

  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    if(!state.connected) return
    setView("home")
  },[state.connected])

  const toggleNewInvoice = () => {
    
    setView("newInvoice")
  }

  const getMarket = async () => {
    if (!state.xswd) {
      return;
    }
    const result: any = await state.xswd.node.GetSC({
      scid: "9d189d114a5ef9c99ec46daa0f29aa44629d2d711f83c7cad92824cf7eadc6ea",
      code: false,
      variables: true
    });
    console.log(result);
    if (result.result.stringkeys !== null && result.result.stringkeys !== undefined) {
      const contractData: any = result.result.stringkeys;
      console.log(contractData);

      let flag = 1;
      let i = 0;
      let tempProducts: Product[] = [];
      while (flag) {
       

        if (Object.keys(contractData).includes(`0${state.address}[product-${i.toString().padStart(5,"0")}]`)) {
          console.log("found product ", i);
          let newProduct:any = hex2a(contractData[`0${state.address}[product-${i.toString().padStart(5,"0")}]`])
            console.log(newProduct)
          newProduct = JSON.parse(newProduct)
          console.log("new product",newProduct)
          newProduct.selected = false
          newProduct.quantity = 1

          tempProducts.push(newProduct);
          console.log("updated products", tempProducts);
          i += 1;
        } else {
          console.log("setting products ", tempProducts);
          setProducts(tempProducts);
          flag = 0;
        }
      }
    }
  }

  useEffect(() => {
    getMarket();
  }, [state.address]); // Run the effect whenever state.address changes

  // This will log the updated products whenever products state changes
  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
    {
    view === "newInvoice"?
    <NewInvoice items={products} setView={setView} />
:
    <div className="main-container-body relative flex min-h-screen flex-col bg-gray-50">
      <Header toggleMenu={toggleMenu}/>
      {isMenuOpen && (
       
          <SideMenu setView={setView} toggleMenu={toggleMenu} />
       
      )}
      <div className="clear-both h-8"></div>
      {
        view === "landing"?
      <>
        <div className="clear-both h-8"></div>

<div className="recent-txs relative px-4">

  <div className="alpha-text space-y-2">
    <h1 className="text-xl font-semibold">Welcome to the tree.market live alpha release.</h1>
    <p className="text-lg">This is a fully functional early-stage point-of-sale.</p>
    <div className="clear-both h-2"></div>
    <div className="grid grid-flow-row text-xl font-semibold space-y-2">
      <div>Bear with us;</div>
      <div>give feedback;</div>
      <div>enjoy!</div>
    </div>
  </div>
  <div className="clear-both h-[100px]"></div>

  

</div>
<div className="footer fixed bottom-0 w-full h-[80px] border-t-[1px] bg-[#D6D3D1]">

    <div className="footer-inner h-full relative grid grid-flow-col gap-4 content-center px-4">

    <div className="grid content-center items-center rounded-md leading-snug">
      <div className="text-sm">Support the development of Tree Market</div>
      <div className="text-lg"><b>D</b>onate <b>I</b>n <b>D</b>ero: treemarket</div>
    </div>
  </div>


  </div>
      </>
     : view==="home"?<>
      <RecentTransactions toggleNewInvoice={toggleNewInvoice}/>
      
      </>
    :<>
     {view==="catalog"?
      <SlideOutComponent products={products} />
      :
      
      <Catalog products={products}/>
    }
       <div className="footer fixed bottom-0 w-full h-[80px] border-t-[1px]">
        <div className="footer-inner h-full relative grid items-stretch grid-cols-2 gap-4 content-center px-4">
          <div className={`grid text-center ring-1 ring-${view==="catalog"?'black':'gray-400'} items-center rounded-md h-[64px] cursor-pointer text-${view=="catalog"?'black':'gray-400'} hover:text-inherit hover:ring-black`}>
            <div className="text-xl font-semibold" onClick={()=>{setView("catalog")}}>Catalog</div>
          </div>
          <div className={`grid text-center ring-1 ring-${view=="catalog"?'gray-400':'black'} items-center rounded-md h-[64px] cursor-pointer text-${view=="catalog"?'gray-400':'black'} hover:text-inherit hover:ring-black`}> 
            <div className="text-xl font-semibold " onClick={()=>{setView("add")}}>Add New</div>
          </div>
        </div>
      </div>
    </>}
     
      
    </div>
}
    </>
  );
}

export default App;
