const fs=require('fs'), vm=require('vm'), assert=require('node:assert/strict');
const source=fs.readFileSync(require('path').join(__dirname,'../content.js'),'utf8');
const start=source.indexOf('(function (root, factory)');
const end=source.indexOf('(function (root) {', start);
const ctx={}; vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);
const R=ctx.GodvilleTreasureRanker;
const rec=Object.values(ctx).find(x=>x && x.buildCompactExport);
assert(R && rec);
function cell(x,y,props={}) {return {x,y,text:'?',plausible:true,unexplored:true,absoluteUnknown:false,...props};}
// 3508j2er0 step 32: current trap, north conditional treasure, west open, east visited, south wall.
const target=cell(7,7,{candidateKind:'thermo'});
const current=cell(7,8,{text:'@',current:true,trap:true,plausible:false,unexplored:false});
const model={cells:[current,target,cell(6,8,{text:'.',plausible:false,unexplored:false}),cell(8,8,{text:'.',plausible:false,unexplored:false}),cell(7,9,{wall:true}),cell(6,7,{wall:true})],current,flags:{},bosses:[],markers:[],width:12,height:12};
let a=R.nearbyAdvice(model,[{...target,score:110}]);
assert.equal(a.cell.x,7);assert.equal(a.cell.y,7);assert.equal(a.direction,'↑ север');assert.equal(a.nearTrap,true);
assert.equal(R.nearbyAdvice({...model,flags:{jumping:true}},[target]),null);
assert.equal(R.nearbyAdvice({...model,treasure:target},[target]),null);
assert.equal(R.nearbyAdvice({...model,cells:model.cells.map(c=>c===target?{...c,wall:true}:c)},[target]),null);
assert.equal(R.nearbyAdvice({...model,cells:model.cells.map(c=>c===target?{...c,absoluteUnknown:true}:c)},[target]),null);
// Aquarium: geometry never differentiates two equally compatible cells.
const aq={...model,flags:{aquarium:true,unusualLayout:true,special:true},entry:{x:0,y:0}};
const x=R.scoreCandidate(aq,cell(6,6,{candidateKind:'exact'}),'erinome');
const y=R.scoreCandidate(aq,cell(7,3,{candidateKind:'exact'}),'erinome');
assert.equal(x.score,y.score); assert.equal(x.reasons.length,1);
assert.equal(R.confidenceFor([x],'erinome',aq.flags),'низкая');
function frame(step, treasure=null) {return {snapshot:{schema:rec.SCHEMA,step,stepKnown:step!==null,capturedAt:step||1000,bounds:{minX:0,maxX:8,minY:-8,maxY:0},position:'r:7:-7',treasure,cells:[],top:[],confidence:'низкая',source:'erinome',candidates:10,dungeonFlags:[]}};}
const run={logId:'regression',floor:1};const frames=[frame(32),frame(33,'r:7:-7'),frame(null)];
const report=rec.buildCompactExport(run,frames);
assert.deepEqual(Array.from(report.summary.steps),[32,33]);assert.equal(report.summary.omittedUnknownFrames,1);
assert.equal(report.summary.found,33);assert.equal(report.events.at(-1).x,'7,-7');
assert.equal(rec.buildExport(run,frames).summary.lastStep,33);
assert.equal(rec.buildCompactExport(run,[frame(null)]).summary.frames,1);
console.log('PASS: conditional neighbour, directions, walls, fog, jumping, completion, aquarium, V1/V2 replay export');
// Real DOM-facing helpers with minimal deterministic inputs.
function fn(name) {const begin=source.indexOf('  function '+name+'('); const end=source.indexOf('\n  function ',begin+1);return source.slice(begin,end);}
const header={textContent:'Карта'};
const ui={Ranker:R,document:{querySelector:()=>header},DUNGEON_KIND_STORAGE_PREFIX:'gvtr-dungeon-kind:',dungeonLogId:()=> 'test',location:{host:'test',pathname:'/duels/log/test'},detectCurrentStep:()=>({known:true,value:32})};
vm.createContext(ui);
for(const name of ['mapFloorIdentity','dungeonKindStorageKey','positionedCells','mapSignature'])vm.runInContext(fn(name),ui);
const root={dataset:{eguipDungeonLogId:'test',eguipDungeonFloor:'1'},querySelectorAll:()=>[]};
const k1=ui.dungeonKindStorageKey(root);root.dataset.eguipDungeonFloor='2';const k2=ui.dungeonKindStorageKey(root);
assert.notEqual(k1,k2);
const classes=new Set(['dmc','notAWall']);classes.contains=classes.has.bind(classes);
const el={classList:classes,textContent:'?',dataset:{},title:''};
root.querySelectorAll=selector=>selector==='.dml'?[{children:[el]}]:[el];
const sig=ui.mapSignature(root);classes.add('trapModerateDamage');assert.notEqual(sig,ui.mapSignature(root));
classes.delete('trapModerateDamage');classes.add('dmw');assert.notEqual(sig,ui.mapSignature(root));
const sigFloor=ui.mapSignature(root);root.dataset.eguipDungeonFloor='1';assert.notEqual(sigFloor,ui.mapSignature(root));
console.log('PASS: floor-specific keys; trap, wall and floor invalidate calculation signature');
