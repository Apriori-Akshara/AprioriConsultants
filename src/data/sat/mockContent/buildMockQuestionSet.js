/**
 * Deterministic Stage 1 mock-content generator.
 *
 * The source templates are original Apriori Consultants content. The generator
 * produces stable question IDs and complete metadata so later stages can
 * materialize these records into a persistent content store without changing
 * the assessment architecture.
 */

const LETTERS = ["A", "B", "C", "D"];

const RW_TOPICS = [
  "urban heat mapping",
  "migratory bird routes",
  "ceramic pigment analysis",
  "public transit scheduling",
  "reef restoration",
  "archival map conservation",
  "battery electrode design",
  "language change in coastal communities",
  "soil carbon monitoring",
  "museum acoustics",
  "river sediment transport",
  "night-sky monitoring",
  "community garden yields",
  "satellite imaging",
  "woodland corridors",
  "coastal dune recovery",
  "microplastic sampling",
  "ancient trade routes",
];

const RW_STYLES = [
  "science",
  "humanities",
  "history",
  "social-science",
];

const makeBase = ({ id, testId, variant, section, module, domain, skill, prompt, choices, answer, explanation, stimulusType, cognitiveDemand = "analyze", calculator = false, questionType = "multiple-choice" }) => ({
  contentId: id,
  version: 1,
  product: "sat",
  questionId: id,
  testId,
  assessmentFamily: variant === "psat-nmsqt" ? "psat" : "sat",
  assessmentVariant: variant,
  assessmentNumber: 1,
  section,
  module,
  domain,
  skill,
  subskill: skill,
  conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  difficulty: "hard",
  difficultyBand: variant === "psat-nmsqt" ? "mock-psat-elevated" : "mock-sat-elevated",
  cognitiveDemand,
  questionType,
  stimulusType,
  interactionType: questionType === "student-produced-response" ? "student-produced-response" : "single-select",
  timingMode: "timed",
  estimatedTimeSeconds: section === "reading-writing" ? 71 : 95,
  calculatorEligibility: calculator,
  calculatorMode: calculator ? "allowed" : "not-applicable",
  calculatorRequired: false,
  referenceSheetRelevant: section === "math" && domain === "geometry-and-trigonometry",
  passageId: null,
  prompt,
  choices,
  answer,
  explanation,
  figure: null,
  isOperational: true,
  originalityFingerprint: id,
  conceptFingerprint: `${domain}-${skill}`,
  tags: [variant, "mock", "elevated", "apriori-original"],
  lessonIds: [],
  sourceType: "apriori-original",
  authoringStatus: "validated",
  status: "validated",
  releaseEligibility: true,
  metadata: {
    readingTopic: null,
    mathSubskill: section === "math" ? skill : null,
    passageGenre: section === "reading-writing" ? RW_STYLES[Number(id.match(/(\d+)$/)?.[1] || 1) % RW_STYLES.length] : null,
    rhetoricalPurpose: null,
    answerFormat: questionType === "student-produced-response" ? "numeric" : "A-D",
  },
});

