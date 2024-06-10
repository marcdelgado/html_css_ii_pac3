/**
 * Import dependencies from node_modules
 * see commented examples below
 */


/**
 * Write any other JavaScript below
 */


/* https://godofredo.ninja/como-detectar-un-elemento-sticky-cuando-se-queda-fijo/ */
document.addEventListener('DOMContentLoaded', function () {
  const main_header = document.querySelector('.header-layout__menu-hr');

  /*const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("fixed", e.intersectionRatio < 1),
    { threshold: [1] }
  );*/


  observer.observe(main_header);

});
