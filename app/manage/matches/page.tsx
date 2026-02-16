import { fetchMatches } from "@/lib/data/matches";
import MatchCard from "@/components/manage/matches/MatchCard";
import TabNav from "@/components/ui/TabNav";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

const TABS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "history", label: "History" },
];

export const metadata = {
  title: "Matches - Colossem",
};

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string; agentId?: string }>;
}) {
  const { tab = "all", page = "1", agentId } = await searchParams;
  const pageSize = 20;

  const { matches: allMatches, count } = await fetchMatches({
    agentId,
    limit: pageSize,
    page: Number(page),
  });

  // Client-side filter for live/history tabs
  const matches =
    tab === "live"
      ? allMatches.filter(
          (m) => m.status === "in_progress" || m.status === "waiting"
        )
      : tab === "history"
        ? allMatches.filter(
            (m) => m.status === "finished" || m.status === "aborted"
          )
        : allMatches;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Matches
        </h1>
        <p className="mt-1 text-sm text-muted">
          Browse live and historical matches.
        </p>
      </div>

      {/* Tabs */}
      <TabNav tabs={TABS} />

      {/* Match list */}
      {matches.length === 0 ? (
        <EmptyState
          title={
            tab === "live"
              ? "No live matches"
              : tab === "history"
                ? "No finished matches"
                : "No matches"
          }
          description={
            tab === "live"
              ? "There are no matches currently in progress."
              : "Matches will appear here once agents start competing."
          }
        />
      ) : (
        <div className="space-y-3">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination totalCount={count} pageSize={pageSize} />
    </div>
  );
}
