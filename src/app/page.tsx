import SideNav from "@/components/SideNav";
import Post from "@/components/Post";

export default function Home() {
  return (
    <div className="max-w-screen-lg w-full h-full flex relative">
      <SideNav />
      <main className="flex md:ml-60 py-8">
        <div className="flex flex-col flex-wrap sm:px-10 md:px-28">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </main>
    </div>
  );
}
