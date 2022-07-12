import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"
import SummaryList from "/components/SummaryList"
import ConditionListItem from "/components/ConditionListItem"
import MedicationListItem from "/components/MedicationListItem"
import { gql } from "@apollo/client"
import { client } from '/lib/client'
import sortBy from 'lodash/sortBy'


const PATIENT_QUERY = gql`
  query GetPatient($id: Int) {
    patient(where:{ _id: { _eq: $id } }) {
      _id
      condition_subjects {
        _id
        conditions {
          _id
          ...ConditionListItemConditionFragment
        }
      }
      medication_request_subjects {
        _id
        medication_requests {
          _id
          ...MedicationListItemMedicationFragment
        }
      }
      ...PatientContainerPatientFragment
    }
  }
  ${PatientContainer.fragments.patient}
  ${ConditionListItem.fragments.condition}
  ${MedicationListItem.fragments.medication}
`

export default function PatientSummary({ patient }) {
  return (
    <PatientContainer patient={patient}>
      <PatientTabs></PatientTabs>
      <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <SummaryList title="Conditions">
          {sortBy(patient.condition_subjects, [(conditionSubject) => conditionSubject.conditions[0].clinical_status.coding[0].code]).map((conditionSubject) => (
            <ConditionListItem key={conditionSubject._id} condition={conditionSubject.conditions[0]}></ConditionListItem>
          ))}
        </SummaryList>
        <SummaryList title="Medications">
          {patient.medication_request_subjects.map((medicationRequestSubject) => (
            <MedicationListItem key={medicationRequestSubject.medication_requests[0]._id} medication={medicationRequestSubject.medication_requests[0]}></MedicationListItem>
          ))}
        </SummaryList>
      </dl>
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