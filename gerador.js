
'use strict';
const roster=['Ana','Bruno','Carlos','Diana','Eduardo','Felipe','Gabriela','Henrique'];
const worlds=[
{place:'Mansão Valença',rooms:{Recepção:['Salão','Corredor'],Salão:['Recepção','Despensa'],Corredor:['Recepção','Escritório','Arquivo'],Escritório:['Corredor','Despensa'],Arquivo:['Corredor'],Despensa:['Salão','Escritório']},targets:['Escritório','Arquivo'],objects:['uma joia histórica','um relógio de coleção','um contrato valioso'],containers:['uma caixa de decoração','um estojo de prata','um envelope lacrado']},
{place:'Biblioteca Arantes',rooms:{Entrada:['Galeria'],Galeria:['Entrada','Leitura','Arquivo'],Leitura:['Galeria','Depósito'],Arquivo:['Galeria','Depósito'],Depósito:['Arquivo','Leitura']},targets:['Arquivo','Leitura'],objects:['um manuscrito raro','um mapa antigo','uma primeira edição valiosa'],containers:['uma pasta de conservação','um carrinho de livros','um armário de restauração']},
{place:'Teatro Montenegro',rooms:{Foyer:['Corredor'],Corredor:['Foyer','Camarim','Palco'],Camarim:['Corredor','Figurino'],Figurino:['Camarim','Palco'],Palco:['Corredor','Figurino','Depósito'],Depósito:['Palco']},targets:['Camarim','Figurino'],objects:['um colar de cena valioso','um broche de diamantes','um documento de herança'],containers:['uma caixa de figurinos','uma mala de adereços','um baú de madeira']},
{place:'Hotel Miramar',rooms:{Saguão:['Corredor','Bar'],Corredor:['Saguão','Suíte','Lavanderia'],Suíte:['Corredor','Varanda'],Varanda:['Suíte','Bar'],Bar:['Saguão','Varanda'],Lavanderia:['Corredor']},targets:['Suíte','Lavanderia'],objects:['um anel de família','um pen drive confidencial','uma peça de arte rara'],containers:['uma bolsa de tecido','uma caixa de toalhas','um estojo de couro']}
];
const crimes=[
{id:'furto',label:'Furto',titles:['O objeto desaparecido','A última peça'],things:['uma joia histórica','um documento valioso','um relógio raro'],methods:[['chave','usou uma chave obtida anteriormente','A fechadura não apresenta sinais de arrombamento.'],['codigo','utilizou uma combinação descoberta anteriormente','O compartimento foi aberto com a combinação correta.']],action:(thing,method)=>`retirou ${thing} do local e ${method}`,cover:(thing,container)=>`escondeu ${thing} em ${container}`,evidence:(thing,container,target,approach)=>[`O inventário confirma que ${thing} sumiu de ${target}.`,`Um recipiente semelhante a ${container} foi deslocado em ${approach}.`],intro:(thing,target)=>`${thing} desapareceu de ${target}`},
{id:'homicidio',label:'Homicídio',titles:['A última testemunha','Uma morte suspeita'],things:['um convidado','um funcionário','um organizador do evento'],methods:[['golpe','atingiu a vítima com um objeto contundente','A perícia identificou uma lesão provocada por objeto contundente.'],['asfixia','asfixiou a vítima','O exame preliminar indica morte por asfixia.']],action:(thing,method)=>`${method}, causando a morte de ${thing}`,cover:(thing,container)=>`escondeu vestígios do crime em ${container}`,evidence:(thing,container,target,approach)=>[`O corpo de ${thing} foi encontrado em ${target}.`,`Um recipiente semelhante a ${container} apresenta sinais de limpeza recente em ${approach}.`],intro:(thing,target)=>`${thing} foi encontrado sem vida em ${target}`},
{id:'agressao',label:'Agressão',titles:['O ataque no escuro','Ferimentos e mentiras'],things:['um convidado','um funcionário','um responsável pelo evento'],methods:[['empurrao','empurrou violentamente a vítima contra um móvel','O ferimento é compatível com impacto contra um móvel.'],['golpe','atingiu a vítima com um objeto pesado','O ferimento é compatível com um golpe de objeto pesado.']],action:(thing,method)=>`${method}, ferindo ${thing}`,cover:(thing,container)=>`escondeu um vestígio do ataque em ${container}`,evidence:(thing,container,target,approach)=>[`A vítima, ${thing}, foi encontrada ferida em ${target}.`,`Um recipiente semelhante a ${container} foi manipulado recentemente em ${approach}.`],intro:(thing,target)=>`${thing} foi agredido em ${target}`},
{id:'sabotagem',label:'Sabotagem',titles:['Falha provocada','A máquina parou'],things:['o sistema de segurança','o equipamento principal','o painel de controle'],methods:[['cabos','desconectou componentes internos','A inspeção encontrou conexões internas soltas de forma deliberada.'],['ajuste','alterou manualmente a configuração do equipamento','O registro mostra uma alteração manual de configuração.']],action:(thing,method)=>`${method} de ${thing}, causando a falha`,cover:(thing,container)=>`guardou ferramentas usadas na sabotagem em ${container}`,evidence:(thing,container,target,approach)=>[`A falha de ${thing} começou em ${target}.`,`Um recipiente semelhante a ${container} contém marcas de ferramentas em ${approach}.`],intro:(thing,target)=>`${thing} foi sabotado em ${target}`},
{id:'incendio',label:'Incêndio criminoso',titles:['Fogo na madrugada','As chamas não foram acidente'],things:['uma pilha de materiais','um conjunto de documentos','uma cortina decorativa'],methods:[['acelerante','iniciou um foco de incêndio usando material inflamável','A perícia identificou resíduos de material inflamável.'],['ignicao','provocou uma ignição intencional','O foco inicial indica ignição deliberada, não falha elétrica.']],action:(thing,method)=>`${method} junto a ${thing}`,cover:(thing,container)=>`escondeu materiais ligados ao incêndio em ${container}`,evidence:(thing,container,target,approach)=>[`O foco do incêndio começou perto de ${thing}, em ${target}.`,`Um recipiente semelhante a ${container} apresenta vestígios recentes em ${approach}.`],intro:(thing,target)=>`um incêndio suspeito atingiu ${thing} em ${target}`},
{id:'vazamento',label:'Vazamento de informações',titles:['Segredos expostos','O arquivo confidencial'],things:['um relatório confidencial','um contrato sigiloso','um dossiê reservado'],methods:[['fotografia','registrou clandestinamente o conteúdo','O acesso ao material deixou sinais de manuseio recente.'],['copia','produziu uma cópia não autorizada','Há indícios de reprodução não autorizada do documento.']],action:(thing,method)=>`${method} de ${thing} para divulgar suas informações`,cover:(thing,container)=>`ocultou o material utilizado para a cópia em ${container}`,evidence:(thing,container,target,approach)=>[`Informações de ${thing}, guardado em ${target}, foram divulgadas.`,`Um recipiente semelhante a ${container} foi movido em ${approach}.`],intro:(thing,target)=>`informações de ${thing}, guardado em ${target}, foram divulgadas sem autorização`}
];
const secretTypes=[{id:'documento',act:'consultou documentos sem autorização',trace:'remexendo documentos reservados'},{id:'dinheiro',act:'pegou dinheiro de uma gaveta',trace:'guardando dinheiro no bolso'},{id:'carta',act:'escondeu uma carta pessoal que encontrou',trace:'escondendo uma carta'},{id:'foto',act:'fotografou uma área restrita',trace:'fotografando uma área restrita'},{id:'objeto',act:'levou um objeto pequeno sem permissão',trace:'guardando um objeto que não lhe pertencia'},{id:'mentira',act:'procurou alguém secretamente e mentiu sobre isso',trace:'fazendo perguntas suspeitas'}];
function RNG(seed){let a=(Number(seed)>>>0)||1;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296}}
const pick=(a,r)=>a[Math.floor(r()*a.length)];function shuffled(a,r){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function route(graph,a,b){if(a===b)return[a];const q=[[a]],seen=new Set([a]);while(q.length){let p=q.shift();for(const n of graph[p.at(-1)]){if(seen.has(n))continue;let np=[...p,n];if(n===b)return np;seen.add(n);q.push(np)}}throw Error('Ambientes desconectados')}
function clock(t){let n=21*60+40+t;return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
function make(seed,n){const r=RNG(seed),w=pick(worlds,r),rooms=Object.keys(w.rooms),people=shuffled(roster.slice(0,n),r),culprit=pick(people,r),innocents=people.filter(x=>x!==culprit),target=pick(w.targets,r),approach=pick(w.rooms[target],r),crime=pick(crimes,r),object=pick(crime.things,r),container=pick(w.containers,r),methodChoice=pick(crime.methods,r),method={id:methodChoice[0],text:methodChoice[1],clue:methodChoice[2]},crimeAt=7,caseStart=0,caseEnd=14;
// Uma rota contínua, com no máximo uma passagem por minuto.
const culpritRoute=route(w.rooms,pick(rooms.filter(x=>x!==target),r),approach);const positions={};for(const p of people)positions[p]=Array(15).fill(null);
let start=Math.max(0,4-culpritRoute.length+1);for(let t=0;t<start;t++)positions[culprit][t]=culpritRoute[0];culpritRoute.forEach((room,i)=>{positions[culprit][start+i]=room});for(let t=start+culpritRoute.length;t<=5;t++)positions[culprit][t]=approach;positions[culprit][6]=target;positions[culprit][7]=target;positions[culprit][8]=approach;positions[culprit][9]=approach;let after=route(w.rooms,approach,pick(w.rooms[approach],r));for(let t=10;t<=14;t++)positions[culprit][t]=after[Math.min(t-10,after.length-1)];
// Inocentes seguem trajetos válidos. Ninguém é forçado a testemunhar o culpado.
// Regra de cena: ninguém inocente divide o ambiente com a execução do crime.
// Evita que uma testemunha esteja presente no ato e, mesmo assim, não o perceba.
// Geramos a trajetória inteira novamente até satisfazer a restrição, sem teletransportes.
for(const p of innocents){
 let accepted=false;
 for(let attempt=0;attempt<2000&&!accepted;attempt++){
  const trial=[];let cur=pick(rooms.filter(x=>x!==target),r);
  for(let t=0;t<=14;t++){
   if(t>0&&r()<0.53)cur=pick([cur,...w.rooms[cur]],r);
   trial[t]=cur;
  }
  if([6,7,8].some(t=>trial[t]===target))continue;
  positions[p]=trial;accepted=true;
 }
 if(!accepted){ // rota válida de segurança: ficar em um cômodo diferente do crime
  const safe=pick(rooms.filter(x=>x!==target),r);positions[p]=Array(15).fill(safe);
 }
}
// Há rastros de presença em diferentes ambientes, sem observação direta do ato criminoso.
const witnesses=[];
// Segredos são acontecimentos reais, e as observações de terceiros só surgem se houver copresença.
const events=[],cards={};for(const p of people)cards[p]={name:p,role:p===culprit?'culpado':'inocente',secret:'',knowledge:[],own:[],observedEventIds:[]};
const add=(e)=>{e.id='e'+String(events.length+1).padStart(2,'0');events.push(e);return e};
const entry=add({at:5,actor:culprit,room:approach,type:'movimento',action:`passou por ${approach} em direção a ${target}`});
const theft=add({at:7,actor:culprit,room:target,type:'crime',action:crime.action(object,method.text)});
const stash=add({at:9,actor:culprit,room:approach,type:'ocultacao',action:`${crime.cover(object,container)} em ${approach}`});
cards[culprit].secret=`Você cometeu o crime de ${crime.label.toLowerCase()}.`;cards[culprit].own=[`Às ${clock(5)}, você passou por ${approach}.`,`Às ${clock(7)}, em ${target}, você ${crime.action(object,method.text)}.`,`Às ${clock(9)}, você ${crime.cover(object,container)} em ${approach}.`,'Você NÃO sabe quem o observou nem quais evidências surgirão.'];
for(let i=0;i<innocents.length;i++){const p=innocents[i],type=secretTypes[i%secretTypes.length],at=2+i*2,room=positions[p][at],ev=add({at,actor:p,room,type:'segredo',action:type.act,trace:type.trace});cards[p].secret=`Às ${clock(at)}, em ${room}, você ${type.act}.`;cards[p].own.push(`Você sabe que esteve em ${room} às ${clock(at)}.`)}
// Observações só são atribuídas quando há copresença. Nada de identificar
// a entrada no local do crime ou o recipiente exato usado na ocultação.
for(const e of events){for(const p of people){
 if(p===e.actor||positions[p][e.at]!==e.room||e.type==='crime')continue;
 if(e.type==='movimento'||e.type==='ocultacao')continue; // atos do culpado não são entregues prontos
 const observation=`Às ${clock(e.at)}, em ${e.room}, você viu ${e.actor} ${e.trace}.`;
 cards[p].knowledge.push({eventId:e.id,text:observation});cards[p].observedEventIds.push(e.id);
}}
// Observações neutras de copresença, sobre pessoas diversas, fora do instante exato do crime.
// Os relatos não descrevem o que a pessoa fazia nem implicam autoria.
for(const p of people){
 const options=[];
 for(let t=0;t<=14;t++){
  if(t>=6&&t<=9)continue;
  for(const other of people)if(other!==p&&positions[other][t]===positions[p][t])options.push({at:t,room:positions[p][t],other});
 }
 const chosen=shuffled(options,r).slice(0,2);
 for(const o of chosen){cards[p].knowledge.push({eventId:null,subject:o.other,at:o.at,room:o.room,text:`Por volta de ${clock(o.at)}, você cruzou com ${o.other} em ${o.room}. Não sabe de onde essa pessoa veio nem para onde foi.`});}
}
// Se o sorteio casual deixar alguém sem informação, ele ganha uma observação de presença real (não uma invenção).
for(const p of innocents){if(cards[p].knowledge.length)continue;let options=[];for(let t=0;t<=14;t++)for(const other of people)if(other!==p&&positions[other][t]===positions[p][t]&&!(t>=6&&t<=9))options.push({at:t,room:positions[p][t],other});if(options.length){const o=pick(options,r);cards[p].knowledge.push({eventId:null,text:`Às ${clock(o.at)}, você encontrou ${o.other} em ${o.room}. Não sabe o que essa pessoa fazia.`})}else cards[p].knowledge.push({eventId:null,text:`Você se lembra de ter passado por ${positions[p][4]} por volta de ${clock(4)}. Não sabe quem esteve ali depois.`})}
// Culpado só recebe os próprios atos, sem lista de testemunhas.
// Motivações por categoria, distribuídas entre todos os participantes.
const motives={
 furto:['Precisava quitar uma dívida e sabia do valor do objeto.','Acreditava que o objeto lhe pertencia por direito.','Queria impedir que outra pessoa ficasse com o objeto.'],
 homicidio:['Tinha um conflito antigo com a vítima.','Temia que a vítima revelasse uma fraude.','Culpava a vítima por uma perda pessoal.'],
 agressao:['Havia discutido publicamente com a vítima.','Acreditava ter sido ameaçado pela vítima.','Queria impedir que a vítima revelasse um segredo.'],
 sabotagem:['Queria prejudicar o organizador do evento.','Teria vantagem se a atividade fosse interrompida.','Queria desacreditar o responsável pelo equipamento.'],
 incendio:['Queria destruir registros comprometedores.','Tinha interesse em interromper o evento.','Queria causar prejuízo ao proprietário.'],
 vazamento:['Desejava expor uma irregularidade.','Pretendia obter vantagem com as informações.','Queria prejudicar a reputação de um rival.']
};
const motivationPool=shuffled(motives[crime.id],r);
for(let i=0;i<people.length;i++){
 const p=people[i];cards[p].motive=motivationPool[i%motivationPool.length];cards[p].motiveContext=`Essa tensão existia antes do ocorrido em ${w.place}; não comprova participação no crime.`;
 cards[p].alibi={at:7,claimedRoom:null,trueRoom:positions[p][7],truthful:p!==culprit};
 if(p!==culprit){
  cards[p].alibi.claimedRoom=positions[p][7];
  cards[p].own.push(`Seu álibi: às ${clock(7)}, você estava em ${positions[p][7]}. Você pode contar a verdade ou mentir para proteger seu segredo.`);
 }else{
  const safe=rooms.filter(room=>room!==target);
  cards[p].alibi.claimedRoom=pick(safe,r);
  cards[p].own.push(`Álibi preparado: se perguntarem sobre ${clock(7)}, você pode dizer que estava em ${cards[p].alibi.claimedRoom}. Essa versão é falsa; adapte sua defesa como quiser.`);
 }
 cards[p].own.push(`Possível motivo que pode levantar suspeitas: ${cards[p].motive}`);
}
// Álibis no instante do crime são corroborados somente por inocentes fora da cena.
// Ninguém recebe o culpado como testemunha de presença no instante do crime.
const corroborations=[];
for(const p of innocents){
 const same=innocents.filter(other=>other!==p&&positions[other][7]===positions[p][7]);
 if(same.length){const witness=pick(same,r);corroborations.push({person:p,witness,at:7,room:positions[p][7]});
 cards[witness].knowledge.push({eventId:null,text:`Às ${clock(7)}, você encontrou ${p} em ${positions[p][7]}. Isso pode confirmar parte do álibi dessa pessoa.`});}
}
// Evidências circunstanciais: derivadas de fatos verificáveis, sem identificação de autor.
// Nenhuma combinação de evidências públicas produz uma lista fechada de suspeitos.
const ambiguousLocation=pick(rooms.filter(x=>x!==target),r);
const secretEvent=pick(events.filter(x=>x.type==='segredo'),r);
const nearby=shuffled([...new Set([approach,...w.rooms[approach]])].filter(x=>x!==target),r);
const genericByCrime={
 furto:['A organização informou que havia mais de uma pessoa com acesso habitual aos objetos guardados.','A conferência do inventário começou depois de várias pessoas circularem pela área.'],
 homicidio:['Pessoas próximas à vítima relataram desentendimentos anteriores, sem indicar um único responsável.','O exame preliminar ainda não estabelece a sequência completa dos acontecimentos.'],
 agressao:['A vítima não conseguiu fornecer um relato completo do momento do ataque.','Testemunhas mencionaram tensões anteriores entre diferentes presentes.'],
 sabotagem:['O equipamento já havia recebido manutenção e sido utilizado por diferentes pessoas.','O histórico do sistema não registra a identidade de quem fez a última intervenção.'],
 incendio:['O local foi evacuado antes de uma inspeção completa dos objetos próximos ao foco.','A circulação de pessoas e materiais dificultou reconstruir os minutos anteriores ao fogo.'],
 vazamento:['O material havia sido consultado por mais de uma pessoa antes da divulgação.','O horário em que as informações vieram a público não determina quando foram copiadas.']
};
const clues=[
 {id:'p1',source:'cronologia',text:`O incidente ocorreu em algum momento entre ${clock(5)} e ${clock(10)}. Não foi possível determinar o minuto exato.`,grounding:{kind:'window',start:5,end:10}},
 {id:'p2',source:'contexto',text:pick(genericByCrime[crime.id],r),grounding:{kind:'scenario',crime:crime.id}},
 {id:'p3',source:'movimentacao',text:`A passagem entre ${approach} e ${target} era acessível. Não existe um registro confiável de quem a utilizou durante o período investigado.`,grounding:{kind:'adjacency',a:approach,b:target}},
 {id:'p4',source:'acontecimento_paralelo',text:`Foi constatado que houve uma atividade não autorizada em ${secretEvent.room} durante o período do encontro. Ainda não se sabe quem a realizou nem se tem relação com o crime.`,grounding:{kind:'event',eventId:secretEvent.id,room:secretEvent.room}},
 {id:'p5',source:'contexto_local',text:`A circulação por ${ambiguousLocation} não foi acompanhada continuamente. Estar nesse ambiente, por si só, não comprova participação no crime.`,grounding:{kind:'room',room:ambiguousLocation}}
];
// Todas as pistas são circunstanciais: não associam nomes, traços exclusivos ou
// características identificadoras a vestígios. O relato dos jogadores é decisivo.
const pub={title:pick(crime.titles,r),crimeType:crime.label,place:w.place,object,target,window:`${clock(5)}–${clock(10)}`,discovery:clock(14),rooms:rooms.map(name=>({name,connections:w.rooms[name]})),intro:`Durante um encontro em ${w.place}, ${crime.intro(object,target)}. O ocorrido foi descoberto às ${clock(14)}. Todos os presentes podem ter algo a esconder.`};
return{version:9,seed:Number(seed),public:pub,players:people,private:cards,evidence:clues,internal:{culprit,crimeType:crime.id,method:method.id,events:events.sort((a,b)=>a.at-b.at),positions,corroborations,solution:`${culprit} chegou a ${target} por ${approach}, ${crime.action(object,method.text)} e depois ${crime.cover(object,container)} em ${approach}.`,witnesses}}}
function validate(d){let err=[],rooms=new Map(d.public.rooms.map(x=>[x.name,new Set(x.connections)])),ps=d.internal.positions,evs=d.internal.events;for(const [room,connections] of rooms)for(const to of connections)if(!rooms.has(to)||!rooms.get(to).has(room))err.push(`Ligação inválida: ${room}/${to}`);for(const p of d.players){const a=ps[p];if(!a||a.length!==15)err.push(`Rota incompleta: ${p}`);else for(let t=1;t<a.length;t++)if(a[t]!==a[t-1]&&!rooms.get(a[t-1])?.has(a[t]))err.push(`Teleporte: ${p}, minuto ${t}`);if(!d.private[p]?.knowledge.length&&!d.private[p]?.own.length)err.push(`Sem informações: ${p}`)}for(const e of evs)if(ps[e.actor][e.at]!==e.room)err.push(`Evento incompatível com rota: ${e.id}`);for(const p of d.players)for(const k of d.private[p].knowledge){if(!k.eventId)continue;const e=evs.find(x=>x.id===k.eventId);if(!e||e.actor===p||ps[p][e.at]!==e.room)err.push(`Observação impossível: ${p}/${k.eventId}`)}if(d.players.filter(p=>d.private[p].role==='culpado').length!==1)err.push('Culpado inconsistente');if(d.private[d.internal.culprit].knowledge.some(k=>k.eventId&&evs.find(e=>e.id===k.eventId)?.actor===d.internal.culprit))err.push('Culpado recebeu informação de quem o testemunhou');if(d.evidence.length!==5)err.push('Evidências ausentes');if(!crimes.some(c=>c.id===d.internal.crimeType))err.push('Categoria inválida');if(d.evidence.some(c=>!c.text||c.text.includes('undefined')))err.push('Pista incompleta');if(d.evidence.some(c=>c.text.includes(d.internal.culprit)))err.push('Evidência nomeia o culpado');for(const clue of d.evidence){
 if(d.players.some(p=>new RegExp('\\b'+p+'\\b','i').test(clue.text)))err.push('Evidência pública nomeia participante: '+clue.id);
 const g=clue.grounding||{};
 if(g.kind==='adjacency'&&!rooms.get(g.a)?.has(g.b))err.push('Passagem inexistente: '+clue.id);
 if(g.kind==='event'){const ev=evs.find(x=>x.id===g.eventId);if(!ev||ev.room!==g.room||ev.type!=='segredo')err.push('Pista sem acontecimento real: '+clue.id);}
 if(g.kind==='room'&&!rooms.has(g.room))err.push('Pista menciona ambiente inexistente: '+clue.id);
 if(g.kind==='window'&&!(g.start<=7&&g.end>=7))err.push('Janela de crime incompatível: '+clue.id);
 if(!g.kind)err.push('Pista sem origem auditável: '+clue.id);
}
for(const p of d.players){for(const k of d.private[p].knowledge){if(k.text.includes(`viu ${d.internal.culprit} perto do acesso`)||k.text.includes(`viu ${d.internal.culprit} manuseando`))err.push('Testemunho direto comprometedor');if(k.subject&&d.internal.positions[k.subject][k.at]!==k.room)err.push('Copresença não confirmada');}}

for(const p of d.players){const c=d.private[p],a=c.alibi;if(!a||a.trueRoom!==ps[p][7])err.push('Álibi sem base: '+p);if(a&&a.truthful!==(a.claimedRoom===a.trueRoom))err.push('Verdade do álibi inconsistente: '+p);if(!c.motive)err.push('Motivação ausente: '+p)}
for(const a of d.internal.corroborations||[])if(ps[a.person][a.at]!==a.room||ps[a.witness][a.at]!==a.room)err.push('Corroboração impossível');
const target=d.public.target,culprit=d.internal.culprit;
for(const p of d.players){
 if(p!==culprit&&[6,7,8].some(t=>ps[p][t]===target))err.push(`Inocente presente na cena do crime: ${p}`);
 for(const k of d.private[p].knowledge){
  if(k.at===7&&k.room===target)err.push(`Testemunho na cena durante o crime: ${p}`);
  if(p===culprit&&k.at===7&&k.subject&&k.subject!==culprit)err.push(`Culpado incrimina inocente no minuto do crime: ${k.subject}`);
 }
}
for(const a of d.internal.corroborations||[])if(a.witness===culprit)err.push(`Culpado confirma álibi no minuto do crime: ${a.person}`);
return err}

window.AlibiEngine = null;
window.AlibiEngine={make,validate};
