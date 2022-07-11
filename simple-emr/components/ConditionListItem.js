import { CalendarIcon, UsersIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import { gql } from '@apollo/client'

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ConditionListItem({ condition }) {
  const recordedByName = condition.encounter.participant[0].individual.practitioner.name[0]
  const clinicalStatus = condition.clinical_status.coding[0].code
  return (
    <li>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {condition.code.text}&nbsp;
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                SNOMED: {condition.code.coding[0].code}
              </span>
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${clinicalStatus === 'resolved' ? 'green' : 'yellow'}-100 text-${clinicalStatus === 'resolved' ? 'green' : 'yellow'}-800`}>
                {capitalizeFirstLetter(clinicalStatus)}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                {recordedByName.prefix} {recordedByName.given} {recordedByName.family}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {condition.abatement_date_time ? (
                <p>
                  Ended on <time dateTime={condition.abatement_date_time}>{dateTimeFormat.format(new Date(condition.abatement_date_time))}</time>
                </p>
              ) : (
                <p>
                  Started <time dateTime={condition.onset_date_time}>{dateTimeFormat.format(new Date(condition.onset_date_time))}</time>
                </p>
              )}
            </div>
          </div>
        </div>
      </a>
    </li>
  )
}

ConditionListItem.fragments = {
  condition: gql`
    fragment ConditionListItemConditionFragment on condition {
      onset_date_time
      abatement_date_time
      recorded_date
      encounter {
        participant {
          individual {
            practitioner {
              name {
                family
                given
                prefix
              }
            }
          }
        }
      }
      clinical_status {
        coding {
          code
          system
        }
      }
      code {
        text
        coding {
          code
          system
        }
      }
    }
  `
}

export default ConditionListItem