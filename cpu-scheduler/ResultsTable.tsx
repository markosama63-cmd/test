import { SimResult } from "@/lib/scheduler";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GanttChart } from "./GanttChart";

interface ResultsTableProps {
  result: SimResult | null;
}

export function ResultsTable({ result }: ResultsTableProps) {
  if (!result) return <div className="p-8 text-center text-muted-foreground bg-muted/10 border border-dashed rounded-md">Run simulation to see results</div>;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground/90">Gantt Chart</h3>
        <GanttChart gantt={result.gantt} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground/90">Process Details</h3>
        <div className="rounded-md border bg-card overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>PID</TableHead>
                <TableHead className="text-right">Arrival</TableHead>
                <TableHead className="text-right">Burst</TableHead>
                <TableHead className="text-right">Finish</TableHead>
                <TableHead className="text-right text-accent font-semibold">Waiting</TableHead>
                <TableHead className="text-right">Turnaround</TableHead>
                <TableHead className="text-right">Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.processes.map((p) => (
                <TableRow key={p.pid} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-primary">{p.pid}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{p.arrival}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{p.burst}</TableCell>
                  <TableCell className="text-right font-mono">{p.finishTime}</TableCell>
                  <TableCell className="text-right font-mono text-accent font-bold">{p.waitingTime}</TableCell>
                  <TableCell className="text-right font-mono">{p.turnaroundTime}</TableCell>
                  <TableCell className="text-right font-mono">{p.responseTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-muted/30 border rounded-md p-4 flex flex-col items-center justify-center">
          <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Avg Waiting</span>
          <span className="text-3xl font-mono font-bold text-accent">{result.avgWaitingTime.toFixed(2)}</span>
        </div>
        <div className="bg-muted/30 border rounded-md p-4 flex flex-col items-center justify-center">
          <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Avg Turnaround</span>
          <span className="text-3xl font-mono font-bold">{result.avgTurnaroundTime.toFixed(2)}</span>
        </div>
        <div className="bg-muted/30 border rounded-md p-4 flex flex-col items-center justify-center">
          <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Avg Response</span>
          <span className="text-3xl font-mono font-bold">{result.avgResponseTime.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
