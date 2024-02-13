

const SideMenu = ({toggleMenu}:any) => {
  return (
    <div className="max-w-[90vh] main-container-menu absolute z-50 flex min-h-screen flex-col overflow-hidden bg-gray-50">
      <div className="menu-header relative grid grid-flow-col h-[64px] px-4">
        <div className="justify-self-start grid grid-flow-col items-center gap-1">
          <div onClick={toggleMenu} className="menu-icon px-4 py-2 cursor-pointer justify-self-start text-xl font-semibold">&#8806;</div>
          <div className="sitename justify-self-start">
            <div className="font-semibold text-xl">Tree.Market</div>
          </div>
        </div>
        <div className="connect-button grid justify-self-end items-center text-center">
          <div className="px-6 py-2 text-2xl">
            &#9752;
          </div>
        </div>
      </div>

      <div className="clear-both h-8"></div>

      <div className="menu-items relative px-4 space-y-6">
        <MenuItem icon="&#8793;" name="Home" />
        <MenuItem icon="&#8793;" name="Tree Marketplace" />
        <MenuItem icon="&#8793;" name="Catalog" />
        <MenuItem icon="&#8793;" name="Wallet" />
        <MenuItem icon="&#8793;" name="Vault" />
        <MenuItem icon="&#8793;" name="Notifications" />
        <MenuItem icon="&#8793;" name="Profile" />
        <MenuItem icon="&#8793;" name="Settings" />
      </div>

      <div className="clear-both h-[100px]"></div>

     
    </div>
  );
};

const MenuItem = ({ icon, name }:any) => {
  return (
    <div className="menu-item relative grid grid-flow-col items-center justify-start gap-6 px-4 text-lg cursor-pointer">
      <div className="menu-icon text-2xl">{icon}</div>
      <p className="menu-name leading-6 font-semibold gap-2">{name}</p>
    </div>
  );
};

export default SideMenu;
