import User from './user'

const Suggest = () => {
  return (
    <div className="w-96 p-3 hidden lg:block">
      <div className="mb-4">
        <h2 className="text-gray-600 ">Suggested for you</h2>
      </div>
      <div className="flex flex-col flex-wrap gap-4">
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  )
}

export default Suggest
