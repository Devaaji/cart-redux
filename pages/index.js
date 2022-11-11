import { Text, useColorMode } from "@chakra-ui/react";
import CardComponentItem from "../Components/Card";
import DashboardLayout from "../Components/Dashboard/DashboradLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <CardComponentItem />
    </DashboardLayout>
  );
}
