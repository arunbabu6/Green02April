function AdminAddGrants() {
  const handleAddGrantSubmit = () => {
    return "added grants..."
  }
  return (
    <div className="fixed top-0 w-full h-full bg-opacity-0 bg-white flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8 flex">
        <div className="">
          <h2 className="text-lg mb-4">Grant Application</h2>
          <form onSubmit={handleAddGrantSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="grantAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Grant Amount:
              </label>
              <input
                type="text"
                id="grantAmount"
                name="grantAmount"
                // value={formData.grantAmount}
                // onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                // value={formData.description}
                // onChange={handleChange}
                className="w-full h-24 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="grantImage"
                className="block text-sm font-medium text-gray-700"
              >
                Grant Image:
              </label>
              <input
                type="file"
                id="grantImage"
                name="grantImage"
                onChange=""
                accept="image/*"
                className="w-full py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-green-500 focus:ring-1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:ring-green-500 focus:ring-opacity-50"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddGrants;
