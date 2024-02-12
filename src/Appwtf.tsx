import hex2a from "./hex2a";
import { useEffect } from "react";

import { Api,AppInfo, generateAppId } from "dero-xswd-api";

const name = "Tree Market";

const appInfo:AppInfo = {
  id: await generateAppId(name),
  name,
  description: "My app's description",
};

const xswd = new Api(appInfo);

await xswd.initialize();

function App() {
  const [getSC] = useGetSC();
  const [getAddress] = useGetAddress();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [integratedAddress, setIntegratedAddress] = useState("");

  const getMarket = async () => {
    const address = await getAddress(xswd);
    setAddress(address);
    const result = await getSC(
      xswd,
      "9d189d114a5ef9c99ec46daa0f29aa44629d2d711f83c7cad92824cf7eadc6ea",
      false,
      true
    );
    

    let flag = 1;
    let i = 0;
    let products = [];
    while (flag) {
      console.log("searching for ", `${address}[product-title${i}]`);

      if (
        Object.keys(result.stringkeys).includes(
          `0${address}[product-title${i}]`
        )
      ) {
        console.log("found product ", i);
        products.push({
          title: hex2a(result.stringkeys[`0${address}[product-title${i}]`]),
          description: hex2a(
            result.stringkeys[`0${address}[product-description${i}]`]
          ),
          price: hex2a(result.stringkeys[`0${address}[product-price${i}]`]),
        });
        console.log("updated products", products);
        i += 1;
      } else {
        console.log("setting products ", products);
        setProducts(products);
        flag = 0;
      }
    }
  };

  useEffect(() => {
    getMarket();
  }, []);
  return (
    <div className="main-container-body relative flex min-h-screen flex-col overflow-hidden bg-gray-50">

      <div className="header relative grid grid-flow-col h-16 px-4">

        <div className="justify-self-start grid grid-flow-col items-center gap-5">
          <div className="menu-icon px-4 py-2 cursor-pointer justify-self-start rounded-md bg-gray-200">&#8285;</div>

          <div className="user-names justify-self-start">
            <div className="store-name text-sm">Banjare Clothing</div>
            <div className="profile-name font-semibold">Pedro Sanchez</div>
          </div>
        </div>

        <div className="user-rating grid justify-self-end items-center">
          <div className="rating bg-gray-200 px-4 py-2 rounded-full">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          </div>
        </div>

      </div>

      <div className="clear-both h-8"></div>

      <div className="catalog-listings px-4">

        <h2 className="text-lg font-semibold mb-4">My Catalog</h2>

        <div className="product-tile relative grid grid-flow-col gap-4 items-center bg-gray-200 px-6 py-3 shadow-xl ring-1 ring-gray-900/5 mx-auto rounded-lg mb-4 cursor-pointer hover:bg-gray-300">
          <div className="cat-name">
            <div className="category-name text-sm">Shirts</div>
            <div className="product-name text-lg font-semibold">Classic Button Up Shirt</div>
          </div>
          <div className="price justify-self-end">
            <div className="category-name text-xl font-semibold">$79.99</div>
          </div>
        </div>

        {/* Additional product-tile components go here */}

      </div>

      <div className="footer absolute flex bottom-0 w-full h-20 px-4 py-4 border-t-1">
        <div className="w-full relative fle bg-amber-100 self-center text-center text-xl font-semibold rounded-lg px-4 h-16 cursor-pointer hover:shadow-md">
          <div className="h-full">Add New Item</div>
        </div>
      </div>
    </div>
  );
}

export default App;
