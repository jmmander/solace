import { Spinner } from "./icons";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({ message = "Loading...", fullScreen = false }: LoadingProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
    : "w-full flex items-center justify-center py-10";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center bg-white rounded-lg p-6 ">
        <Spinner />
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}