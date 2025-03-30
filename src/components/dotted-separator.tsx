import {cn} from "@/lib/utils";

interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

export const DottedSeparator: React.FC<DottedSeparatorProps> = ({
  className = "",
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}) => {
  const isHorizontal = direction === "horizontal";

  const parsedDotSize = parseInt(dotSize, 10);
  const parsedGapSize = parseInt(gapSize, 10);

  return (
    <div
      className={cn(
        isHorizontal ? "flex w-full items-center" : "flex h-full flex-col items-center",
        className
      )}>
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${parsedDotSize + parsedGapSize}px ${height}`
            : `${height} ${parsedDotSize + parsedGapSize}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}></div>
    </div>
  );
};
