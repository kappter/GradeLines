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
const guideTopics={
  baseline:{kicker:"THE CLOSEST THING TO A COMMON BASELINE",title:"Strong expectations, flexible pathways",intro:"These are useful design references for many Grade 9 classrooms. They are not tests of normality.",cards:[
    {icon:"8–10",title:"Hours of sleep",text:"The population recommendation for ages 13–18. Schedules and demands can help or hinder it.",move:"Design move: avoid treating fatigue as character.",ids:["G9-006"]},
    {icon:"60+",title:"Minutes of activity",text:"Daily moderate-to-vigorous movement is the health reference for ages 6–17—not an athletic standard.",move:"Design move: offer inclusive ways to move.",ids:["G9-007"]},
    {icon:"↗",title:"Higher-order work",text:"Model, reason, argue, critique, use tools, notice structure, and revise—not merely recall.",move:"Design move: keep the demand; vary the access route.",ids:["G9-009","G9-010"]},
    {icon:"◎",title:"Belonging matters",text:"Feeling that adults and peers care is associated with healthier and more successful school experience.",move:"Design move: make reliable adult connection visible.",ids:["G9-016","G9-017"]}
  ]},
  nature:{kicker:"BODY + ENVIRONMENT",title:"Nature supplies ranges, not destinies",intro:"Puberty, stature, sleep, movement and nutrition interact with culture, health, access and daily conditions.",cards:[
    {icon:"↕",title:"Growth overlaps",text:"CDC sex-coded stature distributions are broad and overlap substantially. Height is not a maturity meter.",move:"Protect privacy; compare references, never bodies.",ids:["G9-003","G9-004"]},
    {icon:"≈",title:"Puberty varies",text:"Timing, tempo, sequence, visibility and meaning vary across a multi-year process.",move:"Never infer a private health stage from appearance.",ids:["G9-005"]},
    {icon:"☾",title:"Sleep changes performance",text:"Planning, mood, attention and judgment can look different when sleep and schedules change.",move:"Separate a tired performance from global capacity.",ids:["G9-006","G9-012"]},
    {icon:"◌",title:"Food is contextual",text:"Energy needs vary with body and activity. Population guidance is not a classroom calorie prescription.",move:"Support access; do not police food or weight.",ids:["G9-008"]}
  ]},
  advances:{kicker:"EMERGING CAPACITY",title:"What may be becoming more powerful",intro:"These capacities can appear unevenly across domains. Experience, instruction and accessible practice make them more dependable.",cards:[
    {icon:"◇",title:"Abstract representation",text:"Work with variables, models, hypotheticals and ideas not directly present.",move:"Bridge concrete examples to formal representations.",ids:["G9-009","G9-010"]},
    {icon:"↻",title:"Strategy adjustment",text:"Plan, monitor, use feedback, change approach and reflect on what worked.",move:"Model the invisible steps, then release control.",ids:["G9-011"]},
    {icon:"{ }",title:"Computational design",text:"Decompose, design algorithms, troubleshoot systematically, build modularly, document and revise.",move:"Assess thinking—not typing speed or prior access.",ids:["G9-014","G9-015"]},
    {icon:"✦",title:"Agency and identity",text:"Explore purpose, relationships, perspective and increasing autonomy with meaningful support.",move:"Pair real choice with clear, humane boundaries.",ids:["G9-016","G9-018"]}
  ]},
  cautions:{kicker:"CAPACITY ≠ CONSISTENCY",title:"What adults can easily misread",intro:"Variation is not evidence of laziness, immaturity or a broken developmental path.",cards:[
    {icon:"≠",title:"Knowing is not always doing",text:"Planning, working memory, flexibility, inhibition and error monitoring do not strengthen in lockstep.",move:"Use checklists, intermediate deadlines and rehearsal.",ids:["G9-011","G9-012"]},
    {icon:"⚑",title:"Pressure changes choices",text:"Immediate reward, emotion, peer attention and time pressure can change judgment in some settings.",move:"Offer private decision time before high-stakes choices.",ids:["G9-012","G9-013"]},
    {icon:"⊘",title:"No “teen brain” verdict",text:"Developmental neuroscience is not a maturity test or prediction for an individual.",move:"Describe the situation and support—not the stereotype.",ids:["G9-012"]},
    {icon:"△",title:"Needs overlap",text:"Maslow is a historical model, not a rule that lower needs must be completed before learning or creativity.",move:"Attend to safety, access, agency and connection together.",ids:["G9-019","G9-020"]}
  ]},
  possibilities:{kicker:"AGE- AND PLACE-DEPENDENT",title:"Surprising doors that may be opening",intro:"Permission is not readiness. Verify the learner’s exact age, jurisdiction, provider rules, safeguards and supports.",cards:[
    {icon:"UT",title:"College coursework",text:"Utah public-school students in Grades 9–12 may access online concurrent enrollment, subject to course and provider rules.",move:"Possibility—not a universal milestone.",ids:["G9-022"]},
    {icon:"15",title:"Learner permit",text:"In Utah, an application may begin at 15 with tests, supervision, education, practice and other conditions.",move:"A birthday never proves driving readiness.",ids:["G9-023"]},
    {icon:"14+",title:"Limited employment",text:"Federal rules permit some 14- and 15-year-olds to do specified nonhazardous work outside school hours.",move:"Task, hours, state law and safety still control.",ids:["G9-024"]},
    {icon:"IEP",title:"Individualized access",text:"Eligible learners ages 3–21 have individualized educational rights under IDEA, including access and appropriate support.",move:"A grade average never replaces the learner’s plan.",ids:["G9-021"]}
  ]}
};
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
  $("#gradeNineGuide").hidden=a!=="9";
  renderLensNote();
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
function claimsByIds(ids){const profile=getProfile('9');return profile?profile.observations.filter(o=>ids.includes(o.observation_id)):[]}
function openGuideEvidence(ids,title){
  const claims=claimsByIds(ids);$("#dialogEyebrow").textContent="GRADE 9 · SOURCE NOTES";$("#dialogTitle").textContent=title;
  $("#dialogBody").innerHTML=`<p class="evidence-preface">${claims.length} research note${claims.length===1?'':'s'}. Population evidence and standards provide context; they do not place an individual on a developmental scale.</p>${claims.map(o=>`<article class="evidence-card"><div class="evidence-meta"><span>${esc(o.classification)}</span><span class="strength ${esc(o.evidence_strength)}">${esc(o.evidence_strength)} evidence</span></div><h3>${esc(o.claim)}</h3><dl><dt>Scope</dt><dd>${esc(o.typical_range)}</dd><dt>Variation</dt><dd>${esc(o.variability)}</dd><dt>Do not assume</dt><dd>${esc(o.what_educators_should_not_assume)}</dd></dl><a href="${esc(o.direct_url)}" target="_blank" rel="noopener">${esc(o.authority)} · ${esc(o.source_date)} ↗</a></article>`).join('')}`;
  $("#detailDialog").showModal();
}
function renderGuide(topic='baseline'){
  const section=guideTopics[topic];
  $("#guideContent").innerHTML=`<div class="guide-intro"><p class="overline">${section.kicker}</p><h3>${section.title}</h3><p>${section.intro}</p></div><div class="guide-card-grid">${section.cards.map((c,i)=>`<button class="guide-card" data-guide-card="${i}"><span class="guide-card-icon">${c.icon}</span><span><b>${c.title}</b><small>${c.text}</small><em>${c.move}</em></span><i aria-hidden="true">→</i></button>`).join('')}</div>`;
  $$('[data-guide-card]').forEach(btn=>btn.addEventListener('click',()=>{const card=section.cards[+btn.dataset.guideCard];openGuideEvidence(card.ids,card.title)}));
}
function renderLensNote(){
  const lenses=[state.mode==='compare'?$('#lensA').value:null,state.mode==='compare'?$('#lensB').value:$('#lensA').value].filter(Boolean);
  const unique=[...new Set(lenses)];
  const label=unique.length>1?'Mixed body references':unique[0]==='male'?'Male body reference':unique[0]==='female'?'Female body reference':'Shared human baseline';
  $("#lensNoteTitle").textContent=state.mode==='compare'?`${label} · ${learnerName('A')}${state.mode==='compare'?` + ${learnerName('B')}`:''}`:label;
  $("#lensNoteCopy").textContent=unique.includes('male')||unique.includes('female')?'The CDC growth display may use sex-coded population charts. Cognitive expectations remain shared: body-reference sex does not predict reasoning, interests, judgment, identity, or readiness.':'Cognitive expectations are not split into male and female minds. Choose a body reference only when a sex-coded growth comparison is useful.';
  const bandText=unique.length>1?'Grade 9 CDC reference span · female + male charts':unique[0]==='male'?'Grade 9 CDC reference span · male chart':unique[0]==='female'?'Grade 9 CDC reference span · female chart':'Grade 9 CDC reference span · combined body reference';
  $('#referenceHeightBand span').textContent=bandText;
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
['A','B'].forEach(w=>{$(`#name${w}`).addEventListener('input',render);$(`#lens${w}`).addEventListener('change',render);$(`#learner${w}Card`).addEventListener('click',()=>state.active=w)});
$$('.guide-tab').forEach(btn=>btn.addEventListener('click',()=>{$$('.guide-tab').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});renderGuide(btn.dataset.guide)}));
$$('.flyout-button').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.detail)));
$('#aboutButton').addEventListener('click',()=>openDetail('about'));
$('#resetButton').addEventListener('click',()=>{state.gradeA='9';state.gradeB='9';state.active='A';['A','B'].forEach((w,i)=>{$(`#name${w}`).value='';$(`#age${w}`).value='typical';$(`#lens${w}`).value='shared';$(`#feet${w}`).value='5';$(`#inches${w}`).value=i?'3':'5'});render()});
$('#detailDialog .dialog-close').addEventListener('click',()=>$('#detailDialog').close());
$('#detailDialog').addEventListener('click',e=>{if(e.target===$('#detailDialog'))$('#detailDialog').close()});
$('#spectrumPanel .dialog-close').addEventListener('click',()=>$('#spectrumPanel').close());
fillGrades();fillHeights();renderDomains();renderGuide();render();loadResearch();
