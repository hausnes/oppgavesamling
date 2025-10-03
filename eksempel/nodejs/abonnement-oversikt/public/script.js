const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

let catChart;

function nok(n){
	try{
		return new Intl.NumberFormat('no-NO', { style:'currency', currency:'NOK', maximumFractionDigits: 0 }).format(n);
	}catch{ return `${Math.round(n)},-`; }
}

async function api(path, opts={}){
	const res = await fetch(path, { headers: { 'Content-Type':'application/json' }, credentials:'same-origin', ...opts });
	const ct = res.headers.get('content-type')||'';
	const data = ct.includes('application/json') ? await res.json() : await res.text();
	if(!res.ok) throw Object.assign(new Error(data?.error || res.statusText), { status: res.status, data });
	return data;
}

function show(node){ node.classList.remove('hidden'); }
function hide(node){ node.classList.add('hidden'); }

function renderList(items){
	const ul = $('#subs-list');
	ul.innerHTML = '';
	if(!items.length){ show($('#list-empty')); return; } else { hide($('#list-empty')); }
	for(const s of items){
		const li = document.createElement('li');
		li.className = 'item';
		li.innerHTML = `
			<div>
				<div class="title">${escapeHtml(s.name)} ${s.is_active?'' : '<span class="muted">(inaktiv)</span>'}</div>
				<div class="meta">
					${s.category ? `<span>${escapeHtml(s.category)} · </span>`:''}
					${s.url ? `<a href="${escapeAttr(s.url)}" target="_blank" rel="noreferrer">Lenke</a> · `:''}
					<span class="price">${nok(s.price_cents/100)}/mnd</span>
				</div>
			</div>
			<div class="row-actions">
				<button class="btn btn-ghost" data-act="edit">Rediger</button>
				<button class="btn btn-ghost" data-act="toggle">${s.is_active? 'Deaktiver' : 'Aktiver'}</button>
				<button class="btn btn-ghost" data-act="delete">Slett</button>
			</div>
		`;
		li.dataset.id = s.id;
		ul.appendChild(li);
	}
}

function escapeHtml(s){ return String(s??'').replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
function escapeAttr(s){ return escapeHtml(s).replace(/"/g,'&quot;'); }

async function refresh(){
	try{
		const { items } = await api('/api/subscriptions');
		renderList(items);
		await refreshStats();
	}catch(e){ console.error(e); }
}

async function refreshStats(){
	const s = await api('/api/stats/summary');
	$('#stat-total').textContent = nok(s.monthlyTotal);
	$('#stat-count').textContent = s.activeCount;

	const labels = s.byCategory.map(x=>x.category);
	const values = s.byCategory.map(x=>x.monthly);
	const ctx = $('#catChart');
	const data = {
		labels,
		datasets: [{
			data: values,
			backgroundColor: gradientColors(values.length),
			borderWidth: 0
		}]
	};
	if(catChart){ catChart.destroy(); }
	catChart = new Chart(ctx, { type:'doughnut', data, options: { plugins: { legend: { labels: { color: '#e8ecf8' } } } } });
}

function gradientColors(n){
	const base = [
		'#7C9AFF','#65D6AD','#FFB86B','#FF6B8B','#B794F4','#5AD1E6','#FFD166','#EF476F','#06D6A0','#118AB2'
	];
	const arr=[]; for(let i=0;i<n;i++) arr.push(base[i%base.length]); return arr;
}

function setAuthed(user){
	if(user){
		hide($('#auth-section'));
		show($('#app-section'));
		show($('#nav-auth'));
		$('#nav-username').textContent = user.name || user.email;
		refresh();
	} else {
		show($('#auth-section'));
		hide($('#app-section'));
		hide($('#nav-auth'));
	}
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
	try{
		const me = await api('/api/me');
		setAuthed(me.user);
	}catch{ setAuthed(null); }

	$('#login-form').addEventListener('submit', async (e)=>{
		e.preventDefault();
		$('#auth-error').textContent='';
		const fd = new FormData(e.currentTarget);
		const payload = Object.fromEntries(fd.entries());
		try{
			const res = await api('/api/login',{ method:'POST', body: JSON.stringify(payload) });
			setAuthed(res.user);
		}catch(err){ $('#auth-error').textContent = err.data?.error || 'Kunne ikke logge inn'; }
	});

	$('#register-form').addEventListener('submit', async (e)=>{
		e.preventDefault();
		$('#auth-error').textContent='';
		const fd = new FormData(e.currentTarget);
		const payload = Object.fromEntries(fd.entries());
		try{
			const res = await api('/api/register',{ method:'POST', body: JSON.stringify(payload) });
			setAuthed(res.user);
		}catch(err){ $('#auth-error').textContent = err.data?.error || 'Kunne ikke registrere'; }
	});

	$('#btn-logout').addEventListener('click', async ()=>{ await api('/api/logout',{ method:'POST' }); setAuthed(null); });

	$('#btn-new').addEventListener('click', ()=> openDialog());

	$('#sub-form').addEventListener('submit', async (e)=>{
		e.preventDefault();
		$('#form-error').textContent='';
		const fd = new FormData(e.currentTarget);
		const data = Object.fromEntries(fd.entries());
		const id = data.id; delete data.id;
		data.is_active = fd.get('is_active') ? 1 : 0;
		try{
			if(id){
				await api(`/api/subscriptions/${id}`, { method:'PUT', body: JSON.stringify(data) });
			}else{
				await api('/api/subscriptions', { method:'POST', body: JSON.stringify(data) });
			}
			closeDialog();
			await refresh();
		}catch(err){ $('#form-error').textContent = err.data?.error || 'Kunne ikke lagre'; }
	});

	$('#sub-dialog').addEventListener('click', (e)=>{
		if(e.target.nodeName === 'DIALOG') closeDialog();
	});

	$('#sub-form').querySelector('[type="button"]').addEventListener('click', ()=> closeDialog());

	$('#subs-list').addEventListener('click', async (e)=>{
		const btn = e.target.closest('button'); if(!btn) return;
		const li = e.target.closest('li.item'); const id = li?.dataset.id; if(!id) return;
		const act = btn.dataset.act;
		const { items } = await api('/api/subscriptions');
		const sub = items.find(s=>String(s.id)===String(id));
		if(!sub) return;
		if(act==='edit'){
			openDialog(sub);
		} else if(act==='toggle'){
			await api(`/api/subscriptions/${id}`, { method:'PUT', body: JSON.stringify({ is_active: sub.is_active?0:1 }) });
			await refresh();
		} else if(act==='delete'){
			if(confirm(`Slette ${sub.name}?`)){
				await api(`/api/subscriptions/${id}`, { method:'DELETE' });
				await refresh();
			}
		}
	});
});

function openDialog(sub){
	$('#dialog-title').textContent = sub? 'Rediger abonnement' : 'Nytt abonnement';
	const f = $('#sub-form');
	f.reset();
	f.id.value = sub?.id || '';
	f.name.value = sub?.name || '';
	f.description.value = sub?.description || '';
	f.url.value = sub?.url || '';
	f.price.value = sub ? (sub.price_cents/100).toFixed(2) : '';
	f.category.value = sub?.category || '';
	f.billing_cycle.value = sub?.billing_cycle || 'monthly';
	f.start_date.value = sub?.start_date || '';
	f.is_active.checked = !!(sub?.is_active ?? 1);
	$('#sub-dialog').showModal();
}
function closeDialog(){ $('#sub-dialog').close(); }
