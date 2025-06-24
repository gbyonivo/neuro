import Image from "next/image";
import { memo } from "react";

interface ImageCardProps {
  imageUrl: string;
  className?: string;
  lines: string[];
  header: string;
  flag?: string;
  onClick?: () => void;
  flagClassName?: string;
  id?: string;
}

function ImageCardInner({
  imageUrl,
  className,
  lines,
  header,
  flag,
  onClick,
  flagClassName = "bg-red-700 text-white",
  id,
}: ImageCardProps) {
  return (
    <div
      className={`w-64 h-80  rounded-lg shadow-md p-4 flex flex-col relative overflow-hidden ${className} ${
        onClick
          ? "cursor-pointer hover:shadow-lg transition-shadow duration-300"
          : ""
      }`}
      role="button"
      onClick={onClick}
      data-testid={id}
    >
      <Image
        className="w-full h-40 rounded-lg object-contain"
        src={imageUrl}
        alt={`Food Image ${header}`}
        width={100}
        height={100}
        fetchPriority="high"
      />
      <div className="mt-4 overflow-hidden text-ellipsis text-xs flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-800">{header}</h2>
        {lines.map((line, index) => (
          <p className="text-gray-600 font-semibold" key={index}>
            {line}
          </p>
        ))}
      </div>
      {!!flag && (
        <div
          className={`absolute -bottom-4 -right-8 p-1 px-2 rotate-325 w-60 text-right ${flagClassName}`}
        >
          <span className="font-semibold text-xs mr-3">{flag}</span>
        </div>
      )}
    </div>
  );
}

export const ImageCard = memo(ImageCardInner, (prevProps, nextProps) => {
  return (
    prevProps.imageUrl === nextProps.imageUrl &&
    prevProps.header === nextProps.header &&
    prevProps.flag === nextProps.flag &&
    prevProps.flagClassName === nextProps.flagClassName &&
    prevProps.lines.length === nextProps.lines.length &&
    prevProps.lines.every((line, index) => line === nextProps.lines[index])
  );
});
