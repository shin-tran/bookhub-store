import { Skeleton } from "@heroui/react";

const RenderSkeletonCell = (columnKey: string | number) => {
  switch (columnKey) {
    case "thumbnail":
      return <Skeleton className="h-8 w-8 rounded-full" />;
    case "mainText":
      return <Skeleton className="h-4 w-32 rounded" />;
    case "author":
      return <Skeleton className="h-4 w-40 rounded" />;
    case "category":
      return <Skeleton className="h-4 w-28 rounded" />;
    case "price":
      return <Skeleton className="h-6 w-16 rounded" />;
    case "quantity":
      return <Skeleton className="h-5 w-12 rounded" />;
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
