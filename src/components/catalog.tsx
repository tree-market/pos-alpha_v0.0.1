import React from 'react';

interface SlideOutProps {
    products: any[];
  }
  
  const SlideOutComponent: React.FC<SlideOutProps> = ({ products }) => {
  return (
    <div className="max-w-[95vw] main-container-slide-out relative flex min-h-screen flex-col overflow-hidden bg-gray-50">
      <div className="slide-out-header relative grid grid-flow-col h-[64px] px-4">
        <div className="justify-self-start grid grid-flow-col items-center gap-5">
          <div className="user-names justify-self-start">
            
          </div>
        </div>
        <div className="connect-button grid justify-self-end items-center text-center">
          
        </div>
      </div>

      <div className="clear-both h-4"></div>

      <div className="catalog-listings px-4">
        <h2 className="text-lg font-semibold mb-4">My Catalog</h2>

        {products && products.map(x=>
            <>
        <div className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-300 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer">
          <div className="cat-name">
            <div className="category-name text-sm">{x.title}</div>
            <div className="product-name text-lg font-semibold">{x.description}</div>
          </div>
          <div className="qty relative justify-self-end pr-1 rounded-sm ring-1 ring-gray-400">
           
          </div>
          <div className="price justify-self-end">
            <div className="category-name text-xl font-semibold">{x.price/100000}</div>
          </div>
        </div>
        </>
                
                
                
                )}

        {/* Repeat product-tile divs for additional products */}

      </div>

      <div className="btn-add px-4 w-full">
        
      </div>

     
    </div>
  );
}

export default SlideOutComponent;
