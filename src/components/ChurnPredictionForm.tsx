import { useState } from "react";
import { ChurnFormData, defaultFormData, predictChurn, PredictionResult } from "@/lib/churnPredictor";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, ShieldAlert, BarChart3 } from "lucide-react";

const STREAMING_OPTIONS = ["Netflix", "Hotstar", "Disney+", "Prime Video", "YouTube Premium", "ESPN+"];
const DEVICE_OPTIONS = ["Mobile", "Desktop", "TV"];

const ChurnPredictionForm = () => {
  const [form, setForm] = useState<ChurnFormData>(defaultFormData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateField = <K extends keyof ChurnFormData>(key: K, value: ChurnFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: "streamingServices" | "deviceUsage", item: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter((i) => i !== item)
        : [...prev[key], item],
    }));
  };

  const validate = (): boolean => {
    if (form.age < 1 || form.age > 120) {
      toast({ title: "Invalid Age", description: "Age must be between 1 and 120.", variant: "destructive" });
      return false;
    }
    if (form.tenure < 0) {
      toast({ title: "Invalid Tenure", description: "Tenure cannot be negative.", variant: "destructive" });
      return false;
    }
    if (form.monthlyCharges < 0) {
      toast({ title: "Invalid Monthly Charges", description: "Monthly charges cannot be negative.", variant: "destructive" });
      return false;
    }
    if (form.totalCharges < 0) {
      toast({ title: "Invalid Total Charges", description: "Total charges cannot be negative.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setResult(null);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 1500));

    const prediction = predictChurn(form);
    setResult(prediction);
    setLoading(false);
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-4">
          <BarChart3 className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs uppercase tracking-[0.2em] text-neon-cyan font-display">AI Powered</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold neon-text-cyan mb-3">
          Customer Churn Predictor
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Predict whether a customer will churn or stay. Fill in the details below to get an AI-powered prediction with confidence score.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Demographics */}
        <SectionCard title="Demographics" color="cyan">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SelectField label="Gender" value={form.gender} onChange={(v) => updateField("gender", v)} options={["Male", "Female"]} />
            <SelectField label="Senior Citizen" value={form.seniorCitizen} onChange={(v) => updateField("seniorCitizen", v)} options={["Yes", "No"]} />
            <SelectField label="Partner" value={form.partner} onChange={(v) => updateField("partner", v)} options={["Yes", "No"]} />
            <SelectField label="Dependents" value={form.dependents} onChange={(v) => updateField("dependents", v)} options={["Yes", "No"]} />
            <NumberField label="Age" value={form.age} onChange={(v) => updateField("age", v)} min={1} max={120} />
          </div>
        </SectionCard>

        {/* Account / Subscription */}
        <SectionCard title="Account / Subscription" color="magenta">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <NumberField label="Tenure (months)" value={form.tenure} onChange={(v) => updateField("tenure", v)} min={0} />
            <SelectField label="Contract Type" value={form.contractType} onChange={(v) => updateField("contractType", v)} options={["Month-to-Month", "One Year", "Two Year"]} />
            <SelectField label="Payment Method" value={form.paymentMethod} onChange={(v) => updateField("paymentMethod", v)} options={["Credit Card", "Bank Transfer", "PayPal", "Others"]} />
            <SelectField label="Paperless Billing" value={form.paperlessBilling} onChange={(v) => updateField("paperlessBilling", v)} options={["Yes", "No"]} />
            <SelectField label="Multiple Services" value={form.multipleServices} onChange={(v) => updateField("multipleServices", v)} options={["Yes", "No"]} />
          </div>
          <div className="mt-5">
            <CheckboxGroup label="Streaming Services Used" items={STREAMING_OPTIONS} selected={form.streamingServices} onToggle={(item) => toggleArrayItem("streamingServices", item)} />
          </div>
        </SectionCard>

        {/* Usage / Interaction */}
        <SectionCard title="Usage / Interaction" color="purple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NumberField label="Monthly Charges (₹)" value={form.monthlyCharges} onChange={(v) => updateField("monthlyCharges", v)} min={0} step={0.01} />
            <NumberField label="Total Charges (₹)" value={form.totalCharges} onChange={(v) => updateField("totalCharges", v)} min={0} step={0.01} />
            <NumberField label="Complaints / Support Calls" value={form.complaints} onChange={(v) => updateField("complaints", v)} min={0} />
            <NumberField label="Last Activity (days ago)" value={form.lastActivity} onChange={(v) => updateField("lastActivity", v)} min={0} />
          </div>
        </SectionCard>

        {/* Services / Products */}
        <SectionCard title="Services / Products" color="cyan">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SelectField label="Internet Service Type" value={form.internetService} onChange={(v) => updateField("internetService", v)} options={["DSL", "Fiber", "None"]} />
            <SelectField label="Add-on Services" value={form.addOnServices} onChange={(v) => updateField("addOnServices", v)} options={["Yes", "No"]} />
            <SelectField label="Plan Tier" value={form.planTier} onChange={(v) => updateField("planTier", v)} options={["Basic", "Standard", "Premium"]} />
          </div>
          <div className="mt-5">
            <CheckboxGroup label="Device Usage" items={DEVICE_OPTIONS} selected={form.deviceUsage} onToggle={(item) => toggleArrayItem("deviceUsage", item)} />
          </div>
        </SectionCard>

        {/* Behavioral / Payment */}
        <SectionCard title="Behavioral / Payment" color="magenta">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <NumberField label="Late Payments" value={form.latePayments} onChange={(v) => updateField("latePayments", v)} min={0} />
            <SelectField label="Auto-Pay Enabled" value={form.autoPayEnabled} onChange={(v) => updateField("autoPayEnabled", v)} options={["Yes", "No"]} />
            <NumberField label="Promotions Used" value={form.promotionsUsed} onChange={(v) => updateField("promotionsUsed", v)} min={0} />
            <SelectField label="Referral Source" value={form.referralSource} onChange={(v) => updateField("referralSource", v)} options={["Ad", "Referral", "Direct", "Others"]} />
          </div>
        </SectionCard>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="group relative px-12 py-4 rounded-xl font-display text-sm uppercase tracking-[0.2em] 
            bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta text-primary-foreground font-bold
            transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100
            animate-pulse-glow"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </span>
            ) : (
              "Predict Churn"
            )}
          </button>
        </div>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`glass-card p-8 text-center ${
            result.riskLevel === "High Risk" 
              ? "border-destructive/50" 
              : result.riskLevel === "Medium Risk"
              ? "border-yellow-500/50"
              : "border-neon-green/50"
          }`}
          style={{
            boxShadow: result.riskLevel === "High Risk"
              ? "0 0 30px hsl(0 85% 55% / 0.3), inset 0 0 20px hsl(0 85% 55% / 0.1)"
              : result.riskLevel === "Medium Risk"
              ? "0 0 30px hsl(45 100% 50% / 0.3), inset 0 0 20px hsl(45 100% 50% / 0.1)"
              : "0 0 30px hsl(150 100% 50% / 0.3), inset 0 0 20px hsl(150 100% 50% / 0.1)"
          }}>
            <div className="flex justify-center mb-4">
              {result.riskLevel === "High Risk" ? (
                <ShieldAlert className="w-16 h-16 text-destructive" />
              ) : result.riskLevel === "Medium Risk" ? (
                <BarChart3 className="w-16 h-16 text-yellow-400" />
              ) : (
                <ShieldCheck className="w-16 h-16 text-neon-green" />
              )}
            </div>
            <h2 className="text-2xl font-display font-bold mb-2" style={{
              color: result.riskLevel === "High Risk" ? "hsl(0 85% 55%)" 
                : result.riskLevel === "Medium Risk" ? "hsl(45 100% 50%)" 
                : "hsl(150 100% 50%)",
              textShadow: `0 0 20px ${
                result.riskLevel === "High Risk" ? "hsl(0 85% 55% / 0.5)" 
                : result.riskLevel === "Medium Risk" ? "hsl(45 100% 50% / 0.5)" 
                : "hsl(150 100% 50% / 0.5)"
              }`
            }}>
              {result.riskLevel === "High Risk" ? "⚠ High Churn Risk" 
                : result.riskLevel === "Medium Risk" ? "⚡ Medium Risk – Monitor Closely"
                : "✅ Customer Likely to Stay"}
            </h2>
            <p className="text-muted-foreground mb-2">
              Prediction: <span className="font-bold text-foreground">{result.prediction === "Yes" ? "Will Churn" : "Will Stay"}</span>
            </p>
            <p className="text-muted-foreground mb-4">
              Risk Level: <span className="font-bold text-foreground">{result.riskLevel}</span>
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card">
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <span className="text-2xl font-display font-bold neon-text-cyan">{result.probability}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components ---