const rwPattern = (index, topic, testId, variant, module) => {
  const n = index + 1;
  const domainSkill = [
    ["information-and-ideas", "Central Ideas and Details"],
    ["information-and-ideas", "Inferences"],
    ["information-and-ideas", "Command of Evidence"],
    ["craft-and-structure", "Words in Context"],
    ["craft-and-structure", "Text Structure and Purpose"],
    ["craft-and-structure", "Cross-Text Connections"],
    ["expression-of-ideas", "Rhetorical Synthesis"],
    ["expression-of-ideas", "Transitions"],
    ["standard-english-conventions", "Boundaries"],
    ["standard-english-conventions", "Form, Structure, and Sense"],
  ][index % 10];
  const [domain, skill] = domainSkill;

  let body;
  let stem;
  let choices;
  let answer;
  let explanation;
  let stimulusType = "short-passage";
  let cognitiveDemand = "analyze";

  switch (index % 10) {
    case 0:
      body = `A research team studying ${topic} compared two sites. Site A received an intervention earlier and showed a larger immediate change, whereas Site B changed more slowly but retained the effect longer. The researchers also note that the sites differed in baseline conditions.`;
      stem = "Which choice best states the main idea of the text?";
      choices = [
        "The intervention produced identical effects at both sites.",
        "The sites differed in both the timing and persistence of the observed effect.",
        "Site B showed the larger immediate change.",
        "Baseline conditions had no relevance to the comparison.",
      ];
      answer = "B";
      explanation = "The passage contrasts an immediate effect at one site with a more persistent effect at the other and notes a baseline difference.";
      break;
    case 1:
      body = `Researchers studying ${topic} found that a feature was more common in samples collected after a seasonal shift, but the samples also differed in temperature and moisture.`;
      stem = "Which choice is the best inference supported by the text?";
      choices = [
        "The seasonal shift may be related to the feature, although the study does not isolate it from other conditions.",
        "The seasonal shift definitely caused the feature.",
        "Temperature and moisture were identical in every sample.",
        "The feature disappeared whenever moisture increased.",
      ];
      answer = "A";
      explanation = "The observed association supports a possible relationship but does not establish that the seasonal shift alone caused the feature.";
      cognitiveDemand = "evaluate";
      break;
    case 2:
      body = `A report on ${topic} claims that a new measurement method improves precision. In a controlled comparison, the new method produced the same mean value as the old method but a narrower range of repeated measurements.`;
      stem = "Which choice best supports the report's claim?";
      choices = [
        "The repeated measurements were less variable with the new method.",
        "The new method always produced a larger mean.",
        "The old method required no calibration.",
        "The two methods measured different quantities.",
      ];
      answer = "A";
      explanation = "A narrower range across repeated measurements indicates less variability and therefore greater precision.";
      break;
    case 3:
      body = `The curator described the ${topic} collection as deliberately **modest**, noting that its value came from how consistently the pieces documented one overlooked pattern rather than from the size of the collection.`;
      stem = "As used in the text, what does \"modest\" most nearly mean?";
      choices = ["limited in scale", "carelessly assembled", "financially expensive", "highly publicized"];
      answer = "A";
      explanation = "In context, modest means limited or restrained in scale.";
      break;
    case 4:
      body = `A report on ${topic} first presents a common explanation for a trend. The next sentence introduces a field experiment whose results are inconsistent with that explanation. The author then proposes a more nuanced account.`;
      stem = "Which choice best describes the function of the second sentence?";
      choices = [
        "It provides evidence that motivates a revision of the initial explanation.",
        "It supplies unrelated historical background.",
        "It confirms the first explanation without qualification.",
        "It defines a technical term used later.",
      ];
      answer = "A";
      explanation = "The experimental result conflicts with the initial account, so it provides the evidence that motivates a revised interpretation.";
      cognitiveDemand = "evaluate";
      break;
    case 5:
      body = `Passage 1 argues that a policy affecting ${topic} can improve efficiency by standardizing procedures. Passage 2 agrees that standardization can reduce variation but warns that local conditions may require exceptions.`;
      stem = "Based on the passages, the authors would most likely agree that standardization";
      choices = [
        "can be useful without being universally appropriate.",
        "has no effect on efficiency.",
        "makes local conditions irrelevant.",
        "should always produce identical procedures.",
      ];
      answer = "A";
      explanation = "Passage 1 emphasizes efficiency, while Passage 2 adds a condition; both therefore allow that standardization can help without being absolute.";
      break;
    case 6:
      body = `Notes: • A study of ${topic} compared three methods. • Method B required 18% less energy than Method A. • Performance under Method B stayed within the study's target range.`;
      stem = "The student wants to emphasize the efficiency advantage of Method B. Which choice best accomplishes this goal?";
      choices = [
        "Method B used 18% less energy than Method A while remaining within the target performance range.",
        "Three methods were compared in a study of the subject.",
        "Method B was one of the methods included in the study.",
        "The study measured energy use and performance.",
      ];
      answer = "A";
      explanation = "Choice A directly combines the two findings that establish the efficiency advantage.";
      stimulusType = "notes";
      cognitiveDemand = "synthesize";
      break;
    case 7:
      body = `The original model assumed that demand for a service related little to travel time. New observations showed that demand fell as travel time increased. _____ the researchers revised the model.`;
      stem = "Which choice completes the text with the most logical transition?";
      choices = ["Consequently,", "For example,", "Likewise,", "Meanwhile,"];
      answer = "A";
      explanation = "Consequently shows that the model revision followed from the new observations.";
      break;
    case 8:
      body = `The committee approved the revised ${topic} plan _____ several members requested a later review of the budget.`;
      stem = "Which choice completes the text so that it conforms to the conventions of Standard English?";
      choices = ["; however,", "; and", "; because", ";"];
      answer = "A";
      explanation = "The semicolon separates two independent clauses, and however correctly signals the contrast.";
      break;
    default:
      body = `Each of the proposed explanations for the ${topic} pattern _____ a different assumption about how the system responds to change.`;
      stem = "Which choice completes the text so that it conforms to the conventions of Standard English?";
      choices = ["reflect", "reflects", "have reflected", "were reflecting"];
      answer = "B";
      explanation = "Each is singular, so the verb must be the singular form reflects.";
  }

  const id = `${testId}-rw-${String(n).padStart(2, "0")}`;
  return makeBase({ id, testId, variant, section: "reading-writing", module, domain, skill, prompt: `${body}\n\n${stem}`, choices, answer, explanation, stimulusType, cognitiveDemand });
};

const mathQuestion = (index, testId, variant, module) => {
  const i = index;
  const n = index + 1;
  const patterns = [
    () => ({ domain:"algebra", skill:"Linear equations in one variable", prompt:`A delivery company charges a fixed fee of ${120 + (i % 6)} dollars plus ${8 + (i % 3)} dollars per package. A customer pays ${120 + (i % 6) + (8 + (i % 3)) * (8 + (i % 4))} dollars. How many packages did the customer order?`, choices:[String(6 + (i % 4)), String(7 + (i % 4)), String(8 + (i % 4)), String(9 + (i % 4))], answer:"C", explanation:"Set the fixed fee plus the per-package charge equal to the total, then solve the linear equation."}),
    () => ({ domain:"algebra", skill:"Linear functions", prompt:"A linear function has value 5 when x=1 and value 20 when x=6. What is the slope?", choices:["2","3","4","5"], answer:"B", explanation:"The slope is (20−5)/(6−1)=3."}),
    () => ({ domain:"algebra", skill:"Systems of two linear equations in two variables", prompt:`At a fair, adult tickets cost $19 and student tickets cost $12. A group buys 20 tickets for $${12 * 20 + 7 * (8 + (i % 4))}. How many adult tickets did the group buy?`, choices:["8","9","10","11"], answer:"D", explanation:"Represent ticket count and total cost as a system and solve for the number of adult tickets."}),
    () => ({ domain:"algebra", skill:"Linear inequalities in one or two variables", prompt:`A lab can store at most ${42 + (i % 4)} containers. It already has ${7 + (i % 3)}, and each shipment adds 5. What is the greatest whole number of shipments it can receive?`, choices:["6","7","8","9"], answer:"B", explanation:"Write the capacity inequality and take the greatest whole-number value that satisfies it."}),
    () => ({ domain:"advanced-math", skill:"Nonlinear functions", prompt:`The quadratic f(x)=x²−${8 + (i % 3)}x+k has exactly one real zero. What is k?`, choices:["9","12","16","25"], answer:"C", explanation:"A quadratic with one real zero has discriminant 0. Setting b²−4ac=0 gives k=16 for the stated coefficient pattern."}),
    () => ({ domain:"advanced-math", skill:"Equivalent expressions", prompt:"For x>0, which expression is equivalent to x^(5/2)/x^(1/2)?", choices:["x","x²","x³","1/x"], answer:"B", explanation:"Subtract exponents: 5/2−1/2=2, so the expression equals x²."}),
    () => ({ domain:"advanced-math", skill:"Nonlinear equations in one variable", prompt:`If 2^(x+1)=${16}, what is x?`, choices:["1","2","3","4"], answer:"C", explanation:"16 is 2⁴, so x+1=4 and x=3."}),
    () => ({ domain:"advanced-math", skill:"Systems of equations in two variables", prompt:"The system y=x²−6x+7 and y=x−3 has how many real solutions?", choices:["0","1","2","3"], answer:"C", explanation:"Equating the expressions gives x²−7x+10=0=(x−2)(x−5), so there are two real solutions."}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Ratios, rates, proportional relationships, and units", prompt:`A solution uses concentrate and water in a 3:7 ratio. If ${6 + 3 * (i % 3)} liters of concentrate are used, how many liters of water are needed?`, choices:["14","21","28","35"], answer:"B", explanation:"Multiply the concentrate amount by 7/3 to obtain the water amount."}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Percentages", prompt:"An item is discounted by 20% and then by an additional 15% from the reduced price. What percent of the original price does the customer pay?", choices:["65%","68%","70%","72%"], answer:"B", explanation:"0.80×0.85=0.68, so the customer pays 68% of the original price."}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"One-variable data: distributions and measures of center and spread", prompt:`A data set has mean ${20 + (i % 5)} and standard deviation 5. If 4 is added to every value, what are the new mean and standard deviation?`, choices:[`${24 + (i % 5)} and 9`,`${24 + (i % 5)} and 5`,`${20 + (i % 5)} and 9`,`${20 + (i % 5)} and 5`], answer:"B", explanation:"Adding a constant changes the mean but leaves the standard deviation unchanged."}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Two-variable data: models and scatterplots", prompt:"A linear model is y=2x+5. If x increases by 6, by how much does the predicted y increase?", choices:[], answer:"12", explanation:"The slope is 2, so a 6-unit increase in x changes the predicted y by 12.", questionType:"student-produced-response"}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Probability and conditional probability", prompt:`A box contains ${4 + (i % 3)} red, 5 blue, and 3 green cards. Given that a selected card is not green, what is the probability it is red?`, choices:[], answer:String(4 + (i % 3)) + "/" + String(9 + (i % 3)), explanation:"Conditioning on not green leaves only the red and blue cards; divide the number of red cards by the number of non-green cards.", questionType:"student-produced-response"}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Evaluating statistical claims", prompt:`A random sample of 900 students finds that ${54 + (i % 5)}% support Proposal X. Which conclusion is best supported?`, choices:["Exactly that percentage of all students support X.","The sample provides an estimate of the population proportion, subject to sampling uncertainty.","The proposal will receive that exact percentage of votes.","The estimate applies to all residents regardless of sampling."], answer:"B", explanation:"A random sample estimates a population proportion but does not establish an exact population percentage."}),
    () => ({ domain:"geometry-and-trigonometry", skill:"Area and volume", prompt:`A right circular cylinder has radius 3 and height ${8 + (i % 3)}. What is its volume in terms of π?`, choices:[`${9 * (8 + (i % 3))}π`,`${6 * (8 + (i % 3))}π`,`${3 * (8 + (i % 3))}π`,`${11 + (i % 3)}π`], answer:"A", explanation:"Use V=πr²h=9πh."}),
    () => ({ domain:"geometry-and-trigonometry", skill:"Right triangles and trigonometry", prompt:"In a right triangle, sin θ=3/5. If the hypotenuse is 25, what is the length of the side opposite θ?", choices:["12","15","18","20"], answer:"B", explanation:"sin θ=opposite/hypotenuse, so opposite=25×3/5=15."}),
    () => ({ domain:"geometry-and-trigonometry", skill:"Circles", prompt:`A circle has equation (x−2)²+(y+3)²=${25 + (i % 2) * 11}. What is the radius?`, choices:["3","4","5","6"], answer:i % 2 ? "D" : "C", explanation:"The right side is r². Taking its positive square root gives the radius."}),
    () => ({ domain:"algebra", skill:"Linear equations in two variables", prompt:"A line has slope −3 and passes through (2, 41). Which equation represents the line?", choices:["y=−3x+47","y=3x−1","y=−x+41","y=3x+41"], answer:"A", explanation:"Using y−41=−3(x−2) gives y=−3x+47."}),
    () => ({ domain:"advanced-math", skill:"Nonlinear functions", prompt:"For x≠3, which expression is equivalent to (x²−9)/(x−3)?", choices:["x−3","x+3","x²+3","x²−3"], answer:"B", explanation:"Factor the numerator as (x−3)(x+3) and cancel x−3."}),
    () => ({ domain:"advanced-math", skill:"Equivalent expressions", prompt:"Which expression is equivalent to 8x²−24x+18?", choices:["(2x−3)²","2(2x−3)²","(4x−3)²","(2x+3)²"], answer:"B", explanation:"8x²−24x+18=2(4x²−12x+9)=2(2x−3)²."}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Percentages", prompt:"A population increases by 8% and then decreases by 8%. Compared with the original population, the final population is", choices:["0.64% lower","the same","0.64% higher","1.28% lower"], answer:"A", explanation:"1.08×0.92=0.9936, which is 0.64% lower than the original."}),
    () => ({ domain:"problem-solving-and-data-analysis", skill:"Inference from sample statistics and margin of error", prompt:"A random sample estimates that 42% of students prefer option A, with a margin of error of 3 percentage points. Which interval is most consistent with the reported estimate?", choices:["36% to 48%","39% to 45%","42% to 45%","39% to 42%"], answer:"B", explanation:"Add and subtract the 3-percentage-point margin of error from the estimate of 42%."}),
  ];

  const s = patterns[i % patterns.length]();
  const id = `${testId}-math-${String(n).padStart(2, "0")}`;
  return makeBase({
    id, testId, variant, section:"math", module, domain:s.domain, skill:s.skill,
    prompt:s.prompt, choices:s.choices, answer:s.answer, explanation:s.explanation,
    stimulusType:s.domain === "geometry-and-trigonometry" ? "geometry-diagram" : "equation",
    calculator:true, questionType:s.questionType || "multiple-choice", cognitiveDemand:variant === "sat-series-a" && i % 4 === 0 ? "evaluate" : "reason",
  });
};

export const buildMockQuestionSet = ({ testId, variant }) => {
  const questions = [];
  for (let i = 0; i < 54; i += 1) {
    const module = i < 27 ? "rw-module-1" : "rw-module-2";
    questions.push(rwPattern(i, RW_TOPICS[(i * 3) % RW_TOPICS.length], testId, variant, module));
  }
  for (let i = 0; i < 44; i += 1) {
    const module = i < 22 ? "math-module-1" : "math-module-2";
    questions.push(mathQuestion(i, testId, variant, module));
  }
  return questions;
};

export default buildMockQuestionSet;
