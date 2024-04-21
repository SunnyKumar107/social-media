import { BiCommentDetail } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

const Post = () => {
  return (
    <div className="flex flex-col w-screen  sm:w-[480px] border-b-[1px] border-gray-200 pb-4 mb-8">
      <div className="flex items-center justify-between w-full mb-3 px-2 md:px-1">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex items-center ml-2">
            <h3 className="flex items-center font-semibold text-base">
              good_luck_0701
              <LuDot />
            </h3>
            <span className="flex items-center font-extralight text-sm">
              14h
            </span>
          </div>
        </div>
        <div className="text-xl">
          <BsThreeDots />
        </div>
      </div>
      <div className="w-full h-[450px] bg-gray-200"></div>
      <div className="flex items-center justify-between text-[24px] text-gray-700 px-2 md:px-1 my-2">
        <div className="flex space-x-5">
          <div>
            <FaRegHeart />
          </div>
          <div>
            <BiCommentDetail />
          </div>
        </div>
        <div>
          <IoShareSocial />
        </div>
      </div>
      <div className="text-gray-600 text-sm px-2 md:px-1">
        Liked by{" "}
        <span className="text-black font-semibold">good_luck_0701</span> and{" "}
        <span className="text-black font-semibold">others</span>
      </div>
    </div>
  );
};

export default Post;
