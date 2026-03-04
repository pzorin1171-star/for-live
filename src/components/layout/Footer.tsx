const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Документы Online. Все материалы носят информационный характер и не являются юридической консультацией.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
