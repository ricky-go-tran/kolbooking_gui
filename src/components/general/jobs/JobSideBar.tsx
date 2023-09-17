const JobSideBar = () => {
  return (
    <div className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li>
            <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="/#">
              KolJob
            </a>
          </li>
        </ul>
        <ul className="mt-6">
        </ul>
      </div>
    </div>

  )
}

export default JobSideBar;
