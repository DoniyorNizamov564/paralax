class Parallax {
    constructor(obj){
        this.clouds = document.querySelectorAll(obj.clouds);
        this.boat = document.querySelector(obj.boat);
        this.bg = document.querySelector(obj.bg);
        window.addEventListener('scroll', ()=>{
            this.move()
        })
        
    }
    move(){
        this.boat.style.transform = `translateX(${window.scrollY}px)`;
        this.bg.style.objectPosition = `0 ${50 + window.scrollY / 10}%`;
        this.clouds.forEach( (elem)=>{
            let speed = elem.getAttribute('data-speed')
            elem.style.transform = `translateX(${window.scrollY * speed}px)`;
        } )
    }
}

const parallax = new Parallax({
    clouds: '.header__cloud',
    boat: '.header__boat',
    bg: '.header__fantasy'
})

class Text {
    constructor(selector){
        if (typeof selector == 'string') {
            this.title = document.querySelector(selector);
        } else if(selector instanceof HTMLElement) {
            this.title = selector;
        }
        this.fullText = this.title.innerHTML;
        this.title.innerHTML = '';
        this.str();
    }
    str(x = 0){
        this.title.innerHTML += this.fullText[x]
        x++;
        if (x < this.fullText.length) {
            setTimeout(() => {
                this.str(x)
            }, 150);            
        }
    }
}
let a = document.querySelector('.header__title');
// const text = new Text('.header__title')
const text = new Text(a)


class ParallaxMove {
    constructor(selector){
        this.ball = document.querySelectorAll(selector);
        window.addEventListener('mousemove', (e)=>{
            this.move(e)
        })
    }
    move(event){
        this.ball.forEach( (elem)=>{
            let speed = elem.getAttribute('data-speed');
            let x = event.x / 100 * speed;
            let y = event.y / 100 * speed;
            elem.style.transform = `translate(${x}px, ${y}px)`;
        })        
    }
}
const parallaxMove = new ParallaxMove('.parallax__ball')

class Timer {
    constructor(obj){
        this.nums = document.querySelectorAll(obj.num);
        this.section = document.querySelector(obj.section);
        this.state = true;
        this.nums.forEach( (elem)=>{
            elem.innerHTML = 0
        })
        window.addEventListener('scroll', ()=>{ this.timerScroll() })
    }
    timerSet(){
        this.nums.forEach((elem)=>{
            let count = elem.getAttribute('data-num')
            function rec(x=0) {
                elem.innerHTML = x;
                x++;
                if (x <= count) {
                    setTimeout(() => {
                        rec(x)
                    }, 5);
                }
            }
            rec();           
        })
    }
    timerScroll(){
        // console.log(this.section.offsetHeight);
        // console.log(this.section.offsetTop);
        // console.log(window.innerHeight);
        let scrollTop = window.scrollY + window.innerHeight - this.section.offsetHeight / 2
        // console.log(scrollTop, this.section.offsetTop);
        if (scrollTop > this.section.offsetTop && this.state) {
            this.timerSet()
            this.state = false;
        }
    }
}
const timer = new Timer({
    num: '.timer__num',
    section: '.timer'
})

class Bubble {
    constructor(selector){
        this.links = document.querySelectorAll(selector);
        this.links.forEach((elem)=>{
            elem.addEventListener('mousemove', (e)=>{
                this.show(e, elem)
            })
        })
    }
    show(event, btn){
        let x = event.pageX - btn.offsetLeft;
        let y = event.pageY - btn.offsetTop;
        let span = btn.querySelector('span');
        span.style.left = x + 'px';
        span.style.top = y + 'px';       
    }
}
let bubble = new Bubble('.timer__btn')

class Scroll {
    constructor(selector){
        this.sections = document.querySelectorAll(selector);
        window.addEventListener('scroll', ()=>{
            this.sections.forEach((elem)=>{
                this.fade(elem)
            })
        })
    }
    fade(sec){
        let cards = sec.querySelectorAll('.scroll__card');
        let scrollTop = window.scrollY + window.innerHeight - sec.offsetHeight / 2;
        console.log(cards);
        cards.forEach((elem)=>{
            let speed = elem.getAttribute('data-speed');
            elem.style.transition = speed + 'ms';
            if (scrollTop >= sec.offsetTop) {
                elem.classList.add('active')
            } else {
                elem.classList.remove('active')                
            }
            // console.log(speed);
        })
    }
}

let scroll = new Scroll('.scroll')

class Rotate3D {
    constructor(selector){
        this.cards = document.querySelectorAll(selector);
        this.cards.forEach((elem)=>{
            elem.addEventListener('mousemove', (e)=>{
                this.rotate(e, elem)
            })
            elem.addEventListener('mouseout', ()=>{
                this.rotateNone(elem)
            })
        })
    }
    rotate(event, item){
        let cardItem = item.querySelector('.card__item');
        let halfHeight = cardItem.offsetHeight / 2;
        let degX = (halfHeight - event.offsetY) / halfHeight * 30;
        let halfWidth = cardItem.offsetWidth / 2;
        let degY = (halfWidth - event.offsetX) / halfWidth * 30;        
        cardItem.style.transform = `rotateX(${degX}deg) rotateY(${-degY}deg)`;
    }
    rotateNone(item){
        let cardItem = item.querySelector('.card__item');
        cardItem.style.transform = `rotate(0)`;
    }
}
let rotate3D = new Rotate3D('.card')