const SectionCard = ({ title, color, children }: { title: string; color: "cyan" | "magenta" | "purple"; children: React.ReactNode }) => {
  const colorMap = {
    cyan: "neon-text-cyan",
    magenta: "neon-text-magenta",
    purple: "text-neon-purple",
  };
  return (
    <div className="glass-card p-6">
      <h3 className={`text-sm font-display font-semibold uppercase tracking-[0.15em] mb-5 ${colorMap[color]}`}>
        {title}
      </h3>
      {children}
    </div>
  );
};

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <label className="neon-label">{label}</label>
    <select className="neon-select" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const NumberField = ({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) => (
  <div>
    <label className="neon-label">{label}</label>
    <input
      type="number"
      className="neon-input"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
    />
  </div>
);

const CheckboxGroup = ({ label, items, selected, onToggle }: { label: string; items: string[]; selected: string[]; onToggle: (item: string) => void }) => (
  <div>
    <label className="neon-label">{label}</label>
    <div className="flex flex-wrap gap-3 mt-2">
      {items.map((item) => (
        <label
          key={item}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 border ${
            selected.includes(item)
              ? "border-primary bg-primary/10"
              : "border-glass-border bg-input hover:border-primary/40"
          }`}
        >
          <input
            type="checkbox"
            className="neon-checkbox"
            checked={selected.includes(item)}
            onChange={() => onToggle(item)}
          />
          <span className="text-sm">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

export default ChurnPredictionForm;
