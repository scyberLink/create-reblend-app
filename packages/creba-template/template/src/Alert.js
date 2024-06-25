import Reblend from 'reblendjs';

function Alert({ show, children }) {
  function mouseMove(e) {
    this.style.top = e.clientY;
    this.style.left = e.clientX;
  }

  return (
    <>
      <h1
        onmousemove={mouseMove}
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
