import React from 'react';

const SlideOutInvoice: React.FC = () => {
  return (
    <div className="main-container-slide-out relative flex min-h-screen flex-col overflow-hidden bg-gray-50">
      <div className="slide-out-header relative grid grid-flow-col h-[64px] px-4">
        <div className="justify-self-start grid grid-flow-col items-center gap-5">
          <div className="user-names justify-self-start">
            <div className="profile-name font-semibold">Add Catalog Item</div>
          </div>
        </div>
        <div className="connect-button grid justify-self-end items-center text-center">
          <div className="px-4 py-2 bg-slate-200 rounded-md cursor-pointer hover:shadow-md">
            &#10005;
          </div>
        </div>
      </div>

      <div className="clear-both h-4"></div>

      <div className="catalog-listings px-4">
        <h2 className="text-lg font-semibold mb-4">My Catalog</h2>

        {/* Product Tiles */}
        <div className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-300 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer">
          {/* Content */}
        </div>
        <div className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-200 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer hover:bg-gray-300">
          {/* Content */}
        </div>
        <div className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-300 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer hover:bg-gray-300">
          {/* Content */}
        </div>

        {/* Add to Invoice Button */}
        <div className="btn-add px-4 w-full">
          <div className="text-center border-dashed border-2 border-gray-300 py-4 rounded-lg font-semibold cursor-pointer">
            &#43; Add 2 to Invoice
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer fixed bottom-0 w-full h-[80px] border-t-[1px]">
        <div className="footer-inner h-full relative grid items-stretch grid-cols-2 gap-4 content-center px-4">
          <div className="grid text-center ring-1 ring-black items-center rounded-md h-[64px] cursor-pointer">
            <div className="text-xl font-semibold">Catalog</div>
          </div>
          <div className="grid text-center ring-1 ring-gray-400 items-center rounded-md h-[64px] cursor-pointer text-gray-400 hover:text-inherit hover:ring-black">
            <div className="text-xl font-semibold ">Add New</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOutInvoice;
