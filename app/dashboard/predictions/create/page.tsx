import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PredictionFormCreate } from "@/components/dashboard/predictions/prediction-form-create";

export default function CreatePredictionPage() {
  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="h-9 w-9 rounded-xl"
        >
          <Link href="/dashboard/predictions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Prediction</h1>
          <p className="text-sm text-muted-foreground">
            Run the machine learning model for a specific customer.
          </p>
        </div>
      </div>

      <PredictionFormCreate />
    </div>
  );
}
