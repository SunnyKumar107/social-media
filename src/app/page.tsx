import SideNav from "@/components/SideNav";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center relative ">
      <div className="max-w-screen-lg w-full h-full flex relative">
        <SideNav />
      </div>
    </div>
  );
}
