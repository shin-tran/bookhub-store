import { Skeleton } from "@heroui/react";

const RenderSkeletonCell = (columnKey: string | number) => {
  switch (columnKey) {
    case "avatar":
      return <Skeleton className="h-8 w-8 rounded-full" />;
    case "fullName":
      return <Skeleton className="h-4 w-32 rounded" />;
    case "email":
      return <Skeleton className="h-4 w-40 rounded" />;
    case "phone":
      return <Skeleton className="h-4 w-28 rounded" />;
    case "role":
      return <Skeleton className="h-6 w-16 rounded-full" />;
    case "isActive":
      return <Skeleton className="h-5 w-12 rounded-full" />;
    case "createdAt":
      return <Skeleton className="h-4 w-24 rounded" />;
    case "actions":
      return <div className="flex justify-center">
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    default:
      return <Skeleton className="h-4 w-20 rounded" />;
  }
};

export default RenderSkeletonCell;
