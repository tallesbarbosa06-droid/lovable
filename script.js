const money = value => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(value);
const cart = [];
const drawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("cart-overlay");
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0);
  const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  document.getElementById("cart-count").textContent=count;
  document.getElementById("drawer-count").textContent="("+count+")";
  document.getElementById("cart-total").textContent=money(total);
  const list=document.getElementById("cart-items");
  if(!cart.length){list.innerHTML='<p class="empty-cart">Sua sacola está esperando por carinho. 🐾</p>';return;}
  list.innerHTML=cart.map((item,index)=>'<div class="cart-item"><div><strong>'+item.name+'</strong><small>'+item.qty+' × '+money(item.price)+'</small></div><div><strong>'+money(item.qty*item.price)+'</strong><br><button data-remove="'+index+'">Remover</button></div></div>').join("");
}
function openCart(){document.body.classList.add("cart-open","no-scroll");drawer.setAttribute("aria-hidden","false");}
function closeCart(){document.body.classList.remove("cart-open","no-scroll");drawer.setAttribute("aria-hidden","true");}
document.querySelectorAll(".quick-add").forEach(button=>button.addEventListener("click",()=>{
 const name=button.dataset.product,price=Number(button.dataset.price);
 const existing=cart.find(item=>item.name===name);
 if(existing)existing.qty++;else cart.push({name,price,qty:1});
 renderCart();openCart();
}));
document.getElementById("cart-open").addEventListener("click",openCart);
document.getElementById("cart-close").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("cart-items").addEventListener("click",event=>{
 const index=event.target.dataset.remove;
 if(index!==undefined){cart.splice(Number(index),1);renderCart();}
});
document.getElementById("checkout-button").addEventListener("click",()=>{
 if(!cart.length){alert("Adicione pelo menos um produto à sua sacola.");return;}
 alert("Seu carrinho está funcionando! Para receber pedidos reais, conecte este botão ao seu checkout ou WhatsApp nas configurações da loja.");
});
document.querySelectorAll(".filter-pill").forEach(button=>button.addEventListener("click",()=>{
 document.querySelectorAll(".filter-pill").forEach(item=>item.classList.remove("active"));
 button.classList.add("active");
 document.querySelectorAll(".product-card").forEach(card=>{
  card.hidden=button.dataset.filter!=="todos"&&card.dataset.category!==button.dataset.filter;
 });
}));
document.getElementById("newsletter-form").addEventListener("submit",event=>{
 event.preventDefault();
 document.getElementById("newsletter-message").textContent="Cadastro demonstrativo recebido. Conecte um serviço de e-mail para armazenar contatos.";
 event.target.reset();
});
const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
menuButton.addEventListener("click",()=>{
 const expanded=menuButton.getAttribute("aria-expanded")==="true";
 menuButton.setAttribute("aria-expanded",String(!expanded));
 nav.classList.toggle("open",!expanded);
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();