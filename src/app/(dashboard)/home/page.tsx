import { redirect } from "next/navigation";
import { getMachineId } from "@/shared/utils/machine";
import { getSettings } from "@/lib/localDb";
import HomePageClient from "../dashboard/HomePageClient";
import BootstrapBanner from "../dashboard/BootstrapBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let settings: any = { setupComplete: true };
  try {
    settings = await getSettings();
  } catch (err) {
    console.warn("[OmniRoute Home] Failed to load settings:", err);
  }

  if (settings && settings.setupComplete === false) {
    redirect("/dashboard/onboarding");
  }

  let machineId = "server-instance";
  try {
    machineId = await getMachineId();
  } catch (err) {
    console.warn("[OmniRoute Home] Failed to get machineId:", err);
  }

  const isBootstrapped = process.env.OMNIROUTE_BOOTSTRAPPED === "true";
  return (
    <>
      {isBootstrapped && <BootstrapBanner />}
      <HomePageClient machineId={machineId} />
    </>
  );
}
