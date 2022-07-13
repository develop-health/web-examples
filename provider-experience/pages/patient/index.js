import { ArrowLeftIcon } from "@heroicons/react/solid";
import AppContainer from "../../components/AppContainer";
import PatientDirectory from "../../components/PatientDirectory";


export default function PatientIndex() {
  return (
    <AppContainer>
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <PatientDirectory />
        <button
          className="relative block w-full rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-medium text-gray-900">Select a patient</span>
        </button>
      </div>
    </AppContainer>
  );
}