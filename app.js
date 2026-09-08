const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const ages = {K:"5–6",1:"6–7",2:"7–8",3:"8–9",4:"9–10",5:"10–11",6:"11–12",7:"12–13",8:"13–14",9:"14–15",10:"15–16",11:"16–17",12:"17–18"};
const domains = [
  ["◫","Reading & communication","Meaning, evidence, vocabulary and expression"],
  ["∑","Mathematical thinking","Quantity, pattern, representation and modeling"],
  ["◇","Reasoning & abstraction","Claims, variables, possibilities and transfer"],
  ["↗","Problem-solving","Planning, testing, adapting and persisting"],
  ["◎","Executive function","Attention, inhibition, memory and self-direction"],
  ["☷","Social & emotional","Identity, belonging, perspective and regulation"],
  ["⌁","Physical development","Growth, coordination, sleep and energy"],
  ["{ }","Coding readiness","Sequence, decomposition, logic and debugging"]
];
const details = {
  identity:["Identity, belonging & context","Context changes performance","A learner’s demonstrated capacity can shift with safety, fatigue, public evaluation, peer attention, language demands and prior opportunity. LGBTQ+ identity is not a separate cognitive pathway. The useful educator question is what conditions allow this learner’s existing and emerging capacities to become visible."],
  boys:["Boys: a population lens","Overlapping patterns, not predictions","Where research finds sex-associated differences, GradeLines will report effect size, evidence strength and the degree of overlap—not stereotypes. No population average should be used to infer the ability, identity or needs of an individual learner."],
  shared:["Shared development","Begin with the human baseline","This is the primary reference layer. It will distinguish developmental tendencies from school standards, and capacity from dependable performance. Each claim will eventually include a source, evidence rating and last-reviewed date."],
  girls:["Girls: a population lens","Overlapping patterns, not predictions","Sex-associated timing and experience can matter, particularly around puberty and social context. GradeLines will show ranges and uncertainty while avoiding claims that a learner’s sex determines interests, reasoning, personality or academic potential."],
  about:["About GradeLines","See the development behind the grade","GradeLines is being built as a quick, humane educator reference. It helps interpret behavior and readiness in context; it does not diagnose, rank or predict an individual learner. Profile information remains in this browser session." ]
};
const state={mode:"single",active:"A",gradeA:"9",gradeB:"9"};
let researchData=null;
const domainMatchers=[
  /reading|writing|communication|literacy/i,
  /mathematics/i,
  /reasoning|abstraction|metacognition/i,
  /problem solving/i,
  /executive function|impulse control|judgment|risk|peer influence/i,
  /social-emotional|identity|belonging|Maslow|needs research|autonomy/i,
  /height|physical|puberty|sleep|nutrition|caloric/i,
  /computational|programming|coding|debugging|systems thinking/i
];
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function fillGrades(){
  $("#gradeRail").innerHTML=[...grades].reverse().map(g=>`<button class="grade-button" data-grade="${g}" aria-label="${g==="K"?"Kindergarten":`Grade ${g}`}"><span>${g==="K"?"K":g}</span></button>`).join("");
  $$(".grade-button").forEach(btn=>btn.addEventListener("click",()=>{const key=state.active==="B"&&state.mode==="compare"?"gradeB":"gradeA";state[key]=btn.dataset.grade;render();openSpectrum(btn.dataset.grade);}));
}
function fillHeights(){
  ['A','B'].forEach((w,i)=>{
    $(`#feet${w}`).innerHTML=[2,3,4,5,6].map(v=>`<option value="${v}" ${v===5?'selected':''}>${v} ft</option>`).join('');
    $(`#inches${w}`).innerHTML=Array.from({length:12},(_,v)=>`<option value="${v}" ${v===(i?3:5)?'selected':''}>${v} in</option>`).join('');
    [$(`#feet${w}`),$(`#inches${w}`)].forEach(el=>el.addEventListener('change',render));
  });
}
function renderDomains(){
  const profile=getProfile('9');
  $("#domainGrid").innerHTML=domains.map((d,i)=>{const count=profile?claimsForDomain(profile,i).length:0;return `<button class="domain-card" data-domain="${i}"><span class="domain-icon">${d[0]}</span><h3>${d[1]}</h3><p>${count?`${count} Grade 9 evidence notes`:d[2]}</p>${count?'<b class="ready-badge">RESEARCH READY</b>':''}<span class="arrow">→</span></button>`}).join("");
  $$(".domain-card").forEach(btn=>btn.addEventListener("click",()=>openDomain(+btn.dataset.domain)));
}
function learnerName(which){return $(`#name${which}`).value.trim()||`Learner ${which}`}
function render(){
  const compare=state.mode==="compare";
  $("#learnerBCard").hidden=!compare;$("#legendBWrap").hidden=!compare;
  $("#profileGrid").classList.toggle("single",!compare);
  $$(".grade-button").forEach(b=>{b.classList.toggle("selected-a",b.dataset.grade===state.gradeA);b.classList.toggle("selected-b",compare&&b.dataset.grade===state.gradeB)});
  $("#legendA").textContent=learnerName("A");$("#legendB").textContent=learnerName("B");
  $("#heightLabelBWrap").hidden=!compare;$("#personB").hidden=!compare;
  $("#referenceHeightBand").hidden=state.gradeA!=="9";
  renderHeight('A');if(compare)renderHeight('B');
  const a=state.gradeA, b=state.gradeB;
  $("#snapshotTitle").textContent=compare&&a!==b?`${label(a)} (${ages[a]}) · ${label(b)} (${ages[b]})`:`${label(a)} · Typical age ${ages[a]}`;
}
function renderHeight(w){
  const feet=+$(`#feet${w}`).value,inches=+$(`#inches${w}`).value,total=Math.min(72,feet*12+inches),person=$(`#person${w}`);
  person.style.height=`${(total/72)*100}%`;
  person.style.left=w==='A'?(state.mode==='compare'?'46%':'50%'):'54%';
  person.setAttribute('aria-label',`${learnerName(w)}, ${feet} feet ${inches} inches tall`);
  $(`#heightLabel${w}`).textContent=`${learnerName(w)} · ${feet}′ ${inches}″`;
}
function label(g){return g==="K"?"Kindergarten":`Grade ${g}`}
function getProfile(grade){return String(grade)==='9'?researchData?.grade_profiles?.find(p=>p.grade===9):null}
function claimsForDomain(profile,i){return profile.observations.filter(o=>domainMatchers[i].test(o.domain))}
function esc(value){return String(value??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function openDetail(key){const d=details[key];$("#dialogEyebrow").textContent=d[1].toUpperCase();$("#dialogTitle").textContent=d[0];$("#dialogBody").innerHTML=`<p>${d[2]}</p>`;$("#detailDialog").showModal()}
function openDomain(i){
  const d=domains[i],grade=state.gradeA,profile=getProfile(grade),claims=profile?claimsForDomain(profile,i):[];
  $("#dialogEyebrow").textContent=`${label(grade).toUpperCase()} · EVIDENCE LENS`;$("#dialogTitle").textContent=d[1];
  if(!claims.length){$("#dialogBody").innerHTML=`<p><strong>${d[2]}.</strong> The interface contract is being validated in Grade 9 before this grade is activated.</p><p>No individual position is inferred from grade alone.</p>`}
  else{$("#dialogBody").innerHTML=`<p class="evidence-preface">${claims.length} sourced notes. These describe population evidence, expectations, or permissions—not an individual score.</p>${claims.map(o=>`<article class="evidence-card"><div class="evidence-meta"><span>${esc(o.classification)}</span><span class="strength ${esc(o.evidence_strength)}">${esc(o.evidence_strength)} evidence</span></div><h3>${esc(o.claim)}</h3><dl><dt>Range or scope</dt><dd>${esc(o.typical_range)}</dd><dt>Important variation</dt><dd>${esc(o.variability)}</dd><dt>Do not assume</dt><dd>${esc(o.what_educators_should_not_assume)}</dd></dl><a href="${esc(o.direct_url)}" target="_blank" rel="noopener">${esc(o.authority)} · ${esc(o.source_date)} ↗</a></article>`).join('')}`}
  $("#detailDialog").showModal();
}
function openSpectrum(grade){
  const profile=getProfile(grade);$("#spectrumTitle").textContent=label(grade);
  $("#spectrumIntro").textContent=profile?`${profile.conventional_ages} ${profile.overlapping_ages} Grade supplies context; it does not assign an individual developmental position.`:`Typical age ${ages[grade]}. Research is staged, but Grade 9 is the active interface reference.`;
  $("#spectrumList").innerHTML=domains.map((d,i)=>{const count=profile?claimsForDomain(profile,i).length:0;return `<button class="spectrum-row spectrum-link" data-spectrum-domain="${i}"><header><span>${d[1]}</span><span>${count?`${count} evidence notes`:'not yet activated'}</span></header><div class="spectrum-track"><i class="spectrum-range ${count?'verified':''}"></i><span class="not-inferred">individual position not inferred</span></div></button>`}).join('');
  $$("[data-spectrum-domain]").forEach(b=>b.addEventListener('click',()=>{$("#spectrumPanel").close();openDomain(+b.dataset.spectrumDomain)}));
  $("#spectrumPanel").showModal();
}
async function loadResearch(){try{const response=await fetch('gradelines-data.json');if(!response.ok)throw new Error('data unavailable');researchData=await response.json();$("#researchStatus").textContent='Grade 9 pilot · 24 sourced observations · checked September 7, 2026';renderDomains()}catch(error){$("#researchStatus").textContent='Research layer unavailable · interface remains usable'}}

$$('.mode-button').forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.mode;$$('.mode-button').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',b===btn)});if(state.mode==='compare')state.active='B';render()}));
['A','B'].forEach(w=>{$(`#name${w}`).addEventListener('input',render);$(`#learner${w}Card`).addEventListener('click',()=>state.active=w)});
$$('.flyout-button').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.detail)));
$('#aboutButton').addEventListener('click',()=>openDetail('about'));
$('#resetButton').addEventListener('click',()=>{state.gradeA='9';state.gradeB='9';state.active='A';['A','B'].forEach((w,i)=>{$(`#name${w}`).value='';$(`#age${w}`).value='typical';$(`#feet${w}`).value='5';$(`#inches${w}`).value=i?'3':'5'});render()});
$('#detailDialog .dialog-close').addEventListener('click',()=>$('#detailDialog').close());
$('#detailDialog').addEventListener('click',e=>{if(e.target===$('#detailDialog'))$('#detailDialog').close()});
$('#spectrumPanel .dialog-close').addEventListener('click',()=>$('#spectrumPanel').close());
fillGrades();fillHeights();renderDomains();render();loadResearch();
