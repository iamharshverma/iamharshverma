import { portfolioProjects, PORTFOLIO_PROJECT_SOURCE } from "./portfolio-projects";
import hashImage from "@/assets/research-pillar-architecture.webp.asset.json";
import tokenImage from "@/assets/research-pillar-trust.webp.asset.json";

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  technology: string;
  year: number | null;
  image: string;
  reviewBasis?: "portfolio";
  source: string;
  flow: string[];
  sections: { title: string; text: string }[];
};
export const caseStudies: CaseStudy[] = [
  {
    slug: "java-hash-table",
    image: hashImage.url,
    title: "A Custom Java Hash Table",
    topic: "Distributed systems",
    technology: "Java",
    year: 2019,
    summary:
      "A source-based review of separate chaining, map operations and the correctness lessons in a public educational implementation.",
    source:
      "https://github.com/iamharshverma/JavaHashTableCustomImplementation/blob/HEAD/CustomHashTableImplementation.java",
    flow: ["Key hash", "Bucket index", "Linked collision chain", "Insert / lookup / remove"],
    sections: [
      {
        title: "Project overview",
        text: "This public educational Java implementation models a key-value map. The review describes inspectable source code, not a production system, employer project or benchmarked library.",
      },
      {
        title: "Engineering challenge",
        text: "Hash collisions require a strategy for storing and finding multiple keys in one bucket. Correctness also depends on update semantics, missing-key handling and keeping the reported size consistent with stored entries.",
      },
      {
        title: "Architecture and data flow",
        text: "Main.CustomHashMap initializes ten bucket entries in a Vector. DataNodeHavingKeyAndValue nodes form linked chains. The bucket index is calculated from key.hashCode() modulo the configured bucket count.",
      },
      {
        title: "Engineering decisions",
        text: "Separate chaining makes collisions explicit. addkeyInBucket searches the chain, updates a matching key or prepends a node; getValueFromBucketListBasedOnGivenKeyInput searches for a key; remove unlinks a node. This favors a readable teaching implementation over a feature-complete standard-library replacement.",
      },
      {
        title: "Implementation and evaluation",
        text: "The main method exercises string-key insertion and removal. Useful regression cases include repeated updates, absent-key removal, negative hash codes and long collision chains. The repository demonstration is not evidence of comprehensive testing or a measured performance result.",
      },
      {
        title: "Security and reliability",
        text: "The source does not establish thread safety or lock freedom. Vector does not make multi-step map operations atomic. Capacity growth is not rehashing, negative modulo results can produce invalid indexes and null keys are not handled. Updating an existing key increments size, while some unsuccessful removals decrement it.",
      },
      {
        title: "Outcomes, lessons and limitations",
        text: "The inspectable result is a small map implementation and a concrete set of correctness trade-offs. Proposed improvements include normalized bucket indexes, invariant-preserving size updates, explicit resizing and targeted tests. No throughput, scale or production reliability claim is made.",
      },
    ],
  },
  {
    slug: "tokenization-porter-stemming",
    image: tokenImage.url,
    title: "Corpus Tokenization & Porter Stemming",
    topic: "AI engineering",
    technology: "Java",
    year: 2019,
    summary:
      "Tracing a public text-processing pipeline from corpus files to token and stem frequency counts.",
    source: "https://github.com/iamharshverma/TokanizeAndStemming/blob/HEAD/TokanizerExecutor.java",
    flow: [
      "Corpus folder",
      "Line cleanup",
      "Token counts",
      "Porter stemmer",
      "Stem frequency report",
    ],
    sections: [
      {
        title: "Project overview",
        text: "The public Java project explores tokenization and stemming over a document corpus. It produces frequency summaries; it does not implement an inverted index or establish retrieval-quality results.",
      },
      {
        title: "Engineering challenge",
        text: "Text normalization must balance vocabulary reduction with preserving meaningful distinctions. File traversal, markup treatment and frequency ordering affect the accuracy and reproducibility of the output.",
      },
      {
        title: "Architecture and data flow",
        text: "TokanizerExecutor.main accepts a corpus directory. storeFilesFornFolderToFileList discovers file names, and readFileAndStoreUpdateValues reads documents. Cleanup and whitespace splitting produce lowercased tokens; wordCountMap stores token frequencies, while Stemmer generates values counted in wordsStemMap.",
      },
      {
        title: "Engineering decisions",
        text: "The driver uses custom string cleanup rather than a general parser. Stemmer.java implements Porter suffix processing using a growable character buffer. Token and stem maps let the program compare vocabulary before and after normalization.",
      },
      {
        title: "Implementation and evaluation",
        text: "The program prints counts and up to thirty frequency entries. Useful validation cases include markup mixed with text, nested folders, equal-frequency tokens and known Porter-stem examples. Reported elapsed read time is not an independently verified benchmark.",
      },
      {
        title: "Security and reliability",
        text: "Skipping lines containing both angle brackets can discard text. Discovery stores basenames while reads reconstruct paths from the root folder, so nested files and duplicate names are problematic. Directory listing failure is not guarded, scanners are not explicitly closed and equal-frequency comparison lacks a consistent tie-break.",
      },
      {
        title: "Outcomes, lessons and limitations",
        text: "The inspectable outcome is a token/stem reporting pipeline. Proposed improvements are path-safe traversal, resource cleanup, deterministic ordering and normalization tests. No production indexing, semantic search or accuracy claim is made.",
      },
    ],
  },
  ...portfolioProjects.map((p): CaseStudy => ({
    slug: p.slug, title: p.title, summary: p.summary, topic: p.topic,
    technology: p.technology, year: null, image: p.image, source: p.source,
    reviewBasis: "portfolio", flow: p.flow,
    sections: [
      { title: "Project overview", text: p.summary },
      { title: "Architecture perspective", text: p.focus },
      { title: "Source and validation boundaries", text: p.validation },
      { title: "Explore the implementation", text: `This project is listed on Harsh Verma’s public portfolio (${PORTFOLIO_PROJECT_SOURCE}). Follow the repository reference below to inspect available code, setup instructions and reproducible examples. The flow above is a conceptual reading guide, not a claim of verified runtime behavior.` },
    ],
  })),
];
