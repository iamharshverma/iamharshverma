export type RadarSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: "Paper" | "Standard" | "Documentation" | "Engineering guidance";
};

export type RadarCitation = {
  source: RadarSource;
  claim: string;
};