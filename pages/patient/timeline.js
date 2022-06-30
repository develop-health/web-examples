import PatientContainer from "/components/PatientContainer"
import PatientTabs from "/components/PatientTabs"

export default function Summary() {
    return (
        <PatientContainer>
            <PatientTabs></PatientTabs>
            <h1>Timeline</h1>
        </PatientContainer>
    );
}