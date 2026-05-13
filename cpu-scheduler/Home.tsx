import { useState, useEffect } from "react";
import { Process, SimResult, simulateSRTF, simulateRR } from "@/lib/scheduler";
import { ProcessTable } from "@/components/ProcessTable";
import { ProcessForm } from "@/components/ProcessForm";
import { ResultsTable } from "@/components/ResultsTable";
import { ComparisonView } from "@/components/ComparisonView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Play, GitCompare } from "lucide-react";

const SCENARIOS = {
  A: [
    { pid: "P1", arrival: 0, burst: 8, priority: 2, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P2", arrival: 1, burst: 4, priority: 1, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P3", arrival: 2, burst: 9, priority: 3, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P4", arrival: 3, burst: 5, priority: 2, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
  ],
  B: [
    { pid: "P1", arrival: 0, burst: 2, priority: 1, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P2", arrival: 1, burst: 3, priority: 2, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P3", arrival: 2, burst: 1, priority: 3, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P4", arrival: 3, burst: 4, priority: 1, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P5", arrival: 4, burst: 2, priority: 2, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
  ],
  C: [
    { pid: "P1", arrival: 0, burst: 10, priority: 1, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P2", arrival: 1, burst: 2, priority: 2, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P3", arrival: 2, burst: 3, priority: 3, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
    { pid: "P4", arrival: 3, burst: 1, priority: 1, remaining: 0, startTime: 0, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: 0 },
  ]
};

export default function Home() {
  const [processes, setProcesses] = useState<Process[]>(SCENARIOS.A);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantum, setQuantum] = useState(4);
  
  const [srtfResult, setSrtfResult] = useState<SimResult | null>(null);
  const [rrResult, setRrResult] = useState<SimResult | null>(null);
  const [activeTab, setActiveTab] = useState("srtf");

  const { toast } = useToast();

  const handleAdd = (arrival: number, burst: number, priority: number) => {
    const nextId = processes.length > 0 ? Math.max(...processes.map(p => parseInt(p.pid.replace("P", "") || "0"))) + 1 : 1;
    const newProc: Process = {
      pid: `P${nextId}`,
      arrival, burst, priority,
      remaining: burst, startTime: -1, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: -1
    };
    setProcesses([...processes, newProc]);
  };

  const handleSelectChange = (id: string, selected: boolean) => {
    if (selected) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) setSelectedIds(processes.map(p => p.pid));
    else setSelectedIds([]);
  };

  const handleRemoveSelected = () => {
    setProcesses(processes.filter(p => !selectedIds.includes(p.pid)));
    setSelectedIds([]);
  };

  const loadScenario = (key: keyof typeof SCENARIOS) => {
    setProcesses([...SCENARIOS[key]]);
    setSelectedIds([]);
  };

  const runSimulations = () => {
    if (processes.length === 0) {
      toast({ title: "No processes", description: "Add at least one process to simulate.", variant: "destructive" });
      return;
    }
    const srtf = simulateSRTF(processes);
    const rr = simulateRR(processes, quantum);
    setSrtfResult(srtf);
    setRrResult(rr);
  };

  const runSrtf = () => {
    if (processes.length === 0) {
      toast({ title: "No processes", variant: "destructive" });
      return;
    }
    setSrtfResult(simulateSRTF(processes));
    setActiveTab("srtf");
  };

  const runRr = () => {
    if (processes.length === 0) {
      toast({ title: "No processes", variant: "destructive" });
      return;
    }
    setRrResult(simulateRR(processes, quantum));
    setActiveTab("rr");
  };

  const runCompare = () => {
    if (processes.length === 0) {
      toast({ title: "No processes", variant: "destructive" });
      return;
    }
    runSimulations();
    setActiveTab("compare");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <div className="w-full md:w-[450px] border-r bg-card/30 flex flex-col h-screen overflow-y-auto">
        <div className="p-6 border-b bg-card">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2 text-primary">
            CPU Scheduler
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Simulator & Comparator</p>
        </div>

        <div className="p-6 space-y-8 flex-1">
          <ProcessForm onAdd={handleAdd} />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Queue</h3>
              <div className="space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setProcesses([])} className="text-xs h-7">Clear</Button>
                <Button variant="destructive" size="sm" onClick={handleRemoveSelected} disabled={selectedIds.length === 0} className="text-xs h-7">
                  <Trash2 className="w-3 h-3 mr-1" /> Remove
                </Button>
              </div>
            </div>
            <ProcessTable 
              processes={processes} 
              selectedIds={selectedIds} 
              onSelectChange={handleSelectChange}
              onSelectAll={handleSelectAll}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Presets</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => loadScenario("A")}>Scen A</Button>
              <Button variant="outline" size="sm" onClick={() => loadScenario("B")}>Scen B</Button>
              <Button variant="outline" size="sm" onClick={() => loadScenario("C")}>Scen C</Button>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <Label className="whitespace-nowrap font-semibold text-sm text-muted-foreground uppercase tracking-wider">RR Quantum</Label>
              <Input 
                type="number" 
                min="1"
                value={quantum} 
                onChange={e => setQuantum(Math.max(1, parseInt(e.target.value) || 1))}
                className="font-mono bg-card"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        <div className="p-6 border-b bg-card/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button onClick={runSrtf} variant={activeTab === "srtf" ? "default" : "secondary"}>
              <Play className="w-4 h-4 mr-2" /> Run SRTF
            </Button>
            <Button onClick={runRr} variant={activeTab === "rr" ? "default" : "secondary"}>
              <Play className="w-4 h-4 mr-2" /> Run RR
            </Button>
          </div>
          <Button onClick={runCompare} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <GitCompare className="w-4 h-4 mr-2" /> Compare Both
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:px-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
            <TabsList className="mb-8 bg-muted/50 p-1">
              <TabsTrigger value="srtf" className="px-8">SRTF Results</TabsTrigger>
              <TabsTrigger value="rr" className="px-8">Round Robin Results</TabsTrigger>
              <TabsTrigger value="compare" className="px-8">Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="srtf" className="outline-none">
              <ResultsTable result={srtfResult} />
            </TabsContent>
            
            <TabsContent value="rr" className="outline-none">
              <ResultsTable result={rrResult} />
            </TabsContent>
            
            <TabsContent value="compare" className="outline-none">
              <ComparisonView srtf={srtfResult} rr={rrResult} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
