import { GanttSegment } from "@/lib/scheduler";

const PALETTE = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"];

const getColor = (pid: string) => {
  const match = pid.match(/\d+/);
  const num = match ? parseInt(match[0], 10) : 0;
  return PALETTE[(num - 1) % PALETTE.length] || PALETTE[0];
};

interface GanttChartProps {
  gantt: GanttSegment[];
}

export function GanttChart({ gantt }: GanttChartProps) {
  if (!gantt || gantt.length === 0) return <div className="text-muted-foreground p-8 text-center bg-muted/10 border border-dashed rounded-md">No Gantt chart available</div>;

  const maxTime = Math.max(...gantt.map(s => s.end));

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[600px] flex flex-col gap-2">
        <div className="flex h-12 w-full border rounded overflow-hidden">
          {gantt.map((seg, i) => {
            const width = ((seg.end - seg.start) / maxTime) * 100;
            return (
              <div 
                key={i} 
                className="h-full flex items-center justify-center text-xs font-bold text-gray-900 border-r border-r-black/10 last:border-r-0 relative group"
                style={{ width: `${width}%`, backgroundColor: getColor(seg.pid) }}
              >
                <span className="truncate px-1">{seg.pid}</span>
                <div className="absolute -bottom-6 text-[10px] text-muted-foreground left-0 -translate-x-1/2">
                  {i === 0 && seg.start}
                </div>
                <div className="absolute -bottom-6 text-[10px] text-muted-foreground right-0 translate-x-1/2">
                  {seg.end}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
