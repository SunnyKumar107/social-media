import Link from "next/link";
import { FaBars, FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoHomeSharp, IoSearch } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: IoHomeSharp,
  },
  {
    title: "Search",
    icon: IoSearch,
  },
  {
    title: "Create",
    icon: MdAddBox,
  },
  {
    title: "Notification",
    icon: IoMdNotifications,
  },
  {
    title: "Profile",
    icon: FaUser,
  },
];

const SideNav = () => {
  return (
    <section className="flex flex-col w-60 border-r-[1px] border-gray-300 h-screen fixed p-3">
      <div className=" px-4 py-6">
        <h1 className="text-2xl font-bold font-sans">Instagram</h1>
      </div>
      <div className="flex flex-col w-full h-full justify-between">
        <div className="flex flex-col w-full">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              className="hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px] flex items-center justify-start space-x-4"
              href={`/${item.title.toLocaleLowerCase()}`}
              key={item.title}
            >
              <div className="text-2xl">
                <item.icon />
              </div>
              <div className="">{item.title}</div>
            </Link>
          ))}
        </div>
        <div className="hover:bg-gray-200 cursor-pointer rounded-xl px-4 py-3 mb-2 text-[17px] flex items-center justify-start space-x-4">
          <div className="text-2xl">
            <FaBars />
          </div>
          <div>More</div>
        </div>
      </div>
    </section>
  );
};

export default SideNav;
