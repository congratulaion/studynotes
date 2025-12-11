// ============================
// 미적분학 노트용 JS
// ============================

// 각 단원별 내용
const calcPages = {
  "함수와 극한": `
✔ 함수(Function)<br>
입력에 대해 하나의 출력이 대응되는 규칙<br>
표기: ( y = f(x) )<br><br>

✔ 극한(Limit)<br>
함수값이 특정 ( x ) 값에 가까워질 때의 값을 분석<br>
극한 공식<br>
\\[ \\lim_{x\\to a} c = c \\] 
\\[ \\lim_{x\\to a} x = a \\] 
\\[ \\lim_{x\\to a} [f(x) \\pm g(x)] = \\lim f \\pm \\lim g \\]<br>
유명한 극한<br>
\\[ \\lim_{x\\to 0} \\frac{\\sin x}{x} = 1 \\] 
\\[ \\lim_{x\\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2} \\]
  `,
  "연속성": `
✔ 연속 조건 (3-step)<br>
함수 ( f(x) )가 ( x=a )에서 연속이려면:<br>
( \\lim_{x\\to a} f(x) ) 존재<br>
( f(a) ) 정의됨<br>
두 값이 같다<br>
\\[ \\lim_{x\\to a} f(x) = f(a) \\]
  `,
  "미분": `
✔ 미분의 정의<br>
\\[ f'(x) = \\lim_{h\\to 0} \\frac{f(x+h) - f(x)}{h} \\]<br><br>

✔ 기본 미분 공식<br>
\\[ \\frac{d}{dx} c = 0 \\] 
\\[ \\frac{d}{dx} x^n = nx^{n-1} \\] 
\\[ \\frac{d}{dx} e^x = e^x \\] 
\\[ \\frac{d}{dx} \\ln x = \\frac{1}{x} \\]<br><br>

✔ 곱의 미분(Product rule)<br>
\\[ (uv)' = u'v + uv' \\]<br>
✔ 몫의 미분(Quotient rule)<br>
\\[ \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2} \\]<br>
✔ 합성함수 미분(Chain rule)<br>
\\[ (f(g(x)))' = f'(g(x)) \\cdot g'(x) \\]
  `,
  "적분": `
✔ 부정적분<br>
\\[ \\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\]<br><br>

✔ 정적분(면적)<br>
\\[ \\int_a^b f(x)\\,dx \\]<br><br>

✔ 치환적분(변수변환)<br>
\\[ u = g(x) \\] 
\\[ \\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du \\]<br><br>

✔ 부분적분<br>
\\[ \\int u\\,dv = uv - \\int v\\,du \\]
  `,
  "주요 함수의 미분표": `
함수미분:<br>
- \\( \\sin x \\) → \\( \\cos x \\)<br>
- \\( \\cos x \\) → \\( -\\sin x \\)<br>
- \\( \\tan x \\) → \\( \\sec^2 x \\)<br>
- \\( a^x \\) → \\( a^x \\ln a \\)
  `,
  "편미분": `
여러 변수 중 하나만 변화시켜 미분하는 것.<br>
\\[ \\frac{\\partial f}{\\partial x} = f_x,\\quad \\frac{\\partial f}{\\partial y} = f_y \\]
  `,
  "다중 적분": `
✔ 이중적분<br>
\\[ \\iint_R f(x,y)\\,dA \\]<br>
✔ 순서 변환 가능<br>
\\[ \\int_{x=a}^{b} \\int_{y=g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx \\]
  `,
  "기하 응용": `
접선 방정식:<br>
\\[ y = f(a) + f'(a)(x-a) \\]<br>
극대/극소:<br>
\\[ f'(x) = 0 \\Rightarrow \\text{critical points} \\]<br>
오목/볼록:<br>
\\[ f''(x) > 0\\Rightarrow \\text{볼록}, \\quad f''(x)<0\\Rightarrow \\text{오목} \\]
  `
};

// chem JS 구조 그대로 활용, calc용으로 수정
function renderMarkdown(md) {
  return marked.parse(md);
}

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector("#calc-nav");
  const content = document.querySelector("#calc-content");
  if (!navContainer || !content) return;

  Object.keys(calcPages).forEach((title, idx) => {
    const btn = document.createElement("button");
    btn.textContent = title;
    btn.className = "calc-nav-item";

    btn.addEventListener("click", () => {
      content.innerHTML = renderMarkdown(calcPages[title]);

      document.querySelectorAll(".calc-nav-item")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise();
      }
    });

    if (idx === 0) {
      btn.classList.add("active");
      content.innerHTML = renderMarkdown(calcPages[title]);
      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise();
      }
    }

    navContainer.appendChild(btn);
  });
});