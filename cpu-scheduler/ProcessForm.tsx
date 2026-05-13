import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProcessFormProps {
  onAdd: (arrival: number, burst: number, priority: number) => void;
}

export function ProcessForm({ onAdd }: ProcessFormProps) {
  const [arrival, setArrival] = useState("0");
  const [burst, setBurst] = useState("1");
  const [priority, setPriority] = useState("1");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(arrival);
    const b = parseInt(burst);
    const p = parseInt(priority);

    if (isNaN(a) || isNaN(b) || isNaN(p) || a < 0 || b <= 0) {
      setError("Invalid inputs. Arrival >= 0, Burst > 0.");
      return;
    }
    setError("");
    onAdd(a, b, p);
    setArrival("");
    setBurst("");
    setPriority("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-muted/20 border rounded-md">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Add Process</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Arrival Time</Label>
          <Input 
            type="number" 
            min="0"
            value={arrival} 
            onChange={e => setArrival(e.target.value)}
            className="font-mono bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label>Burst Time</Label>
          <Input 
            type="number" 
            min="1"
            value={burst} 
            onChange={e => setBurst(e.target.value)}
            className="font-mono bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label>Priority</Label>
          <Input 
            type="number" 
            value={priority} 
            onChange={e => setPriority(e.target.value)}
            className="font-mono bg-card"
          />
        </div>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button type="submit" className="w-full">Add Process</Button>
    </form>
  );
}
