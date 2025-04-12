import Image from "next/image";

const Header = () => (
  <header className="bg-primary text-white py-4 shadow-lg">
    <div className="max-w-full mx-auto px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/solace.svg"
          alt="Solace Logo"
          width={115}
          height={32}
          className="mr-3"
        />
      </div>
      <div className="hidden md:flex items-center space-x-4 text-white">
        Navigate your health journey with a Solace Advocate
      </div>
    </div>
  </header>
);

export default Header;
