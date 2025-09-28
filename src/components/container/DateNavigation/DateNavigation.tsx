import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type DateNavigationProps = {
  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  label: string;
};

export default function DateNavigation({
  hasPrev = false,
  hasNext = false,
  onPrev,
  onNext,
  label,
}: DateNavigationProps) {
  return (
    <div className="border border-[#DEDCDC] dark:border-neutral-900 rounded-lg py-1 px-3">
      <div className="flex items-center gap-3">
        <ChevronLeftIcon
          className={`w-5 h-5 cursor-pointer ${
            hasPrev
              ? "text-neutral-1100 dark:text-neutral-25"
              : "text-neutral-400"
          }`}
          onClick={hasPrev ? onPrev : undefined}
        />
        <span className="font-medium">{label}</span>
        <ChevronRightIcon
          className={`w-5 h-5 cursor-pointer ${
            hasNext
              ? "text-neutral-1100 dark:text-neutral-25"
              : "text-neutral-400"
          }`}
          onClick={hasNext ? onNext : undefined}
        />
      </div>
    </div>
  );
}
