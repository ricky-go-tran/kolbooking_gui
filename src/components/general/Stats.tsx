const stats = [
  { id: 1, name: 'Search in 24 hours', value: '100 thousand' },
  { id: 2, name: 'Add 100 new jobs', value: '1 hour' },
  { id: 3, name: 'New users annually', value: '10 thousand' },
]

export default function Stats() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-4 text-4xl align-middle font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Application of Industry 4.0 technology</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">We are present in the fields of cuisine, travel, fashion, healthcare, and many more.</p>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
