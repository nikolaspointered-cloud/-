// Basic frame-bust to avoid clickjacking when embedded
if (window.top && window.top !== window.self) {
  try{ window.top.location = window.location.href; }catch(e){ /* ignore */ }
}

// Данные товаров: имя, цена, массив изображений, гарантия, кредит
const products = [
  {
    id: 'p1',
    name: 'Смартфон X-Pro 12',
    price: 49990,
    warranty: '24 месяца официальной гарантии',
    images: [
      'https://source.unsplash.com/800x600/?smartphone',
      'https://source.unsplash.com/800x600/?smartphone,phone',
      'https://source.unsplash.com/800x600/?mobile',
      'https://source.unsplash.com/800x600/?electronics'
    ]
  },
  {
    id: 'p2',
    name: 'Ноутбук UltraBook 14',
    price: 89990,
    warranty: '12 месяцев + расширенная поддержка 1 год',
    images: [
      'https://source.unsplash.com/800x600/?laptop',
      'https://source.unsplash.com/800x600/?notebook',
      'https://source.unsplash.com/800x600/?laptop,work',
      'https://source.unsplash.com/800x600/?electronics,computer'
    ]
  },
  {
    id: 'p3',
    name: 'Наушники SoundMax Pro',
    price: 7990,
    warranty: '12 месяцев официальной гарантии',
    images: [
      'https://source.unsplash.com/800x600/?headphones',
      'https://source.unsplash.com/800x600/?headset',
      'https://source.unsplash.com/800x600/?audio',
      'https://source.unsplash.com/800x600/?music'
    ]
  },
  {
    id: 'p4',
    name: 'Экшн-камера Adventure 4K',
    price: 15990,
    warranty: '24 месяца с возможностью продления',
    images: [
      'https://source.unsplash.com/800x600/?camera',
      'https://source.unsplash.com/800x600/?gopro',
      'https://source.unsplash.com/800x600/?sport,camera',
      'https://source.unsplash.com/800x600/?photography'
    ]
  },
  {
    id: 'p5',
    name: 'Умные часы TimeFit S3',
    price: 5990,
    warranty: '12 месяцев официальной гарантии',
    images: [
      'https://source.unsplash.com/800x600/?smartwatch',
      'https://source.unsplash.com/800x600/?watch',
      'https://source.unsplash.com/800x600/?wearable',
      'https://source.unsplash.com/800x600/?fitness'
    ]
  },
  {
    id: 'p6',
    name: 'Колонка BoomBeat 50W',
    price: 3990,
    warranty: '6 месяцев гарантийного обслуживания',
    images: [
      'https://source.unsplash.com/800x600/?speaker',
      'https://source.unsplash.com/800x600/?audio,speaker',
      'https://source.unsplash.com/800x600/?music,speaker',
      'https://source.unsplash.com/800x600/?party'
    ]
  }
  ,{
    id: 'p7', name: 'Планшет TabView 11', price: 24990, warranty: '12 мес', credit: 'Кредит от 0% / рассрочка 12 мес', images: ['https://source.unsplash.com/800x600/?tablet','https://source.unsplash.com/800x600/?tablet,ipad','https://source.unsplash.com/800x600/?tablet,tech']
  },{
    id: 'p8', name: 'Монитор UltraView 27"', price: 19990, warranty: '24 мес', credit: 'Рассрочка 6 мес', images: ['https://source.unsplash.com/800x600/?monitor','https://source.unsplash.com/800x600/?screen','https://source.unsplash.com/800x600/?display']
  },{
    id: 'p9', name: 'Клавиатура Mechanical Pro', price: 3990, warranty: '12 мес', credit: 'Кредит 3 мес', images: ['https://source.unsplash.com/800x600/?keyboard','https://source.unsplash.com/800x600/?mechanical,keyboard']
  },{
    id: 'p10', name: 'Мышь Precision X', price: 1290, warranty: '12 мес', credit: 'Рассрочка 2 мес', images: ['https://source.unsplash.com/800x600/?mouse','https://source.unsplash.com/800x600/?computer,mouse']
  },{
    id: 'p11', name: 'Роутер SpeedNet AX', price: 4990, warranty: '24 мес', credit: 'Кредит 6 мес', images: ['https://source.unsplash.com/800x600/?router','https://source.unsplash.com/800x600/?wifi']
  },{
    id: 'p12', name: 'SSD Flash 1TB', price: 7490, warranty: '36 мес', credit: 'Рассрочка 3 мес', images: ['https://source.unsplash.com/800x600/?ssd','https://source.unsplash.com/800x600/?storage']
  },{
    id: 'p13', name: 'Камера видеонаблюдения HomeCam', price: 2990, warranty: '12 мес', credit: 'Кредит 4 мес', images: ['https://source.unsplash.com/800x600/?security,camera','https://source.unsplash.com/800x600/?camera,home']
  },{
    id: 'p14', name: 'Пауэрбанк PowerMax 20000mAh', price: 2190, warranty: '6 мес', credit: 'Рассрочка 2 мес', images: ['https://source.unsplash.com/800x600/?powerbank','https://source.unsplash.com/800x600/?battery']
  }
];

// Корзина хранится в localStorage, формат: {productId: qty}
let cart = JSON.parse(localStorage.getItem('cart_v1') || '{}');

function formatPrice(n){ return n.toLocaleString('ru-RU') + ' ₽'; }

function saveCart(){ localStorage.setItem('cart_v1', JSON.stringify(cart)); updateCartCount(); renderProducts(); }

function updateCartCount(){
  const count = Object.values(cart).reduce((s,q)=>s+q,0);
  document.getElementById('cart-count').textContent = count;
}

