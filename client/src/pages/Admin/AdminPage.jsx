import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import AdminUsersPage from "../../components/AdminComponents/AdminUsersPage";
import AdminClientRequestsPage from "../../components/AdminComponents/AdminClientRequestsPage";
import AdminAddGrants from "../../components/AdminComponents/AdminAddGrants";
import { FiUsers } from "react-icons/fi";
import { PiUserSwitchFill } from "react-icons/pi";
import { CgAdd } from "react-icons/cg";

const SidebarMenu = [
  { icon: <FiUsers/>, value: "Users" },
  { icon: <PiUserSwitchFill />, value: "Client Requests" },
  { icon: <CgAdd />, value: "Add Grants" },
];

const RenderComponent = ({ index }) => {
  switch (index) {
    case 0:
      return <AdminUsersPage />;
    case 1:
      return <AdminClientRequestsPage />;
    case 2:
      return <AdminAddGrants />;
    default:
      break;
  }
};

const AdminPage = () => {
  const [isSelected, SetIsSelected] = useState(1);
  return (
    <div className="w-full h-screen bg-slate-300-400 flex flex-auto scroll-m-0">
      <Navbar />
      <div className="flex flex-auto">
        <SideBar
          MenuItems={SidebarMenu}
          isSelected={isSelected}
          SetIsSelected={SetIsSelected}
        />
        <div className="justify-center items-center mt-[6%] overflow-auto w-full">
          <RenderComponent index={isSelected} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
