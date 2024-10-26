import { Metadata } from "next";
import NFLTeamLeadersChart from "../components/teamLeaders";

export const metadata: Metadata = {
  title: "NFL Team Leaders | Statistical Analysis",
  description:
    "Explore the top NFL team leaders across various statistical categories. Interactive charts and up-to-date data for football enthusiasts.",
  keywords: "NFL, football, statistics, team leaders, data visualization",
  openGraph: {
    title: "NFL Team Leaders | Statistical Analysis",
    description:
      "Explore the top NFL team leaders across various statistical categories. Interactive charts and up-to-date data for football enthusiasts.",
    type: "website",
    url: "https://your-website-url.com/nfl-team-leaders",
    images: [
      {
        url: "https://your-website-url.com/images/nfl-team-leaders-og.jpg",
        width: 1200,
        height: 630,
        alt: "NFL Team Leaders Chart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFL Team Leaders | Statistical Analysis",
    description:
      "Explore the top NFL team leaders across various statistical categories. Interactive charts and up-to-date data for football enthusiasts.",
    images: [
      "https://your-website-url.com/images/nfl-team-leaders-twitter.jpg",
    ],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">NFL Team Leaders</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Explore statistical leaders across various categories.
      </p>
      <NFLTeamLeadersChart />
    </div>
  );
}
