

const SideMenu = ({toggleMenu,setView}:any) => {
  return (
    <div className="max-w-[90vh] main-container-menu absolute z-50 flex min-h-screen flex-col overflow-hidden bg-gray-50">
      <div className="menu-header relative grid grid-flow-col h-[64px] px-4">
        <div className="justify-self-start grid grid-flow-col items-center gap-1">
          <div onClick={toggleMenu} className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-xl font-semibold"><img src="https://tree.market/img/icons/menu-open-icon.png" className="w-[24px]" /></div>
          <div className="sitename justify-self-start">
            <div className="font-semibold text-xl">Tree.Market</div>
          </div>
        </div>
        <div className="connect-button grid justify-self-end items-center text-center">
        <div className="px-6 py-2 text-2xl">
        <img src="https://tree.market/img/icons/treemarket-icon.png" className="w-[30px]" />
      </div>
        </div>
      </div>

      <div className="clear-both h-8"></div>

      <div className="menu-items relative px-4 space-y-6">
        <MenuItem toggleMenu={toggleMenu} setView={setView} icon="https://tree.market/img/icons/home.png" name="Home" />
        <MenuItem icon="https://tree.market/img/icons/marketplace-icon.png" name="Tree Marketplace" />
        <MenuItem toggleMenu={toggleMenu} setView={setView} icon="https://tree.market/img/icons/catalog-icon.png" name="Catalog" />
        <MenuItem icon="https://tree.market/img/icons/wallet-icon.png" name="Wallet" />
        <MenuItem icon="https://tree.market/img/icons/lock-icon.png" name="Vault" />
        <MenuItem icon="https://tree.market/img/icons/notifications-icon.png" name="Notifications" />
        <MenuItem icon="https://tree.market/img/icons/profile-icon.png" name="Profile" />
        <MenuItem icon="https://tree.market/img/icons/settings-icon.png" name="Settings" />
      </div>

      <div className="clear-both h-[100px]"></div>

     
    </div>
  );
};

const MenuItem = ({ icon, name,setView,toggleMenu }:any) => {
  return (
    <div onClick={()=>{setView(name.toLowerCase());toggleMenu()}} className="menu-item relative grid grid-flow-col items-center justify-start gap-6 px-4 text-lg cursor-pointer">
      <div className="menu-icon text-2xl"><img className="w-[24px]" src={icon}/></div>
      <p className="menu-name leading-6 font-semibold gap-2">{name}</p>
    </div>
  );
};

export default SideMenu;
