// Run with: node test-runtime-regressions.js
// Uses Node's built-in VM and mocked DOM/storage/fetch, not a real browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = __dirname;
function scriptOf(html) {
  const scripts = [...html.matchAll(/<script>\s*([\s\S]*?)\s*<\/script>/g)];
  assert.equal(scripts.length, 1);
  return scripts[0][1];
}
function makeAppContext(initiallyBlocked = false) {
  const boxes = Array.from({length: 4}, (_,i) => ({checked:false, nextElementSibling:{textContent:`step ${i}`}, handlers:{}, addEventListener(type, fn){this.handlers[type]=fn;}}));
  const elements = Object.fromEntries(['note','status','reset','copy'].map(id=>[id, {value:'',textContent:'',handlers:{}, classList:{toggle(){}},addEventListener(type,fn){this.handlers[type]=fn;}}]));
  const memory = {}; const state={blocked:initiallyBlocked,writeBlocked:false,removeBlocked:false};
  const localStorage={getItem(k){if(state.blocked)throw Error('blocked');return memory[k]||null},setItem(k,v){if(state.blocked||state.writeBlocked)throw Error('quota');memory[k]=v},removeItem(k){if(state.blocked||state.removeBlocked)throw Error('blocked');delete memory[k]}};
  const document={title:'test',querySelectorAll(){return boxes},getElementById(id){return elements[id]}};
  return {boxes,elements,memory,state,context:vm.createContext({document,localStorage,navigator:{clipboard:{writeText:async()=>{}}}})};
}
for(let i=1;i<=16;i++) {
  const file=path.join(root,'apps','zapia',`ZM${String(i).padStart(3,'0')}.html`);
  const html=fs.readFileSync(file,'utf8');const app=makeAppContext();vm.runInContext(scriptOf(html),app.context);
  app.boxes[0].checked=true;app.boxes[0].handlers.change();app.elements.note.value='note';app.elements.note.handlers.input();
  assert.ok(Object.values(app.memory)[0].includes('note'));assert.match(app.elements.status.textContent,/Saved in this browser/);
  app.state.writeBlocked=true;app.boxes[1].checked=true;app.boxes[1].handlers.change();assert.equal(app.boxes[1].checked,true);assert.match(app.elements.status.textContent,/Not saved/);
  app.state.removeBlocked=true;app.elements.reset.handlers.click();assert.ok(app.boxes.every(b=>!b.checked));assert.equal(app.elements.note.value,'');assert.match(app.elements.status.textContent,/could not be cleared/);assert.equal(Object.keys(app.memory).length,1);
  app.state.writeBlocked=false;app.state.removeBlocked=false;app.boxes[0].checked=true;app.boxes[0].handlers.change();assert.match(app.elements.status.textContent,/Saved in this browser/);app.elements.reset.handlers.click();assert.equal(Object.keys(app.memory).length,0);assert.match(app.elements.status.textContent,/saved data was removed/);
  const blocked=makeAppContext(true);vm.runInContext(scriptOf(html),blocked.context);assert.match(blocked.elements.status.textContent,/will not be saved/);blocked.boxes[0].checked=true;blocked.boxes[0].handlers.change();assert.match(blocked.elements.status.textContent,/Not saved/);blocked.elements.reset.handlers.click();assert.equal(blocked.boxes[0].checked,false);assert.match(blocked.elements.status.textContent,/could not be cleared/);
}
console.log('PASS: all 16 apps: load, write, quota/blocked failures, reset failure, recovery, and reset success (mocked DOM/storage).');
async function catalogTest(fail) {
  const elems=Object.fromEntries(['stats','q','type','ai','source','sort','ret','list'].map(id=>[id,{value:id==='ret'?'live':id==='sort'?'recent':'',textContent:'',innerHTML:'',addEventListener(){},insertAdjacentHTML(){}}]));
  const fixtures=Object.fromEntries(['apps.json','zapia-apps.json'].map(f=>[f,JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))]));
  const document={querySelector(s){return elems[s.slice(1)]}};
  const fetch=async f=>fail==='both'||fail===f?{ok:false,status:404}:{ok:true,json:async()=>fixtures[f]};
  vm.runInNewContext(scriptOf(fs.readFileSync(path.join(root,'index.html'),'utf8')),{document,fetch});
  await new Promise(resolve=>setImmediate(resolve));
  if(fail==='both'){assert.match(elems.stats.textContent,/No source manifests could be loaded/);return}
  if(fail==='zapia-apps.json'){assert.match(elems.stats.textContent,/zapia-apps.json/);assert.match(elems.list.innerHTML,/>M2<\/span>/);assert.doesNotMatch(elems.list.innerHTML,/>ZM001<\/span>/);}
  if(fail==='apps.json'){assert.match(elems.stats.textContent,/apps.json/);assert.match(elems.list.innerHTML,/>ZM001<\/span>/);}
  if(fail==='none'){assert.match(elems.list.innerHTML,/>ZM001<\/span>/);assert.match(elems.list.innerHTML,/>M2<\/span>/);}
  if(fail!=='apps.json'){const a=elems.list.innerHTML.indexOf('>M2</span>'),b=elems.list.innerHTML.indexOf('>M10</span>');assert.ok(a>=0 && b>a,'M2 must appear before M10 for equal dates');}
}
(async()=>{for(const fail of ['none','apps.json','zapia-apps.json','both'])await catalogTest(fail);console.log('PASS: catalog both sources, each HTTP 404 separately, both fail, and equal-date M2 before M10 (mocked DOM/fetch).')})().catch(e=>{console.error(e);process.exitCode=1});
