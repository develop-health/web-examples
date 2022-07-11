import { CalendarIcon, UsersIcon, TagIcon } from "@heroicons/react/solid";
import { gql } from '@apollo/client'

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MedicationListItem({ medication }) {
  const requesterName = medication.requester.practitioner.name[0]
  return (
    <li>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {medication.medication_codeable_concept.text}&nbsp;
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                RXNORM: {medication.medication_codeable_concept.coding[0].code}
              </span>
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${medication.status === 'resolved' ? 'green' : 'yellow'}-100 text-${medication.status === 'resolved' ? 'green' : 'yellow'}-800`}>
                {capitalizeFirstLetter(medication.status)}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                {requesterName.prefix} {requesterName.given} {requesterName.family}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                <TagIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                {medication.reason_reference[0].condition.code.text}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              <p>
                Prescribed <time dateTime={medication.authored_on}>{dateTimeFormat.format(new Date(medication.authored_on))}</time>
              </p>
            </div>
          </div>
        </div>
      </a>
    </li>
  )
}

MedicationListItem.fragments = {
  medication: gql`
    fragment MedicationListItemMedicationFragment on medication_request {
      status
      intent
      authored_on
      reason_reference {
        condition {
          code {
            text
          }
        }
      }
      requester {
        practitioner {
          name {
            prefix
            given
            family
          }
        }
      }
      medication_codeable_concept {
        text
        coding {
          code
          system
        }
      }
    }
  `
}

export default MedicationListItem