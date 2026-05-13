export interface Process {
  pid: string;
  arrival: number;
  burst: number;
  priority: number;
  remaining: number;
  startTime: number;
  finishTime: number;
  waitingTime: number;
  turnaroundTime: number;
  responseTime: number;
}

export type GanttSegment = { pid: string; start: number; end: number; };

export interface SimResult {
  gantt: GanttSegment[];
  processes: Process[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
}

export function simulateSRTF(processes: Process[]): SimResult {
  let time = 0;
  let completed = 0;
  const n = processes.length;
  let readyQueue: Process[] = [];
  let gantt: GanttSegment[] = [];
  
  let procs = processes.map(p => ({ ...p, remaining: p.burst, startTime: -1, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: -1 }));
  
  let lastProcess: Process | null = null;
  let startTime = 0;

  while (completed < n) {
    procs.filter(p => p.arrival <= time && p.remaining > 0 && !readyQueue.find(rq => rq.pid === p.pid)).forEach(p => readyQueue.push(p));
    
    if (readyQueue.length > 0) {
      readyQueue.sort((a, b) => {
        if (a.remaining !== b.remaining) return a.remaining - b.remaining;
        return a.arrival - b.arrival;
      });
      let current = readyQueue[0];
      
      if (current.responseTime === -1) {
        current.responseTime = time - current.arrival;
      }
      
      if (lastProcess && lastProcess.pid !== current.pid) {
        gantt.push({ pid: lastProcess.pid, start: startTime, end: time });
        startTime = time;
      }
      if (!lastProcess || lastProcess.pid !== current.pid) {
        startTime = time;
      }
      lastProcess = current;
      
      current.remaining -= 1;
      time += 1;
      
      if (current.remaining === 0) {
        current.finishTime = time;
        current.turnaroundTime = current.finishTime - current.arrival;
        current.waitingTime = current.turnaroundTime - current.burst;
        readyQueue = readyQueue.filter(p => p.pid !== current.pid);
        completed++;
      }
    } else {
      if (lastProcess !== null) {
        gantt.push({ pid: lastProcess.pid, start: startTime, end: time });
        lastProcess = null;
      }
      time += 1;
    }
  }
  
  if (lastProcess !== null && gantt[gantt.length - 1]?.end !== time) {
    gantt.push({ pid: lastProcess.pid, start: startTime, end: time });
  }

  let finalGantt: GanttSegment[] = [];
  for (let seg of gantt) {
    if (finalGantt.length > 0 && finalGantt[finalGantt.length - 1].pid === seg.pid && finalGantt[finalGantt.length - 1].end === seg.start) {
      finalGantt[finalGantt.length - 1].end = seg.end;
    } else {
      finalGantt.push({ ...seg });
    }
  }

  const avgWaitingTime = procs.reduce((acc, p) => acc + p.waitingTime, 0) / (n || 1);
  const avgTurnaroundTime = procs.reduce((acc, p) => acc + p.turnaroundTime, 0) / (n || 1);
  const avgResponseTime = procs.reduce((acc, p) => acc + p.responseTime, 0) / (n || 1);

  return { gantt: finalGantt, processes: procs, avgWaitingTime, avgTurnaroundTime, avgResponseTime };
}

export function simulateRR(processes: Process[], quantum: number): SimResult {
  let time = 0;
  let completed = 0;
  const n = processes.length;
  let readyQueue: Process[] = [];
  let gantt: GanttSegment[] = [];
  
  let procs = processes.map(p => ({ ...p, remaining: p.burst, startTime: -1, finishTime: 0, waitingTime: 0, turnaroundTime: 0, responseTime: -1 }));
  procs.sort((a, b) => a.arrival - b.arrival);
  
  let lastProcess: Process | null = null;
  let startTime = 0;

  const enqueueNew = (t: number, exclude: string[] = []) => {
    procs.filter(p => p.arrival <= t && p.remaining > 0 && !exclude.includes(p.pid) && !readyQueue.find(rq => rq.pid === p.pid)).forEach(p => readyQueue.push(p));
  };

  enqueueNew(time);

  while (completed < n) {
    if (readyQueue.length > 0) {
      let current = readyQueue.shift()!;
      
      if (current.responseTime === -1) {
        current.responseTime = time - current.arrival;
      }
      
      if (lastProcess && lastProcess.pid !== current.pid) {
        gantt.push({ pid: lastProcess.pid, start: startTime, end: time });
        startTime = time;
      }
      if (!lastProcess || lastProcess.pid !== current.pid) {
        startTime = time;
      }
      lastProcess = current;
      
      const execTime = Math.min(quantum, current.remaining);
      time += execTime;
      current.remaining -= execTime;
      
      enqueueNew(time, [current.pid]);
      
      if (current.remaining > 0) {
        readyQueue.push(current);
      } else {
        current.finishTime = time;
        current.turnaroundTime = current.finishTime - current.arrival;
        current.waitingTime = current.turnaroundTime - current.burst;
        completed++;
      }
    } else {
      if (lastProcess !== null) {
        gantt.push({ pid: lastProcess.pid, start: startTime, end: time });
        lastProcess = null;
      }
      time += 1;
      enqueueNew(time);
    }
  }
  
  if (lastProcess !== null) {
    gantt.push({ pid: lastProcess.pid, start: startTime, end: time });
  }

  let finalGantt: GanttSegment[] = [];
  for (let seg of gantt) {
    if (finalGantt.length > 0 && finalGantt[finalGantt.length - 1].pid === seg.pid && finalGantt[finalGantt.length - 1].end === seg.start) {
      finalGantt[finalGantt.length - 1].end = seg.end;
    } else {
      finalGantt.push({ ...seg });
    }
  }

  const avgWaitingTime = procs.reduce((acc, p) => acc + p.waitingTime, 0) / (n || 1);
  const avgTurnaroundTime = procs.reduce((acc, p) => acc + p.turnaroundTime, 0) / (n || 1);
  const avgResponseTime = procs.reduce((acc, p) => acc + p.responseTime, 0) / (n || 1);

  return { gantt: finalGantt, processes: procs, avgWaitingTime, avgTurnaroundTime, avgResponseTime };
}