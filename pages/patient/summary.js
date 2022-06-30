import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"
import SummaryList from "/components/SummaryList"
import ConditionListItem from "../../components/ConditionListItem"
import MedicationListItem from "../../components/MedicationListItem"
import AllergyListItem from "../../components/AllergyListItem"


const conditions = [
  {
    id: 1,
    condition: 'Heart valve disorder',
    severity: 'moderate',
    bodySite: 'heart structure',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    condition: 'NSCLC - Non-small cell lung cancer',
    severity: 'severe',
    bodySite: 'thorax',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    condition: 'User Interface Designer',
    severity: 'Full-time',
    bodySite: 'Remote',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
]

const medications = [
  {
    id: 1,
    medication: 'medication End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    medication: 'Front End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    medication: 'User Interface Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
]

const allergies = [
  {
    id: 1,
    allergy: 'allergy End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    allergy: 'Front End Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    allergy: 'User Interface Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
]

export default function Summary() {
  return (
    <PatientContainer>
      <PatientTabs></PatientTabs>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

        <SummaryList title="Conditions">
          {conditions.map((position) => (
            <ConditionListItem position={position}></ConditionListItem>
          ))}

        </SummaryList>

        <SummaryList title="Medications">
          {medications.map((position) => (
            <MedicationListItem position={position}></MedicationListItem>
          ))}

        </SummaryList>

        <SummaryList title="Allergies">
          {allergies.map((position) => (
            <AllergyListItem position={position}></AllergyListItem>
          ))}
        </SummaryList>

      </dl>
    </PatientContainer>
  );
}