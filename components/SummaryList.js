
export default function SummaryList(props) {
    return (
        <div className="sm:col-span-2">
            <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                <h3>{props.title}</h3>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {props.children}
                </ul>
            </div>
        </div>
    );
}