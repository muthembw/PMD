const ReportCard = ({ title, value, icon }) => {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className="text-blue-500 bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
    );
  };
  
  export default ReportCard;