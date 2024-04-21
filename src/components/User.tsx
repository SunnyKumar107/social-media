const User = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="flex flex-col items-start justify-center ml-2 text-sm">
          <h2 className="font-bold">good_luck_0701</h2>
          <span className="font-extralight text-xs">Follows you</span>
        </div>
      </div>
      <div>
        <button className="text-sky-500 hover:text-blue-950 text-xs font-bold">
          Follow
        </button>
      </div>
    </div>
  )
}

export default User
