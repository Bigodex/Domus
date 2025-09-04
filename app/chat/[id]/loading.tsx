import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="border rounded-lg h-[600px] flex flex-col">
            {/* Header Skeleton */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>

            {/* Messages Skeleton */}
            <div className="flex-1 p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "flex-row-reverse" : ""}`}>
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="max-w-[70%]">
                    <Skeleton className={`h-12 ${i % 2 === 0 ? "w-48" : "w-64"} rounded-lg`} />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* Input Skeleton */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
