import ToolTip from "./ToolTip";

const Hero = () => {
  return (
    <div className="bg-white h-full">
      <div className="max-w-5xl mx-auto md:grid md:grid-cols-2 flex flex-col items-center gap-4 h-full">
        <div className="space-y-5 flex-1 p-4">
          <div>
            <h1 className="text-gray-900 font-semibold md:text-3xl text-2xl">
              Smart Marketplace:
            </h1>
            <h1 className="text-gray-900 font-semibold md:text-3xl text-2xl">
              FullStack App with React Native and Node.js!
            </h1>
          </div>
          <p className="text-gray-900">
            Smart marketplace is a virtual platform where various sellers and
            buyers converge to conduct transactions for goods and services.
            Unlike traditional retail models where a single entity sells its own
            products, an smart marketplace facilitates transactions between
            multiple third-party sellers and consumers. In such a marketplace,
            sellers list their products or services, along with descriptions,
            prices, and other relevant information. Buyers can then browse
            through these listings, and exchange messages with sellers.
          </p>

          <ToolTip tooltip="Full Stack App">
            <p>Stack: React Native, Nodejs,Express, MongoDB</p>
          </ToolTip>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/1dominik7/Smart-Marketplace"
              className="bg-[#545457] hover:bg-[#545457] text-white font-bold px-10 py-2 rounded-md inline-block cursor-pointer"
            >
              Check It
            </a>
          </div>
        </div>
        <div className="p-4 flex-1">
          <div>
            <img className="w-full h-auto rounded-full" src="logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
