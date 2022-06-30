import { gql, useQuery } from "@apollo/client"

const GET_PATIENTS = gql`
  query GetPatients {
    patient_aggregate {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
      <ul role="list" className="relative z-0 divide-y divide-gray-200">
        {data.patient_aggregate.nodes.map((patient) => (
          <li key={patient._id}>
            <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={patient.photo[0]?.data} alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{patient.name[0].given} {patient.name[0].family}</p>
                  <p className="text-sm text-gray-500 truncate">{patient.gender} &#x2022; {patient.birth_date}</p>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}