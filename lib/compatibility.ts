import type {
  AmbitionLevel,
  CoFounderProfile,
  Commitment,
  DecisionStyle,
  FounderProfile,
  RiskAppetite,
  Skill,
  Stage,
  WorkSpeed,
} from "@prisma/client";

interface CompatibilityBreakdown {
  totalScore: number;
  skillScore: number;
  stageScore: number;
  commitmentScore: number;
  riskScore: number;
  workStyleScore: number;
  decisionScore: number;
  ambitionScore: number;
}

export function calculateCompatibility(
  founderProfile: FounderProfile,
  coFounderProfile: CoFounderProfile,
): CompatibilityBreakdown {
  const skillScore = calculateSkillScore(
    founderProfile.lookingForSkill,
    coFounderProfile.primarySkill,
    coFounderProfile.secondarySkill,
  );

  const stageScore = calculateStageScore(
    founderProfile.stage,
    coFounderProfile.preferredStage,
  );

  const commitmentScore = calculateCommitmentScore(
    founderProfile.commitmentRequired,
    coFounderProfile.availability,
  );

  const riskScore = calculateRiskScore(
    founderProfile.riskAppetite,
    coFounderProfile.riskAppetite,
  );

  const workStyleScore = calculateWorkSpeedScore(
    founderProfile.workSpeed,
    coFounderProfile.workSpeed,
  );

  const decisionScore = calculateDecisionScore(
    founderProfile.decisionStyle,
    coFounderProfile.decisionStyle,
  );

  const ambitionScore = calculateAmbitionScore(
    founderProfile.ambitionLevel,
    coFounderProfile.ambitionLevel,
  );

  const totalScore =
    skillScore +
    stageScore +
    commitmentScore +
    riskScore +
    workStyleScore +
    decisionScore +
    ambitionScore;

  return {
    totalScore,
    skillScore,
    stageScore,
    commitmentScore,
    riskScore,
    workStyleScore,
    decisionScore,
    ambitionScore,
  };
}

function calculateSkillScore(
  lookingFor: Skill,
  primary: Skill,
  secondary: Skill | null,
): number {
  if (lookingFor === primary) return 30;
  if (secondary && lookingFor === secondary) return 20;
  return 0;
}

function calculateStageScore(
  founderStage: Stage,
  cofounderStage: Stage,
): number {
  if (founderStage === cofounderStage) return 20;

  const stageOrder: Record<Stage, number> = {
    IDEA: 1,
    MVP: 2,
    TRACTION: 3,
  };

  const diff = Math.abs(stageOrder[founderStage] - stageOrder[cofounderStage]);
  if (diff === 1) return 10;

  return 0;
}

function calculateCommitmentScore(
  required: Commitment,
  available: Commitment,
): number {
  if (required === available) return 15;
  return 5;
}

function calculateRiskScore(
  founderRisk: RiskAppetite,
  cofounderRisk: RiskAppetite,
): number {
  if (founderRisk === cofounderRisk) return 10;
  if (founderRisk === "BALANCED" || cofounderRisk === "BALANCED") return 5;

  const isPolarOpposite =
    (founderRisk === "CONSERVATIVE" && cofounderRisk === "AGGRESSIVE") ||
    (founderRisk === "AGGRESSIVE" && cofounderRisk === "CONSERVATIVE");

  return isPolarOpposite ? 0 : 5;
}

function calculateWorkSpeedScore(
  founderSpeed: WorkSpeed,
  cofounderSpeed: WorkSpeed,
): number {
  return founderSpeed === cofounderSpeed ? 10 : 0;
}

function calculateDecisionScore(
  founderStyle: DecisionStyle,
  cofounderStyle: DecisionStyle,
): number {
  if (founderStyle === cofounderStyle) return 10;
  return 5;
}

function calculateAmbitionScore(
  founderAmbition: AmbitionLevel,
  cofounderAmbition: AmbitionLevel,
): number {
  return founderAmbition === cofounderAmbition ? 5 : 0;
}
