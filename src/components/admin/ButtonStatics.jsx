import React from "react";

const stats = [
  {
    title: "Views",
    value: "7,265",
    percentage: "+11.01%",
  },
  {
    title: "Visits",
    value: "3,671",
    percentage: "-0.3%",
  },
  {
    title: "New Users",
    value: "156",
    percentage: "+15.03%",
  },
  {
    title: "Active Users",
    value: "2,318",
    percentage: "+6.08%",
  },
];

export default function ButtonStatics() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 rounded-xl shadow bg-lime-400 text-black font-semibold flex flex-col items-center justify-center"
        >
          <p>{stat.title}</p>
          <p className="text-xl font-bold">{stat.value}</p>
          <p>{stat.percentage}</p>
        </div>
      ))}
    </div>
  );
}
