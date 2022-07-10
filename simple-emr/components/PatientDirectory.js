import { gql, useQuery } from "@apollo/client"
import { FilterIcon, SearchIcon } from '@heroicons/react/solid'
import Link from "next/link";

const GET_PATIENTS = gql`
  query GetPatients {
    patient_aggregate {
      aggregate {
        count
      }
      nodes {
        _id
        birth_date
        gender
        photo {
          data
        }
        name {
          family
          given
        }
      }
    }
  }
`

export default function PatientDirectory() {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (error) return <p>Error :(</p>;

  return (
    <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Patients</h2>
        <p className="mt-1 text-sm text-gray-600">Search directory of {loading ? '-' : data.patient_aggregate.aggregate.count} patients</p>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {loading ? (
            <li>
              <div className="relative px-6 py-5 space-x-3">
                <div class="animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            data.patient_aggregate.nodes.map((patient) => (
              <li key={patient._id}>
                <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={patient.photo[0]?.data} alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/patient/${encodeURIComponent(patient._id)}`}>
                      <a className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{patient.name[0].given} {patient.name[0].family}</p>
                        <p className="text-sm text-gray-500 truncate">{patient.gender.charAt(0).toUpperCase()} &#x2022; {patient.birth_date}</p>
                      </a>
                    </Link>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </nav>
    </aside>
  )
}