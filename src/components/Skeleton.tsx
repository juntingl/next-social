export default function Skeleton(props) {
  return (
    <div className="w-full p-4 mt-4 border border-blue-100 rounded-md shadow">
      <div className="animate-pulse">
        <div className="flex-1 py-1 space-y-3">
          <div className="flex justify-between">
            <div className="h-2 w-20 rounded bg-slate-200"></div>
            <div className="h-2 w-10 rounded bg-slate-200"></div>
          </div>
          <div className="h-2 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 col-span-2 rounded bg-slate-200"></div>
              <div className="h-2 col-span-1 rounded bg-slate-200"></div>
            </div>
            <div className="h-2 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}