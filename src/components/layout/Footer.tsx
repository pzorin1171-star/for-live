const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container-custom py-8">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Документы Онлайн. Информационные материалы.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
