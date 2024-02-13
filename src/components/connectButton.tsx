import { LoginContext } from "../LoginContext";
import { useContext } from "react";
import { Api,AppInfo, generateAppId } from "dero-xswd-api";

function ConnectButton(){
    const [,setState]:any = useContext(LoginContext)
    const connect = async () =>{
        const name = "Tree Market";

const appInfo:AppInfo = {
  id: await generateAppId(name),
  name,
  description: "My app's description",
};

const xswd = new Api(appInfo);
xswd.config.ip = "127.0.0.1";

await xswd.initialize();

const addressResponse:any= await xswd.wallet.GetAddress()
console.log(addressResponse)
const address = addressResponse.result.address
console.log(address)
setState({address:address,xswd:xswd})
    }


    return(
        <div onClick={connect} className="px-6 py-2 bg-slate-200 rounded-full cursor-pointer hover:shadow-md">
        Connect
      </div>)
}

export default ConnectButton