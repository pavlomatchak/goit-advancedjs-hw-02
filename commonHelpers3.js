import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as u}from"./assets/vendor-77e16229.js";document.querySelectorAll("input");const l=document.querySelector("button");function c(t,e){return new Promise((o,i)=>{const s=Math.random()>.3;setTimeout(()=>{s?o({position:t,delay:e}):i({position:t,delay:e})},e)})}var a;(a=document.querySelector("form"))==null||a.addEventListener("submit",t=>{t.preventDefault(),l.disabled=!0;const e=t.target;let o=Number(e.elements.delay.value);const i=Number(e.elements.step.value),s=Number(e.elements.amount.value);for(let r=0;r<s;r++)c(r+1,o).then(({position:m,delay:n})=>{u.success({title:"Success",message:`Fulfilled promise ${m} in ${n}ms`,position:"topCenter",timeout:15e3})}).catch(({position:m,delay:n})=>{u.error({title:"Fail",message:`Rejected promise ${m} in ${n}ms`,position:"topCenter",timeout:15e3})}).finally(()=>{r+1===s&&(l.disabled=!1)}),o+=i});
//# sourceMappingURL=commonHelpers3.js.map
