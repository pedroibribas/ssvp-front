import S from "./styles.module.scss";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={S.footer}>
      <small>SSVP @{year}</small>
    </footer>
  );
};