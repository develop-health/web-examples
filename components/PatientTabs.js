import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

const tabs = [
    { name: 'Timeline', href: '/patient/timeline'},
    { name: 'Summary', href: '/patient/summary'},
    { name: 'Demographics', href: '/patient/demographics'},
    { name: 'Team', href: '/patient/team'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PatientTabs(props) {
    const router = useRouter()

    return (
        <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    router.pathname === tab.href
                      ? 'border-pink-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={router.pathname === tab.href ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
}
