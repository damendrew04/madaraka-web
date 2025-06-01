export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-r from-red-500 to-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-r from-green-500 to-black rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
          
          {/* Left Section */}
          <div className="space-y-6">
            <div className="text-4xl font-black bg-gradient-to-r from-black via-red-600 to-green-600 bg-clip-text text-transparent">
              MAGLEV
            </div>   
            <div className="text-white/70 text-sm leading-relaxed">
              Pioneering Kenya&apos;s digital transformation<br />
              through innovative technology solutions
            </div>
          </div>
          
          {/* Center Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 via-green-500 to-black transform rotate-45"></div>
            <div className="text-2xl font-bold text-cyan-500 tracking-wider">
              TECH AFRIKA
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-black via-green-500 to-red-500 transform -rotate-45"></div>
          </div>
          
          {/* Right Section */}
          <div className="text-right space-y-4">
            <div className="text-white/60 text-lg font-medium">
              62 Years of Independence
            </div>
            <div className="text-green-400 text-sm">
              Building Tomorrow&apos;s Kenya
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            © 2025 MAGLEV TECH AFRIKA
          </div>
          <div className="text-gray-600 text-xs mt-2 md:mt-0">
            Madaraka Day 2025 • All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}