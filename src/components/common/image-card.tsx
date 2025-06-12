import Image from "next/image";

interface ImageCardProps {
  imageUrl: string;
  className: string;
  lines: string[];
  header: string;
  flag: string;
}

export function ImageCard({
  imageUrl,
  className,
  lines,
  header,
  flag,
}: ImageCardProps) {
  return (
    <div
      className={`w-64 h-80  rounded-lg shadow-md p-4 flex flex-col relative overflow-hidden ${className}`}
    >
      <Image
        className="w-full h-40 rounded-lg object-contain"
        src={imageUrl}
        alt="Food Image"
        width={100}
        height={100}
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
        <div className="absolute -bottom-4 -right-8 bg-red-700 p-1 px-2 rotate-325 w-60 text-right">
          <span className="text-white font-semibold text-xs mr-3">{flag}</span>
        </div>
      )}
    </div>
  );
}
