import { gql } from "@apollo/client"
import { OfficeBuildingIcon } from "@heroicons/react/solid"
import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"
import { client } from '/lib/client'

const PATIENT_QUERY = gql`
  query GetPatient($id: Int) {
    patient(where:{ _id: { _eq: $id } }) {
      id
      care_team_subjects {
        care_teams {
          reason_code {
            text
            coding {
              code
              system
            }
          }
          participant {
            _id
            role {
              text
            }
            member {
              patient {
                name {
                  prefix
                  given
                  family
                }
              }
              practitioner {
                name {
                  prefix
                  given
                  family
                }
              }
              organization {
                name
              }
            }
          }
        }
      }
      ...PatientContainerPatientFragment
    }
  }
  ${PatientContainer.fragments.patient}
`

export default function Summary({ patient }) {
  return (
    <PatientContainer patient={patient}>
      <PatientTabs></PatientTabs>
      <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        {patient.care_team_subjects.map((careTeamSubject, idx) => (
          <>
            <h2 className="text-sm font-medium text-gray-500 mt-4">{careTeamSubject.care_teams[0].reason_code[0].text}</h2>
            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {careTeamSubject.care_teams[0].participant.filter(participant => participant.member.practitioner).map((participant) => {
                const name = participant.member.practitioner.name[0]
                return (
                  <div
                    key={participant._id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                  >
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={`https://api.multiavatar.com/${name.given} ${name.family}.png`} alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{name.prefix} {name.given} {name.family}</p>
                        <p className="text-sm text-gray-500 truncate">{participant.role[0].text}</p>
                      </a>
                    </div>
                  </div>
                )
              })}
              {careTeamSubject.care_teams[0].participant.filter(participant => participant.member.organization).map((participant) => (
                  <div
                    key={participant._id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                  >
                    <div className="flex-shrink-0">
                      <OfficeBuildingIcon className="h-10 w-10 rounded-full text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{participant.member.organization.name}</p>
                        <p className="text-sm text-gray-500 truncate">{participant.role[0].text}</p>
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ))}
      </div>
    </PatientContainer>
  );
}

export async function getServerSideProps(context) {
  const { data: patientData } = await client.query({
    query: PATIENT_QUERY,
    variables: { id: context.query.id }
  });
  return {
    props: {
      patient: patientData.patient[0]
    },
  };
}