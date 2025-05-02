import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Feedback {
  content: string;
  timestamp: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading: boolean;
}

const FeedbackList = ({ feedbacks, loading }: FeedbackListProps) => {
  return (
    <div className="px-4 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Suggestions ({loading ? "..." : feedbacks.length})
      </h2>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-10">
          <p className="text-lg">No feedbacks yet!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="p-4 border shadow-shadow border-gray-600 text-main-foreground rounded-lg bg-main/50 w-fit rounded-tl-none"
            >
              <p>{fb.content}</p>
              <div className="text-xs mt-2 flex justify-between">
                <span>{fb.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
