// ── Auth & User ──

export interface User {
  id: string;
  username: string;
  email: string;
  agentCount: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OAuthInitiateResponse {
  authUrl: string;
}

export interface AppError {
  code: string;
  message: string;
  status: number;
}

// ── Agents ──

export type AgentStatus = "inactive" | "active" | "suspended";

export interface Rating {
  agentId: string;
  gameType: string;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  status: AgentStatus;
  gameTypes: string[];
  ratings: Rating[];
  createdAt: string;
}

export interface ListAgentsResponse {
  agents: Agent[];
  count: number;
}

export interface CreateAgentInput {
  name: string;
  description: string;
  gameTypes: string[];
}

export interface UpdateAgentInput {
  name?: string;
  description?: string;
  gameTypes?: string[];
  status?: AgentStatus;
}

// ── Matches ──

export type MatchStatus = "waiting" | "in_progress" | "finished" | "aborted";
export type MatchMode = "ranked" | "unranked" | "challenge";

export interface MatchPlayer {
  agentId: string;
  agentName: string;
  ownerName: string;
  role: string;
}

export interface MatchMove {
  agentId: string;
  role: string;
  turnNumber: number;
  moveData: number[];
  thinkTime: number;
  createdAt: string;
}

export interface RatingChange {
  agentId: string;
  gameType: string;
  oldElo: number;
  newElo: number;
  change: number;
}

export interface MatchResult {
  finished: boolean;
  winnerRole: string;
  reason: string;
  ratingChanges: RatingChange[];
  ratingNote: string;
  details: unknown;
}

export interface Match {
  id: string;
  gameType: string;
  mode: MatchMode;
  status: MatchStatus;
  players: MatchPlayer[];
  moves: MatchMove[];
  state: number[];
  result: MatchResult | null;
  createdAt: string;
  startedAt: string;
  finishedAt: string;
}

export interface ListMatchesResponse {
  matches: Match[];
  count: number;
}

export interface CreateMatchInput {
  agentId: string;
  opponentAgentId: string;
  gameType: string;
  mode: MatchMode;
}

// ── Leaderboard ──

export interface LeaderboardEntry {
  rank: number;
  agentId: string;
  agentName: string;
  owner: string;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
}

export interface LeaderboardResponse {
  gameType: string;
  rankings: LeaderboardEntry[];
}

// ── WebSocket Messages ──

export interface OpponentInfo {
  agentId: string;
  name: string;
  elo: number;
}

export interface WSMoveRequest {
  type: "move_request";
  schemaVersion: number;
  requestId: string;
  matchId: string;
  gameType: string;
  turnNumber: number;
  yourRole: string;
  opponent: OpponentInfo;
  state: unknown;
  validMoves: unknown[];
  timeoutMs: number;
}

export interface WSMoveResponse {
  type: "move_response";
  requestId: string;
  move: unknown;
}

export interface WSPing {
  type: "ping";
  requestId: string;
}

export interface WSPong {
  type: "pong";
  requestId: string;
}

export type WSMessage = WSMoveRequest | WSMoveResponse | WSPing | WSPong;
