import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

function SideBar({ MenuItems, isSelected, SetIsSelected }) {
  const { user } = useAuth0();
  return (
    <aside className="h-screen w-auto">
      <div className="mt-16 bg-white border-r shadow-sm h-[94%] grid grid-flow-row">
        <div>
          <ul className="grid grid-flow-row font-bold">
            {MenuItems.map((menu, index) => {
              return (
                <li
                  key={index}
                  className={
                    isSelected === index
                      ? "bg-green-600 hover:text-white p-6 cursor-pointer grid grid-flow-col"
                      : "p-6 cursor-pointer grid grid-flow-col"
                  }
                  onClick={() => SetIsSelected(index)}
                >
                  <div>{menu.icon}</div>
                  <div className="">{menu.value}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-t grid mt-72">
          <div className="grid grid-flow-col p-4">
            <div>
              <img
                src={user.picture}
                className="h-12 w-12 rounded-full"
                alt="User Avatar"
              />
            </div>
            <div className="font-bold mt-3">Admin</div>
          </div>
          <div className="p-4">{user.email}</div>
        </div>
      </div>
    </aside>
  );
}

SideBar.propTypes = {
  MenuItems: PropTypes.array.isRequired,
};

export default SideBar;
