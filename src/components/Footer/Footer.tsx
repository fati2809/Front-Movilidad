import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} El Marqués, Qro. Todos los derechos reservados.
      </p>
    </footer>
  );
}
