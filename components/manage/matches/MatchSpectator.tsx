"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

interface WsLogEntry {
  timestamp: string;
  direction: "in" | "out" | "system";
  data: string;
}

export default function MatchSpectator({
  wsUrl,
  matchId,
}: {
  wsUrl: string;
  matchId: string;
}) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [log, setLog] = useState<WsLogEntry[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const addLog = useCallback(
    (direction: WsLogEntry["direction"], data: string) => {
      setLog((prev) => [
        ...prev,
        { timestamp: new Date().toISOString(), direction, data },
      ]);
    },
    []
  );

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    setStatus("connecting");
    addLog("system", `Connecting to spectate match ${matchId}...`);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      addLog("system", "Connected.");
    };

    ws.onmessage = (event) => {
      let pretty: string;
      try {
        pretty = JSON.stringify(JSON.parse(event.data), null, 2);
      } catch {
        pretty = event.data;
      }
      addLog("in", pretty);
    };

    ws.onerror = () => {
      setStatus("error");
      addLog("system", "WebSocket error.");
    };

    ws.onclose = (event) => {
      setStatus("disconnected");
      addLog(
        "system",
        `Disconnected (code: ${event.code}, reason: ${event.reason || "none"}).`
      );
      wsRef.current = null;
    };
  }, [wsUrl, matchId, addLog]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (autoScroll) {
      logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [log, autoScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const statusColors: Record<ConnectionStatus, string> = {
    connecting: "text-gold",
    connected: "text-green-400",
    disconnected: "text-muted",
    error: "text-crimson",
  };

  const directionColors: Record<WsLogEntry["direction"], string> = {
    in: "text-cyan",
    out: "text-gold",
    system: "text-muted",
  };

  const directionLabels: Record<WsLogEntry["direction"], string> = {
    in: "RECV",
    out: "SEND",
    system: "SYS ",
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              status === "connected"
                ? "bg-green-400 animate-live-dot"
                : status === "connecting"
                  ? "bg-gold animate-glow-pulse"
                  : status === "error"
                    ? "bg-crimson"
                    : "bg-muted"
            }`}
          />
          <span className={`text-sm font-medium uppercase ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="accent-crimson"
            />
            Auto-scroll
          </label>
          {status === "disconnected" || status === "error" ? (
            <button
              type="button"
              onClick={connect}
              className="rounded-md bg-cyan/10 border border-cyan/30 px-4 py-1.5 text-xs font-semibold text-cyan transition-colors hover:bg-cyan/20"
            >
              Connect
            </button>
          ) : (
            <button
              type="button"
              onClick={disconnect}
              className="rounded-md border border-crimson/30 px-4 py-1.5 text-xs font-semibold text-crimson transition-colors hover:bg-crimson/10"
            >
              Disconnect
            </button>
          )}
          <button
            type="button"
            onClick={() => setLog([])}
            className="rounded-md border border-border px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Log */}
      <div className="h-[400px] overflow-y-auto rounded-lg border border-border bg-background p-4 font-mono text-xs">
        {log.length === 0 ? (
          <p className="text-muted">
            No messages yet. Click Connect to start spectating.
          </p>
        ) : (
          log.map((entry, i) => (
            <div key={i} className="mb-2 whitespace-pre-wrap">
              <span className="text-muted">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>{" "}
              <span className={`font-bold ${directionColors[entry.direction]}`}>
                [{directionLabels[entry.direction]}]
              </span>{" "}
              <span className="text-foreground/80">{entry.data}</span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
