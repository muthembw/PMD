import React from "react";
import ReportCard from "../components/ReportCard";
import { Box, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const Report = () => {
  const metrics = [
    { title: "Total Products", value: 120, icon: <Box /> },
    { title: "Total Orders", value: 305, icon: <ShoppingCart /> },
    { title: "Revenue", value: "$12,430", icon: <DollarSign /> },
    { title: "Growth", value: "8.2%", icon: <TrendingUp /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Grid layout for metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((card) => (
          <ReportCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Report;
