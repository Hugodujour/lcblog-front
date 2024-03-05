/**
 * @param {"primary" | "secondary" | "danger"} variant
 * @returns {JSX.Element}
 */
export function Button({ variant = "cool", ...props }) {
  const newProps = {
    ...props,
    className: `btn-${variant}`,
  };
  if (props.href) {
    return <a {...newProps} />;
  }
  return <button {...newProps} />;
}
