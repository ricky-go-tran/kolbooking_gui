export default function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-800">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “We aim to be at the forefront of implementing Industry 4.0 technology in our work, starting with a novel field - KOLs. KolBooking will be a platform within our ecosystem, as part of our efforts to digitize employment.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-10 w-10 rounded-full"
              src="https://lh3.googleusercontent.com/-HcQThVYBjFc/AAAAAAAAAAI/AAAAAAAAAAA/AFsW0b6eNUYRVFr4bgXDNDEd5EVod2wu-g/photo.jpg?sz=46"
              alt=""
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Ricky Tran</div>
              <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-gray-600">CEO of KolBooking</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
