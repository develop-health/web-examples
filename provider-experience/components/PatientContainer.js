import { gql } from '@apollo/client'
import { ChevronLeftIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid'
import AppContainer from './AppContainer'
import ClientOnly from './ClientOnly'
import PatientDirectory from './PatientDirectory'

function PatientContainer({ patient, children }) {
  const name = patient.name[0]

  return (
    <AppContainer>
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          {/* Breadcrumb */}
          <nav className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
            <a href="#" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
              <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Patients</span>
            </a>
          </nav>

          <article>
            {/* summary header */}
            <div>
              <div>
                <img className="h-32 w-full object-cover lg:h-48" src={`https://picsum.photos/seed/${name.given}/1950/192/?blur`} alt="" />
              </div>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                      src={patient.photo[0].data}
                      alt=""
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">{name.given} {name.family}</h1>
                    </div>
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        <MailIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Message</span>
                      </button>
                      <a
                        href={`tel:${patient.telecom[0].value}`}
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        <PhoneIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{name.given} {name.family}</h1>
                </div>
              </div>
            </div>
            {children}
          </article>
        </main>
        <ClientOnly>
          <PatientDirectory />
        </ClientOnly>
      </div>
    </AppContainer>
  )
}

PatientContainer.fragments = {
  patient: gql`
    fragment PatientContainerPatientFragment on patient {
      telecom {
        value
      }
      photo {
        data
      }
      name {
        family
        given
      }
    }
  `
};

export default PatientContainer