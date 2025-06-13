import { FaceFrownIcon } from "@heroicons/react/24/solid";

interface EmptyStateProps {
  description: string;
  onClick?: () => void;
  id?: string;
}

export function EmptyState({ description, onClick, id }: EmptyStateProps) {
  return (
    <button
      type="button"
      className="relative block lg:w-1/2 rounded-lg border-2 border-dashed border-gray-300 p-12 
      text-center hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 
      focus:ring-offset-2 focus:outline-hidden"
      onClick={onClick}
      data-testid={id}
    >
      <FaceFrownIcon className="mx-auto size-12 text-gray-400" />
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        {description}
      </span>
    </button>
  );
}
