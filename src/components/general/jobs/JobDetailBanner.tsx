import Banner from "../../../assets/images/banner-job.jpg";
import { Link } from "react-router-dom";

export default function JobDetailBanner() {
  return (
    <div
      className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill rounded-lg"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className="md:w-1/2">
        <p className="font-bold text-sm uppercase my-7">Job Description </p>
        <p className="text-2xl mb-10 leading-none">
          Display detailed job information such as images, descriptions, and
          industry categories
        </p>
        <Link
          to="/jobs"
          className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
        >
          More Jobs
        </Link>
      </div>
    </div>
  );
}
