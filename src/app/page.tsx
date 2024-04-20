import SideNav from "@/components/SideNav";
import Post from "@/components/Post";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center relative ">
      <div className="max-w-screen-lg w-full h-full flex relative">
        <SideNav />
        <main className="ml-60 py-8 px-28">
          <Post />
          <Post />
          <Post />
          <Post />
        </main>
      </div>
    </div>
  );
}
