import ConversesationList from "./ConversesationList";
import LogoutBtn from "./LogoutBtn";
import SearchInput from "./SearchInput";

const SideBar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <ConversesationList />
      <LogoutBtn />
    </div>
  );
};

export default SideBar;
