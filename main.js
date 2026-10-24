(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* PAGE LOAD INTRO */
  var introLoader = document.getElementById('intro-loader');
  var introTyped = document.getElementById('intro-typed');
  var introSub = document.getElementById('intro-sub');
  if(reduceMotion){
    introLoader.classList.add('hide');
    setTimeout(function(){ introLoader.remove(); }, 50);
  } else {
    document.body.style.overflow = 'hidden';
    var introText = "Dhivakar V";
    var ci = 0;
    function typeIntro(){
      if(ci < introText.length){
        introTyped.textContent = introText.slice(0, ci + 1);
        ci++;
        setTimeout(typeIntro, 65);
      } else {
        introTyped.innerHTML = 'Dhivakar <span class="accent">V</span>';
        introSub.classList.add('show');
        setTimeout(function(){
          introLoader.classList.add('hide');
          document.body.style.overflow = '';
          setTimeout(function(){ introLoader.remove(); }, 650);
        }, 500);
      }
    }
    setTimeout(typeIntro, 200);
  }

  /* THEME TOGGLE */
  var themeBtn = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');
  var themeLabel = document.getElementById('theme-label');
  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      themeIcon.innerHTML = '&#9788;';
      themeLabel.textContent = 'Light';
    } else {
      root.removeAttribute('data-theme');
      themeIcon.innerHTML = '&#9789;';
      themeLabel.textContent = 'Dark';
    }
  }
  var saved = null;
  try{ saved = localStorage.getItem('portfolio-theme'); }catch(e){}
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  themeBtn.addEventListener('click', function(){
    var isDark = root.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try{ localStorage.setItem('portfolio-theme', next); }catch(e){}
  });

  /* TYPING ANIMATION */
  var roleText = "Full-Stack Developer  |  IT Undergraduate  |  AWS Cloud & CCNA Certified";
  var typedEl = document.getElementById('typed-role');
  if(reduceMotion){
    typedEl.textContent = roleText;
  } else {
    var i = 0;
    function typeChar(){
      if(i <= roleText.length){
        typedEl.textContent = roleText.slice(0, i);
        i++;
        setTimeout(typeChar, 32);
      }
    }
    typeChar();
  }

  /* SCROLL REVEAL */
  var slides = document.querySelectorAll('section.slide');
  var facts = document.querySelectorAll('.fact');
  if('IntersectionObserver' in window && !reduceMotion){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); }
      });
    }, {threshold:0.15});
    slides.forEach(function(s){ revealObserver.observe(s); });

    var factObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, idx){
        if(entry.isIntersecting){
          var el = entry.target;
          var delay = Array.prototype.indexOf.call(facts, el) * 60;
          setTimeout(function(){ el.classList.add('in-view'); }, delay);
        }
      });
    }, {threshold:0.3});
    facts.forEach(function(f){ factObserver.observe(f); });
  } else {
    slides.forEach(function(s){ s.classList.add('in-view'); });
    facts.forEach(function(f){ f.classList.add('in-view'); });
  }

  /* ACTIVE NAV HIGHLIGHT */
  var navLinks = document.querySelectorAll('#sidebar-nav a');
  var railLinks = document.querySelectorAll('#icon-rail a');
  function setActive(id){
    navLinks.forEach(function(a){ a.classList.toggle('active', a.dataset.section === id); });
    railLinks.forEach(function(a){ a.classList.toggle('active', a.dataset.section === id); });
  }
  if('IntersectionObserver' in window){
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ setActive(entry.target.id); }
      });
    }, {threshold:0.4});
    slides.forEach(function(s){ navObserver.observe(s); });
  }

  /* PROJECT FILTERS */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectTiles = document.querySelectorAll('#proj-grid .proj-tile');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      projectTiles.forEach(function(tile){
        var tags = tile.dataset.tags || '';
        var show = (filter === 'all') || tags.split(' ').indexOf(filter) !== -1;
        tile.classList.toggle('hidden', !show);
      });
    });
  });

  /* CUSTOM CURSOR + GLOW */
  var canCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion;
  if(canCustomCursor){
    var dot = document.getElementById('cursor-dot');
    var glow = document.getElementById('cursor-glow');
    dot.style.display = 'block';
    glow.style.display = 'block';
    document.body.classList.add('cursor-none');

    var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
    var glowX = mouseX, glowY = mouseY;

    document.addEventListener('mousemove', function(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)';
    });

    function animateGlow(){
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.transform = 'translate(' + glowX + 'px,' + glowY + 'px) translate(-50%,-50%)';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    document.querySelectorAll('a, button, .proj-tile').forEach(function(el){
      el.addEventListener('mouseenter', function(){ dot.style.transform += ' scale(2)'; });
    });
  }
})();
