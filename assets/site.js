'use strict';
const menuButton=document.querySelector('[data-menu-toggle]');
const navigation=document.querySelector('[data-navigation]');
function closeMenu(){if(!menuButton||!navigation)return;navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','فتح القائمة');}
menuButton?.addEventListener('click',()=>{const opened=menuButton.getAttribute('aria-expanded')==='true';navigation.classList.toggle('is-open',!opened);menuButton.setAttribute('aria-expanded',String(!opened));menuButton.setAttribute('aria-label',opened?'فتح القائمة':'إغلاق القائمة');});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{if(menuButton?.getAttribute('aria-expanded')==='true'&&!navigation.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
window.matchMedia('(min-width:801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('[data-load-video]').forEach(button=>button.addEventListener('click',()=>{
 const card=button.closest('.video-card');const slot=card.querySelector('.embed-slot');
 if(slot.querySelector('iframe'))return;
 const frame=document.createElement('iframe');frame.className='video-frame'+(button.dataset.platform==='instagram'?' instagram':'');frame.title=button.dataset.title;frame.src=button.dataset.embed;frame.allow='autoplay; encrypted-media; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';slot.append(frame);slot.hidden=false;button.hidden=true;card.querySelector('[data-player-status]').textContent='تم فتح مشغّل الفيديو. يمكنك المشاهدة هنا أو فتح المنشور الأصلي.';
}));
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
 filters.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
 let visible=0;document.querySelectorAll('.video-card[data-category]').forEach(card=>{const show=button.dataset.filter==='all'||card.dataset.category===button.dataset.filter;card.hidden=!show;if(show)visible++;if(!show){card.querySelectorAll('iframe').forEach(frame=>frame.remove());card.querySelector('.embed-slot').hidden=true;card.querySelector('[data-load-video]').hidden=false;card.querySelector('[data-player-status]').textContent='';}});
 const status=document.querySelector('[data-filter-status]');if(status)status.textContent='عدد الفيديوهات المعروضة: '+new Intl.NumberFormat('ar-EG').format(visible);
}));
