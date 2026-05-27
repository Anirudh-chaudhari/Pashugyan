export type AnimalType = "cattle" | "buffalo";
export type BreedPurpose = "dairy" | "draft" | "dual";

export type Breed = {
  slug: string;
  name: string;
  nameHindi: string;
  type: AnimalType;
  origin: string;
  originState: string;
  avgMilkYieldMin: number;
  avgMilkYieldMax: number;
  lactationDays: number;
  bodyWeightKg: number;
  gestationDays: number;
  purpose: BreedPurpose;
  description: string;
  milkYieldInfo: string;
  feedingGuide: string;
  careTips: string;
  economicValue: string;
  characteristics: string[];
  imageUrl: string;
};

export type BreedFilters = {
  type?: AnimalType | "all";
  purpose?: BreedPurpose | "all";
  originState?: string;
  search?: string;
  milkYieldMin?: number;
  milkYieldMax?: number;
};
