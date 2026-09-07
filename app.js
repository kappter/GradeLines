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
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function fillGrades(){
  $$(".grade-select").forEach((select,i)=>{
    select.innerHTML=grades.map(g=>`<option value="${g}" ${g==="9"?"selected":""}>${g==="K"?"Kindergarten":`Grade ${g}`}</option>`).join("");
    select.addEventListener("change",e=>{state[`grade${i?"B":"A"}`]=e.target.value;state.active=i?"B":"A";render();});
  });
  $("#gradeRail").innerHTML=grades.map(g=>`<button class="grade-button" data-grade="${g}" aria-label="${g==="K"?"Kindergarten":`Grade ${g}`}">${g}</button>`).join("");
  $$(".grade-button").forEach(btn=>btn.addEventListener("click",()=>{const key=state.active==="B"&&state.mode==="compare"?"gradeB":"gradeA";state[key]=btn.dataset.grade;$(`#${key}`).value=btn.dataset.grade;render();}));
}
function renderDomains(){
  $("#domainGrid").innerHTML=domains.map((d,i)=>`<button class="domain-card" data-domain="${i}"><span class="domain-icon">${d[0]}</span><h3>${d[1]}</h3><p>${d[2]}</p><span class="arrow">→</span></button>`).join("");
  $$(".domain-card").forEach(btn=>btn.addEventListener("click",()=>openDomain(+btn.dataset.domain)));
}
function learnerName(which){return $(`#name${which}`).value.trim()||`Learner ${which}`}
function render(){
  const compare=state.mode==="compare";
  $("#learnerBCard").hidden=!compare;$("#legendBWrap").hidden=!compare;
  $("#profileGrid").classList.toggle("single",!compare);
  $$(".grade-button").forEach(b=>{b.classList.toggle("selected-a",b.dataset.grade===state.gradeA);b.classList.toggle("selected-b",compare&&b.dataset.grade===state.gradeB)});
  $("#legendA").textContent=learnerName("A");$("#legendB").textContent=learnerName("B");
  const a=state.gradeA, b=state.gradeB;
  $("#snapshotTitle").textContent=compare&&a!==b?`${label(a)} (${ages[a]}) · ${label(b)} (${ages[b]})`:`${label(a)} · Typical age ${ages[a]}`;
}
function label(g){return g==="K"?"Kindergarten":`Grade ${g}`}
function openDetail(key){const d=details[key];$("#dialogEyebrow").textContent=d[1].toUpperCase();$("#dialogTitle").textContent=d[0];$("#dialogBody").innerHTML=`<p>${d[2]}</p>`;$("#detailDialog").showModal()}
function openDomain(i){const d=domains[i],grade=state.gradeA;$("#dialogEyebrow").textContent=`${label(grade).toUpperCase()} · PROTOTYPE LENS`;$("#dialogTitle").textContent=d[1];$("#dialogBody").innerHTML=`<p><strong>${d[2]}.</strong> The research-grounded progression for this domain will be added next.</p><p>Each finished entry will separate <em>commonly emerging capacity</em>, <em>school expectations</em>, <em>helpful supports</em>, and <em>what not to assume</em>.</p>`;$("#detailDialog").showModal()}

$$('.mode-button').forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.mode;$$('.mode-button').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',b===btn)});if(state.mode==='compare')state.active='B';render()}));
['A','B'].forEach(w=>{$(`#name${w}`).addEventListener('input',render);$(`#learner${w}Card`).addEventListener('click',()=>state.active=w)});
$$('.flyout-button').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.detail)));
$('#aboutButton').addEventListener('click',()=>openDetail('about'));
$('#resetButton').addEventListener('click',()=>{state.gradeA='9';state.gradeB='9';state.active='A';['A','B'].forEach(w=>{$(`#name${w}`).value='';$(`#grade${w}`).value='9';$(`#age${w}`).value='typical'});render()});
$('#detailDialog .dialog-close').addEventListener('click',()=>$('#detailDialog').close());
$('#detailDialog').addEventListener('click',e=>{if(e.target===$('#detailDialog'))$('#detailDialog').close()});
fillGrades();renderDomains();render();
