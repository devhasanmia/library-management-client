const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Library Management. All rights reserved.
        </p>
        <p className="text-center md:text-right mt-2 md:mt-0">
          Developed by <span className="text-blue-600">MD. HASAN MIA</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
