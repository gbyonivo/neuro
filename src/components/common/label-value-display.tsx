interface LabelValueDisplayProps {
  label: string;
  value: string | number;
}

export function LabelValueDisplay({ label, value }: LabelValueDisplayProps) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="text-gray-500 text-xs">{label}</div>
      <div>{value}</div>
    </div>
  );
}
