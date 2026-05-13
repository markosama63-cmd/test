import { SimResult } from "@/lib/scheduler";

interface ComparisonViewProps {
  srtf: SimResult | null;
  rr: SimResult | null;
}

export function ComparisonView({ srtf, rr }: ComparisonViewProps) {
  if (!srtf || !rr) return <div className="p-8 text-center text-muted-foreground bg-muted/10 border border-dashed rounded-md">Run both simulations to compare</div>;

  const waitWinner = srtf.avgWaitingTime <= rr.avgWaitingTime ? "SRTF" : "Round Robin";
  const taWinner = srtf.avgTurnaroundTime <= rr.avgTurnaroundTime ? "SRTF" : "Round Robin";
  const respWinner = srtf.avgResponseTime <= rr.avgResponseTime ? "SRTF" : "Round Robin";

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="grid grid-cols-3 gap-4">
        <MetricCard title="Avg Waiting Time" valSrtf={srtf.avgWaitingTime} valRr={rr.avgWaitingTime} winner={waitWinner} />
        <MetricCard title="Avg Turnaround Time" valSrtf={srtf.avgTurnaroundTime} valRr={rr.avgTurnaroundTime} winner={taWinner} />
        <MetricCard title="Avg Response Time" valSrtf={srtf.avgResponseTime} valRr={rr.avgResponseTime} winner={respWinner} />
      </div>

      <div className="bg-muted/20 border border-primary/20 rounded-md p-6 space-y-4">
        <h3 className="text-lg font-semibold text-primary">Analysis</h3>
        <ul className="list-disc pl-5 space-y-2 text-foreground/80">
          <li><strong>{waitWinner}</strong> wins on average waiting time.</li>
          <li><strong>{taWinner}</strong> wins on average turnaround time.</li>
          <li><strong>{respWinner}</strong> wins on average response time.</li>
        </ul>
        <div className="pt-4 mt-4 border-t border-border">
          <h4 className="font-semibold mb-2">Recommendations</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            <strong>SRTF</strong> minimizes average waiting time — ideal for batch systems where throughput is paramount.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            <strong>Round Robin</strong> ensures fair CPU distribution — ideal for time-sharing/interactive systems.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            While Round Robin prevents starvation, it typically incurs more context switches and potentially higher average waiting times depending on the quantum size.
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, valSrtf, valRr, winner }: { title: string, valSrtf: number, valRr: number, winner: string }) {
  return (
    <div className="bg-card border rounded-md p-4">
      <div className="text-sm text-muted-foreground uppercase tracking-wider mb-4 text-center">{title}</div>
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground mb-1">SRTF</span>
          <span className={`text-xl font-mono font-bold ${winner === "SRTF" ? "text-primary" : ""}`}>{valSrtf.toFixed(2)}</span>
        </div>
        <div className="w-px h-8 bg-border"></div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground mb-1">RR</span>
          <span className={`text-xl font-mono font-bold ${winner === "Round Robin" ? "text-primary" : ""}`}>{valRr.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
