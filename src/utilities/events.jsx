const handleArrows = (x, y, setFunction) => {
  setFunction((active) => (active + y * 9 + x + 81) % 81);
};

export const onKeyDown = (e, setFunc) => {
  if ((e.ctrlKey && e.key === "z") || e.key === "#") {
    e.preventDefault();
  } else if (e.key === "h") {
    handleArrows(-1, 0, setFunc);
  } else if (e.key === "l") {
    handleArrows(1, 0, setFunc);
  } else if (e.key === "k") {
    handleArrows(0, -1, setFunc);
  } else if (e.key === "j") {
    handleArrows(0, 1, setFunc);
  }
};

export const onKeyUp = (e, dispatch) => {
  if (e.key === "z" || e.key === "#") {
    dispatch({ type: "UNDO" });
  } else if (e.key === "y" || e.key === "*") {
    dispatch({ type: "REDO" });
  }
};

export const onClick = (e, setFunc) => {
  if (e.target.id.startsWith("square-")) {
    setFunc(Number(e.target.id.split("-")[1]));
  }
};
