import Banner from "../../../assets/images/banner-job.jpg";

export default function JobBanner() {
  return (

    <div className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill rounded-lg" style={{ backgroundImage: `url(${Banner})` }}>
      <div className="md:w-1/2">
        <p className="font-bold text-sm uppercase">Jobs</p>
        <p className="text-3xl font-bold">Promote your brand</p>
        <p className="text-2xl mb-10 leading-none">Bring your products and services to the public</p>
        <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Get  started</a>
      </div>
    </div>
  )
}
