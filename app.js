const loginView=document.querySelector('#loginView'),dashboardView=document.querySelector('#dashboardView');
const loginForm=document.querySelector('#loginForm'),usernameInput=document.querySelector('#username'),passwordInput=document.querySelector('#password');
const loginError=document.querySelector('#loginError'),helloName=document.querySelector('#helloName');
const logoutBtn=document.querySelector('#logoutBtn'),amountInput=document.querySelector('#amountInput'),topupMessage=document.querySelector('#topupMessage');
const dialog=document.querySelector('#featureDialog'),dialogTitle=document.querySelector('#dialogTitle'),dialogText=document.querySelector('#dialogText');
function signIn(name){helloName.textContent=(name.trim().replace(/[<>]/g,'').slice(0,24)||'PLAYER').toUpperCase();loginView.classList.add('hidden');dashboardView.classList.remove('hidden');logoutBtn.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});}
loginForm.addEventListener('submit',e=>{e.preventDefault();if(usernameInput.value.trim().length<2||passwordInput.value.length<4){loginError.textContent='Enter a username and a password of at least 4 characters.';return;}loginError.textContent='';signIn(usernameInput.value);});
document.querySelector('#createAccount').addEventListener('click',()=>{loginError.textContent='Account creation is a demo only. Use any username and a password with 4+ characters to preview the panel.';});
function logout(){dashboardView.classList.add('hidden');loginView.classList.remove('hidden');logoutBtn.classList.add('hidden');passwordInput.value='';window.scrollTo({top:0,behavior:'smooth'});}
logoutBtn.addEventListener('click',logout);document.querySelector('#sideLogout').addEventListener('click',()=>{document.querySelector('#sideMenu').classList.add('hidden');logout();});
document.querySelector('#menuBtn').addEventListener('click',()=>document.querySelector('#sideMenu').classList.toggle('hidden'));
document.querySelectorAll('.side-menu [data-scroll]').forEach(b=>b.addEventListener('click',()=>{document.getElementById(b.dataset.scroll).scrollIntoView({behavior:'smooth'});document.querySelector('#sideMenu').classList.add('hidden');}));
document.querySelectorAll('.amount').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.amount').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');amountInput.value=b.dataset.amount;topupMessage.textContent=`₹${b.dataset.amount} selected.`;}));
document.querySelector('#continueBtn').addEventListener('click',()=>{const a=Number(amountInput.value);const qrPanel=document.querySelector('#inlinePaymentQr');if(!Number.isFinite(a)||a<1||a>100000){topupMessage.textContent='Enter an amount between ₹1 and ₹100,000.';qrPanel.classList.add('hidden');return;}topupMessage.textContent=`₹${a.toLocaleString('en-IN')} selected. Scan the UPI QR below to pay.`;qrPanel.classList.remove('hidden');qrPanel.scrollIntoView({behavior:'smooth',block:'nearest'});});
function feature(name){dialogTitle.textContent=name;const messages={'Support':'For help with your account or an order, contact the FF GLORY support team.','Send Likes':'Choose this option to request help with a player UID.','My Orders':'Your recent order details will appear here when order history is connected.','Offers':'Check the Diamond Top-Up section for available packs.','Bot Status':'View service status and system information.','FF Glory':'Browse available FF GLORY packs in the Diamond Top-Up section.','Preferences':'Preferences and display settings.','Profile':'Your player profile and account details.'};dialogText.textContent=messages[name]||'Select an option to continue.';if(dialog.showModal)dialog.showModal();else alert(dialogText.textContent);}
document.querySelectorAll('[data-feature]').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.feature==='Diamond Top-Up'){
    document.querySelector('#diamondSection').scrollIntoView({behavior:'smooth'});
    return;
  }
  feature(b.dataset.feature);
}));
document.querySelector('#walletBtn').addEventListener('click',()=>document.querySelector('#fundsCard').scrollIntoView({behavior:'smooth'}));
document.querySelector('#closeDialog').addEventListener('click',()=>dialog.close());document.querySelector('#dialogOk').addEventListener('click',()=>dialog.close());

// Diamond pack selection updates the selected pack in the interface.
document.querySelectorAll('.pack-button').forEach(b=>b.addEventListener('click',()=>{
  const message=document.querySelector('#packMessage');
  message.textContent=`${b.dataset.pack} selected — ₹${b.dataset.price}.`;
  document.querySelectorAll('.pack-button').forEach(x=>x.classList.remove('chosen'));b.classList.add('chosen');
}));
