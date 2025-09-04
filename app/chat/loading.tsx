import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatListLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List Skeleton */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg">
                <div className="p-4 border-b">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="space-y-0">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 border-b">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                          <Skeleton className="h-3 w-32 mb-1" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Placeholder Skeleton */}
            <div className="lg:col-span-2">
              <div className="border rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
