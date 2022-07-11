import { gql } from "@apollo/client"
import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"
import { client } from '/lib/client'

const PATIENT_QUERY = gql`
  query GetPatient($id: Int) {
    patient(where:{ _id: { _eq: $id } }) {
      id
      telecom {
        value
      }
      gender
      ...PatientContainerPatientFragment
    }
  }
  ${PatientContainer.fragments.patient}
`

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function PatientDemographics({ patient }) {
  return (
    <PatientContainer patient={patient} >
      <PatientTabs></PatientTabs>
      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{patient.telecom[0].value}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Gender</dt>
            <dd className="mt-1 text-sm text-gray-900">{capitalizeFirstLetter(patient.gender)}</dd>
          </div>
        </dl>
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