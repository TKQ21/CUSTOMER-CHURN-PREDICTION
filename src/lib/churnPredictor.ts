export interface ChurnFormData {
  // Demographics
  gender: string;
  seniorCitizen: string;
  partner: string;
  dependents: string;
  age: number;

  // Account
  tenure: number;
  contractType: string;
  paymentMethod: string;
  paperlessBilling: string;
  multipleServices: string;
  streamingServices: string[];

  // Usage
  monthlyCharges: number;
  totalCharges: number;
  complaints: number;
  lastActivity: number;

  // Services
  internetService: string;
  addOnServices: string;
  deviceUsage: string[];
  planTier: string;

  // Behavioral
  latePayments: number;
  autoPayEnabled: string;
  promotionsUsed: number;
  referralSource: string;
}

export const defaultFormData: ChurnFormData = {
  gender: "Male",
  seniorCitizen: "No",
  partner: "No",
  dependents: "No",
  age: 30,
  tenure: 12,
  contractType: "Month-to-Month",
  paymentMethod: "Credit Card",
  paperlessBilling: "No",
  multipleServices: "No",
  streamingServices: [],
  monthlyCharges: 50,
  totalCharges: 600,
  complaints: 0,
  lastActivity: 1,
  internetService: "Fiber",
  addOnServices: "No",
  deviceUsage: [],
  planTier: "Basic",
  latePayments: 0,
  autoPayEnabled: "No",
  promotionsUsed: 0,
  referralSource: "Direct",
};

export interface PredictionResult {
  prediction: "Yes" | "No";
  probability: number;
}

/**
 * Client-side churn prediction using weighted scoring.
 * Mimics a trained ML model's behavior based on known churn factors.
 */
export function predictChurn(data: ChurnFormData): PredictionResult {
  let churnScore = 0;

  // Contract type is the strongest predictor
  if (data.contractType === "Month-to-Month") churnScore += 25;
  else if (data.contractType === "One Year") churnScore += 10;
  else churnScore += 2;

  // Tenure - shorter tenure = higher churn risk
  if (data.tenure < 6) churnScore += 20;
  else if (data.tenure < 12) churnScore += 12;
  else if (data.tenure < 24) churnScore += 6;
  else churnScore += 1;

  // Monthly charges - higher = more likely to churn
  if (data.monthlyCharges > 80) churnScore += 15;
  else if (data.monthlyCharges > 50) churnScore += 8;
  else churnScore += 2;

  // Complaints
  if (data.complaints > 3) churnScore += 18;
  else if (data.complaints > 1) churnScore += 10;
  else if (data.complaints > 0) churnScore += 5;

  // Late payments
  if (data.latePayments > 3) churnScore += 12;
  else if (data.latePayments > 1) churnScore += 6;

  // Last activity (days ago)
  if (data.lastActivity > 30) churnScore += 15;
  else if (data.lastActivity > 14) churnScore += 8;
  else if (data.lastActivity > 7) churnScore += 3;

  // No auto-pay
  if (data.autoPayEnabled === "No") churnScore += 5;

  // Paperless billing (tends to correlate with churn)
  if (data.paperlessBilling === "Yes") churnScore += 3;

  // Internet service
  if (data.internetService === "Fiber") churnScore += 5;
  else if (data.internetService === "None") churnScore -= 3;

  // Senior citizen
  if (data.seniorCitizen === "Yes") churnScore += 4;

  // No partner/dependents
  if (data.partner === "No") churnScore += 3;
  if (data.dependents === "No") churnScore += 2;

  // Fewer streaming services = less engaged
  if (data.streamingServices.length === 0) churnScore += 4;
  else if (data.streamingServices.length >= 3) churnScore -= 3;

  // Promotions used (more = less likely to churn)
  if (data.promotionsUsed === 0) churnScore += 4;
  else if (data.promotionsUsed >= 3) churnScore -= 3;

  // Plan tier
  if (data.planTier === "Basic") churnScore += 5;
  else if (data.planTier === "Premium") churnScore -= 3;

  // Multiple services
  if (data.multipleServices === "Yes") churnScore -= 3;

  // Device usage diversity
  if (data.deviceUsage.length >= 2) churnScore -= 2;

  // Add-on services
  if (data.addOnServices === "Yes") churnScore -= 3;

  // Normalize to 0-100
  const maxScore = 130;
  const normalizedScore = Math.max(0, Math.min(100, (churnScore / maxScore) * 100));

  // Add some variance to make it feel realistic
  const variance = (Math.random() - 0.5) * 6;
  const finalScore = Math.max(2, Math.min(98, normalizedScore + variance));

  const prediction = finalScore > 50 ? "Yes" : "No";
  const probability = prediction === "Yes" ? finalScore : 100 - finalScore;

  return {
    prediction,
    probability: Math.round(probability * 100) / 100,
  };
}
