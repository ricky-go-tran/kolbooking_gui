import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"

const OwnerInfoCard = ({ owner }: { owner: any }) => {
  return (
    <div id="owner-info" className="max-w-xs w-full lg:w-4/5">
      <div className="w-full">
        <div className="bg-white shadow-xl rounded-lg py-3 max-w-xs dark:bg-gray-800">
          <div className="photo-wrapper p-2">
            <div className="text-center text-gray-400 text-base font-semibold mb-5">
              <p>About owner this job</p>
            </div>
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={
                owner?.avatar === undefined || owner.avatar === "null"
                  ? getCDNImage(DEFAULT_AVATAR)
                  : getProxy(owner.avatar)
              }
              alt="John Doe"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8 dark:text-gray-400">
              {owner?.fullname}
            </h3>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Address
                  </td>
                  <td className="px-2 py-2 dark:text-gray-100">
                    {owner?.address}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Phone
                  </td>
                  <td className="px-2 py-2 dark:text-gray-100">{`+84 ${owner?.phone}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerInfoCard
