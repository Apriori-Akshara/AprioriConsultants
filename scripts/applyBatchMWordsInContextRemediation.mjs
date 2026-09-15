import fs from 'node:fs';

const targetPath = 'src/data/sat/mockContent/verbalConstructionRemediated.js';
const source = fs.readFileSync(targetPath, 'utf8');
const marker = '// Batch M Words in Context diversity remediation v1';

if (source.includes(marker)) {
  console.log('Words in Context diversity remediation already present; no change needed.');
  process.exit(0);
}

const oldTargets = `const WIC_TARGETS = {
  technical: [
    ['attenuate', 'reduce the strength of'], ['constrain', 'limit the range of'], ['mediate', 'influence an outcome through an intervening process'], ['retain', 'continue to hold or preserve'],
  ],
  figurative: [
    ['anchor', 'provide a stable reference for'], ['fracture', 'divide or disrupt'], ['amplify', 'make more noticeable or pronounced'], ['temper', 'make less extreme'],
  ],
  rhetorical: [
    ['clarify', 'make a claim or distinction more precise'], ['concede', 'acknowledge a point that may seem to oppose the main claim'], ['underscore', 'emphasize'], ['distinguish', 'show a meaningful difference between'],
  ],
  contextual: [
    ['trace', 'follow the development or origin of'], ['channel', 'direct toward a particular course'], ['yield', 'produce or result in'], ['register', 'show or record'],
  ],
};`;

const newTargets = `const WIC_TARGETS = {
  technical: [
    ['attenuate', 'reduce the strength of'],
    ['constrain', 'limit the range of'],
    ['mediate', 'influence an outcome through an intervening process'],
    ['retain', 'continue to hold or preserve'],
    ['diminish', 'make or become less pronounced'],
    ['stabilize', 'make less likely to change abruptly'],
    ['modulate', 'adjust the degree or intensity of'],
    ['sustain', 'maintain over a period of time'],
  ],
  figurative: [
    ['anchor', 'provide a stable reference for'],
    ['fracture', 'divide or disrupt'],
    ['amplify', 'make more noticeable or pronounced'],
    ['temper', 'make less extreme'],
    ['illuminate', 'make an idea or issue easier to understand'],
    ['echo', 'repeat or reflect an idea or quality'],
    ['unsettle', 'disturb an established expectation or assumption'],
    ['reinforce', 'make an existing impression or idea stronger'],
  ],
  rhetorical: [
    ['clarify', 'make a claim or distinction more precise'],
    ['concede', 'acknowledge a point that may seem to oppose the main claim'],
    ['underscore', 'emphasize'],
    ['distinguish', 'show a meaningful difference between'],
    ['qualify', 'limit or modify the scope of a claim'],
    ['acknowledge', 'recognize a point without necessarily accepting its full implication'],
    ['frame', 'present an issue from a particular perspective'],
    ['invoke', 'refer to an idea or example for a particular purpose'],
  ],
  contextual: [
    ['trace', 'follow the development or origin of'],
    ['channel', 'direct toward a particular course'],
    ['yield', 'produce or result in'],
    ['register', 'show or record'],
    ['derive', 'obtain from a particular source or process'],
    ['encounter', 'come into contact with or experience'],
    ['retain', 'continue to have within a particular setting'],
    ['reflect', 'show or express a condition or pattern'],
  ],
};`;

if (!source.includes(oldTargets)) throw new Error('Expected WIC_TARGETS block not found.');
let updated = source.replace(oldTargets, newTargets + '\n\n' + marker);

const oldBuild = `  else if (plan.skill === 'Words in Context') {
    const wicOrdinal = Math.floor(index / SECTIONS.length);
    const wicFamily = sourceFamily(wicOrdinal);
    result = makeWIC(wicOrdinal, makeStimulus(wicFamily, wicOrdinal));
  }`;
const newBuild = `  else if (plan.skill === 'Words in Context') {
    const wicOrdinal = Math.floor(index / SECTIONS.length);
    const wicFamily = FAMILY_KEYS[Math.floor(wicOrdinal / 3) % FAMILY_KEYS.length];
    result = makeWIC(wicOrdinal, makeStimulus(wicFamily, wicOrdinal + index));
  }`;
if (!updated.includes(oldBuild)) throw new Error('Expected Words in Context build branch not found.');
updated = updated.replace(oldBuild, newBuild);

fs.writeFileSync(targetPath, updated);
console.log('Applied Batch M Words in Context diversity remediation.');