function renderProducts(){
  const root = document.getElementById('products');
  root.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';

    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    const img = document.createElement('img');
    img.src = p.images[0];
    img.alt = p.name;
    carousel.appendChild(img);

    const dots = document.createElement('div'); dots.className = 'dots';
    p.images.forEach((src,i)=>{
      const dot = document.createElement('button'); dot.className='dot';
      dot.addEventListener('click',()=>{ img.src = src; });
      dots.appendChild(dot);
    });
    carousel.appendChild(dots);

    const body = document.createElement('div'); body.className = 'product-body';
    const title = document.createElement('h3'); title.className='product-title'; title.textContent = p.name;
    const price = document.createElement('div'); price.className='price'; price.textContent = formatPrice(p.price);
    const warranty = document.createElement('div'); warranty.className='warranty'; warranty.textContent = p.warranty;
    // credit / financing badge
    if(p.credit){
      const credit = document.createElement('div'); credit.className='credit-badge'; credit.textContent = p.credit; body.appendChild(credit);
    }

    const controls = document.createElement('div'); controls.className='card-controls';
    const addBtn = document.createElement('button'); addBtn.className='add-btn';
    // если товар уже в корзине — нельзя сохранить несколько раз
    if(cart[p.id]){
      addBtn.textContent = 'В корзине';
      addBtn.disabled = true;
    } else {
      addBtn.textContent = 'Добавить в корзину';
      addBtn.disabled = false;
    }
    addBtn.addEventListener('click',()=>{ addToCart(p.id); });
    const more = document.createElement('button'); more.className='more-btn'; more.textContent='Подробнее';
    more.addEventListener('click',()=>{ alert(p.name + '\n' + formatPrice(p.price) + '\n' + p.warranty); });

    controls.appendChild(addBtn); controls.appendChild(more);

    body.appendChild(title); body.appendChild(price); body.appendChild(warranty); body.appendChild(controls);

    card.appendChild(carousel); card.appendChild(body);
    root.appendChild(card);
    // entrance animation with a slight stagger
    setTimeout(()=> card.classList.add('enter'), 60 * (Math.min(10, Math.floor(Math.random()*6))));
  });
}

function addToCart(productId){
  // разрешаем добавлять товар только один раз; если уже есть — просто анимируем кнопку корзины
  if(cart[productId]){
    animateCart();
    return;
  }
  cart[productId] = 1;
  saveCart();
  renderCart();
  animateCart();
}

function renderCart(){
  const itemsRoot = document.getElementById('cart-items');
  itemsRoot.innerHTML = '';
  let total = 0;
  for(const [id,qty] of Object.entries(cart)){
    const product = products.find(p=>p.id===id);
    if(!product) continue;
    const row = document.createElement('div'); row.className='cart-item';
    const img = document.createElement('img'); img.src = product.images[0];
    const info = document.createElement('div'); info.style.flex='1';
    const name = document.createElement('div'); name.textContent = product.name;
    const price = document.createElement('div'); price.textContent = formatPrice(product.price);
    const qtyWrap = document.createElement('div'); qtyWrap.className='qty-controls';
    const dec = document.createElement('button'); dec.textContent='-'; dec.addEventListener('click',()=>{ changeQty(id,-1); });
    const q = document.createElement('span'); q.textContent=qty; q.style.minWidth='20px'; q.style.display='inline-block'; q.style.textAlign='center';
    // запрещаем увеличивать количество — только одно сохранение разрешено
    const inc = document.createElement('button'); inc.textContent='+'; inc.disabled = true;
    const remove = document.createElement('button'); remove.textContent='Удалить'; remove.style.marginLeft='8px'; remove.addEventListener('click',()=>{ removeItem(id); });
    qtyWrap.appendChild(dec); qtyWrap.appendChild(q); qtyWrap.appendChild(inc); qtyWrap.appendChild(remove);

    info.appendChild(name); info.appendChild(price); info.appendChild(qtyWrap);
    row.appendChild(img); row.appendChild(info);
    itemsRoot.appendChild(row);
    total += product.price * qty;
  }
  document.getElementById('cart-total').textContent = formatPrice(total);
  updateCartCount();
}

function changeQty(id,delta){
  cart[id] = (cart[id] || 0) + delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart(); renderCart();
}

function removeItem(id){ delete cart[id]; saveCart(); renderCart(); }

function openCart(){ document.getElementById('cart').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function closeCart(){ document.getElementById('cart').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }

function checkout(){
  if(Object.keys(cart).length===0){ alert('Корзина пуста'); return; }
  alert('Спасибо! Ваш заказ принят (демо).');
  cart = {}; saveCart(); renderCart(); closeCart();
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts(); renderCart();
  document.getElementById('cart-button').addEventListener('click',openCart);
  document.getElementById('close-cart').addEventListener('click',closeCart);
  document.getElementById('overlay').addEventListener('click',closeCart);
  document.getElementById('checkout').addEventListener('click',checkout);
});

// Добавляет анимацию прыжка кнопке корзины и синий "ветер"
function animateCart(){
  const btn = document.getElementById('cart-button');
  const wind = document.getElementById('cart-wind');
  if(!btn) return;
  btn.classList.remove('bump');
  // reflow to restart animation
  void btn.offsetWidth;
  btn.classList.add('bump');
  if(wind){
    wind.classList.remove('show');
    void wind.offsetWidth;
    wind.classList.add('show');
    wind.addEventListener('animationend',()=>{ wind.classList.remove('show'); },{once:true});
  }
  // ensure bump removed after animation
  setTimeout(()=> btn.classList.remove('bump'), 700);
}
