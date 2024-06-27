import Reblend from 'reblendjs';

function Alert({ show, children }) {
  function onmousemove(e) {
    this.style.top = e.offsetY + 'px';
    this.style.left = e.offsetX + 'px';
  }

  return (
    <>
      <h1
        style={`position: absolute; top: 2px; width: 100%; background: azure; display: ${
          show ? 'block' : 'none'
        }`}
      >
        {children}
      </h1>
    </>
  );
}

export default Alert;
