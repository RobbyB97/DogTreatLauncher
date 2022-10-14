import Header from "@components/Header";
import GPIOController from "@components/GPIO/Controller";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <GPIOController />
    </div>
  );
};

export default Dashboard;
