"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TeamLeader = {
  name: string;
  value: number;
  team: string; // This now represents the short team name instead of the abbreviation
};

type Category = {
  name: string;
  displayName: string;
  leaders: TeamLeader[];
};

const teamColors: { [key: string]: string } = {
  Cardinals: "#97233F",
  Falcons: "#A71930",
  Ravens: "#241773",
  Bills: "#00338D",
  Panthers: "#0085CA",
  Bears: "#C83803",
  Bengals: "#FB4F14",
  Browns: "#311D00",
  Cowboys: "#003594",
  Broncos: "#FB4F14",
  Lions: "#0076B6",
  Packers: "#203731",
  Texans: "#03202F",
  Colts: "#002C5F",
  Jaguars: "#006778",
  Chiefs: "#E31837",
  Chargers: "#0080C6",
  Rams: "#003594",
  Raiders: "#000000",
  Dolphins: "#008E97",
  Vikings: "#4F2683",
  Patriots: "#002244",
  Saints: "#D3BC8D",
  Giants: "#0B2265",
  Jets: "#125740",
  Eagles: "#004C54",
  Steelers: "#FFB612",
  Seahawks: "#002244",
  "49ers": "#AA0000",
  Buccaneers: "#D50A0A",
  Titans: "#0C2340",
  Commanders: "#773141",
};

export default function NFLTeamLeadersChart() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://site.web.api.espn.com/apis/site/v3/sports/football/nfl/teamleaders"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.teamLeaders && data.teamLeaders.categories) {
          const processedCategories = data.teamLeaders.categories.map(
            (
              category: any
            ): { name: string; displayName: string; leaders: string } => ({
              name: category.name,
              displayName: category.displayName,
              leaders: category.leaders.slice(0, 5).map((leader: any) => ({
                name: leader.team.displayName,
                value: leader.value,
                team: leader.team.nickname, // Use the full team name instead of the abbreviation
              })),
            })
          );
          setCategories(processedCategories);
          setSelectedCategory(processedCategories[0].name);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const selectedCategoryData = categories.find(
    (cat) => cat.name === selectedCategory
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-md shadow-md p-4">
          <strong>{data.value}</strong>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Team Stats</CardTitle>
        <CardDescription>Top 5 Teams in selected category</CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategoryData && (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={selectedCategoryData.leaders}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="value"
                  name={selectedCategoryData.displayName}
                  shape={function (props: {
                    x: number;
                    y: number;
                    width: number;
                    height: number;
                    value: number;
                    team: string;
                  }): React.JSX.Element {
                    const { x, y, width, height, value, team } = props;
                    // console.log(
                    //   `Rendering bar for ${team} with color ${teamColors[team]}`
                    // );
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={teamColors[team] || "#000000"}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
