import { Process } from "@/lib/scheduler";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface ProcessTableProps {
  processes: Process[];
  selectedIds: string[];
  onSelectChange: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export function ProcessTable({ processes, selectedIds, onSelectChange, onSelectAll }: ProcessTableProps) {
  return (
    <div className="rounded-md border overflow-hidden bg-card">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={processes.length > 0 && selectedIds.length === processes.length}
                onCheckedChange={(checked) => onSelectAll(checked === true)}
              />
            </TableHead>
            <TableHead>PID</TableHead>
            <TableHead className="text-right">Arrival</TableHead>
            <TableHead className="text-right">Burst</TableHead>
            <TableHead className="text-right">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                No processes added
              </TableCell>
            </TableRow>
          ) : (
            processes.map((p) => (
              <TableRow key={p.pid} className="hover:bg-muted/30">
                <TableCell>
                  <Checkbox 
                    checked={selectedIds.includes(p.pid)}
                    onCheckedChange={(checked) => onSelectChange(p.pid, checked === true)}
                  />
                </TableCell>
                <TableCell className="font-mono text-primary">{p.pid}</TableCell>
                <TableCell className="text-right font-mono">{p.arrival}</TableCell>
                <TableCell className="text-right font-mono">{p.burst}</TableCell>
                <TableCell className="text-right font-mono">{p.priority}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
