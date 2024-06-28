import Reblend from 'reblendjs';
import { useRef } from 'reblendjs/dist/internal/hooks';

function Alert({ show, children }) {
  const ref = useRef();
  function onmousemove(e) {
    if (ref.current) {
      ref.current.style.display = 'fixed';
      ref.current.style.top = e.offsetY + 'px';
      ref.current.style.left = e.offsetX + 'px';
    }
  }

  return (
    <>
      <h1
        ref={ref}
        style={`position: fixed; top: 2px; left: 0; width: 100%; background: azure; display: ${
          show ? 'block' : 'none'
        }`}
      >
        {children}
      </h1>
    </>
  );
}

export default Alert;
