export default function Loading() {
	return (
		<div className="flex flex-col justify-center items-center gap-8 py-10">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-r-4 border-slate-500"></div>
			<span className="text-lg font-medium text-slate-500">Loading...</span>
		</div>
	);
}
