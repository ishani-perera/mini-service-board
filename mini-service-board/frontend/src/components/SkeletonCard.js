export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded-full w-16" />
      </div>
      <div className="h-5 bg-gray-200 rounded w-20" />
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
      </div>
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}
