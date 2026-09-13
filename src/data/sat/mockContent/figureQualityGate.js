import { validateStructuredFigure } from './figureRegistry';
import { validateMathBankMathematics } from './mathMathematicalQC';

const ALLOWED = new Set(['line','line_chart','scatter','scatter_plot','bar_chart','table','quadratic','parabola','geometry','right_triangle','general_triangle','circle','linear_function_graph','coordinate_shape','3d_solid']);
function stable(value) { if (value === null || value === undefined) return ''; if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`; if (typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${key}:${stable(value[key])}`).join('|')}}`; return String(value); }
function canonicalizeFigure(question) {
  if (!question.figure) { const match = String(question.prompt || '').match(/linear model is y = (-?\d+(?:\.\d+)?)x \+ (-?\d+(?:\.\d+)?)/i); if (match && question.domain === 'Algebra') return { type:'linear_function_graph', slope:Number(match[1]), y_intercept:Number(match[2]), x_range:[-10,10] }; return null; }
  const figure = question.figure;
  if (figure.type === 'quadratic') { const a=Number(figure.a); const b=Number(figure.b); const c=Number(figure.c); const vertexX=a ? -b/(2*a) : 0; return { type:'parabola', equation:`y = ${a}x² ${b>=0?'+':'−'} ${Math.abs(b)}x ${c>=0?'+':'−'} ${Math.abs(c)}`, x_range:[vertexX-10,vertexX+10] }; }
  if (figure.type === 'scatter') return { type:'scatter_plot', points:figure.points };
  if (figure.type === 'geometry' && figure.shape === 'circle') return { type:'circle', radius:Number(figure.values?.radius), center_label:'O' };
  if (figure.type === 'geometry' && figure.shape === 'right-triangle') return { type:'right_triangle', leg_a:Number(figure.values?.x), leg_b:Number(figure.values?.y), labels:{a:'a',b:'b',c:'c'}, unknown_side:'c' };
  return figure;
}
function validateMockFigures(mock) {
  const seen=new Set(); const typeCounts={};
  const normalize=(question)=>{
    const canonicalFigure=canonicalizeFigure(question); if(!canonicalFigure) return question;
    const visualVariant=String(question.questionId||'question').replace(/[^a-zA-Z0-9_-]/g,'-'); const figure={...canonicalFigure,visualVariant};
    const structural=validateStructuredFigure(figure); if(!structural.valid) throw new Error(`Invalid structured Math figure ${question.questionId}: ${structural.errors.join(' ')}`);
    const signature=stable(canonicalFigure); if(seen.has(signature)) throw new Error(`Duplicate Math figure detected after canonical normalization: ${question.questionId}`); seen.add(signature); typeCounts[figure.type]=(typeCounts[figure.type]||0)+1;
    if(question.section!=='math') throw new Error(`Figure assigned outside Math: ${question.questionId}`); if(!ALLOWED.has(figure.type)) throw new Error(`Unsupported figure type ${figure.type}: ${question.questionId}`); if(question.metadata?.figurePurpose!=='question-essential') throw new Error(`Math figure is not marked question-essential: ${question.questionId}`);
    const geometryTypes=['geometry','table','right_triangle','general_triangle','circle','coordinate_shape','3d_solid']; const dataTypes=['scatter','scatter_plot','line','line_chart','bar_chart','table']; const advancedTypes=['quadratic','parabola','line','line_chart','bar_chart','table','coordinate_shape']; const algebraTypes=['line','line_chart','bar_chart','table','coordinate_shape','linear_function_graph'];
    if(question.domain==='Geometry and Trigonometry'&&!geometryTypes.includes(figure.type)) throw new Error(`Geometry question has mismatched figure: ${question.questionId}`); if(question.domain==='Problem-Solving and Data Analysis'&&!dataTypes.includes(figure.type)) throw new Error(`Data-analysis question has mismatched figure: ${question.questionId}`); if(question.domain==='Advanced Math'&&!advancedTypes.includes(figure.type)) throw new Error(`Advanced Math question has mismatched figure: ${question.questionId}`); if(question.domain==='Algebra'&&!algebraTypes.includes(figure.type)) throw new Error(`Algebra question has mismatched figure: ${question.questionId}`);
    return {...question,figure};
  };
  const readingWriting=(mock.readingWriting||[]).map(question=>{if(question.figure) throw new Error(`R&W question must not use a Math figure: ${question.questionId}`);return question;}); const math=(mock.math||[]).map(normalize); validateMathBankMathematics(math); return {...mock,readingWriting,math,figureQuality:{count:seen.size,typeCounts}};
}
export function validateMockFigureQuality(psat,sat){return{psat:validateMockFigures(psat),sat:validateMockFigures(sat)};}
export default validateMockFigureQuality;
