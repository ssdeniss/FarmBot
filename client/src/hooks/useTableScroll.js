export function useTableScroll() {
  const slider = document?.querySelectorAll('.ant-table-body');
  const slider2 = document.querySelectorAll('.ant-table-content');
  let isDown = false;
  let startX;
  let scrollLeft;
  slider?.forEach((element) => {
    if (slider) {
      element.addEventListener('mousedown', (e) => {
        isDown = true;
        element.classList.add('active');
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
      });
      element.addEventListener('mouseleave', () => {
        isDown = false;
        element.classList.remove('active');
      });
      element.addEventListener('mouseup', () => {
        isDown = false;
        element.classList.remove('active');
      });
      element.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2;
        element.scrollLeft = scrollLeft - walk;
      });
    }
  });
  slider2?.forEach((element) => {
    if (slider) {
      element.addEventListener('mousedown', (e) => {
        isDown = true;
        element.classList.add('active');
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
      });
      element.addEventListener('mouseleave', () => {
        isDown = false;
        element.classList.remove('active');
      });
      element.addEventListener('mouseup', () => {
        isDown = false;
        element.classList.remove('active');
      });
      element.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2;
        element.scrollLeft = scrollLeft - walk;
      });
    }
  });
}
