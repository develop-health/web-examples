import Link from 'next/link';
import { useRouter } from 'next/router'

const tabs = [
  // { name: 'Timeline', pathname: 'timeline' },
  { name: 'Summary', pathname: 'summary' },
  { name: 'Demographics', pathname: 'demographics' },
  { name: 'Team', pathname: 'team' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PatientTabs() {
  const router = useRouter()
  console.log({ router, ends: router.pathname.endsWith('summary') })

  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={`/patient/${router.query.id}/${tab.pathname}`}
              >
                <a
                  className={classNames(
                    router.pathname.endsWith(tab.pathname)
                      ? 'border-pink-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={router.pathname.endsWith(tab.pathname) ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
