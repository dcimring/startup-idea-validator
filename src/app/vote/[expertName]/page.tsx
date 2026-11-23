import ExpertVotePage from "./ExpertVotePage";

// One placeholder page; public/_redirects serves it for every /vote/<name>.
export function generateStaticParams() {
  return [{ expertName: "_" }];
}

export default function Page() {
  return <ExpertVotePage />;
}
