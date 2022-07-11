import { gql } from "@apollo/client"
import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"
import { client } from '/lib/client'

const demos = {
  fields: {
    Phone: '(555) 123-4567',
    Email: 'ricardocooper@example.com',
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
    Salary: '$145,000',
    Birthday: 'June 8, 1990',
  },
}

const PATIENT_QUERY = gql`
  query GetPatient($id: Int) {
    patient(where:{ _id: { _eq: $id } }) {
      id
      ...PatientContainerPatientFragment
    }
  }
  ${PatientContainer.fragments.patient}
`

export default function PatientDemographics({ patient }) {
  return (
    <PatientContainer patient={patient} >
      <PatientTabs></PatientTabs>
      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {Object.keys(demos.fields).map((field) => (
            <div key={field} className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{field}</dt>
              <dd className="mt-1 text-sm text-gray-900">{demos.fields[field]}</dd>
            </div>
          ))}
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