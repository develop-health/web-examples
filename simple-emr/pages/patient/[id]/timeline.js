import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"

const PATIENT_QUERY = gql`
  query GetPatient($id: Int) {
    patient(where:{ _id: { _eq: $id } }) {
      id
      ...PatientContainerFragment
    }
  }
  ${PatientContainer.fragments.patient}
`

export default function PatientTimeline() {
  const router = useRouter()

  const { error, loading, data } = useQuery(PATIENT_QUERY, { variables: { id: router.query.id } })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <PatientContainer patient={data.patient[0]}>
      <PatientTabs></PatientTabs>
      <h1>Timeline</h1>
    </PatientContainer>
  );
}