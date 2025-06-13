import React, { useState } from 'react';

const TeamMembersComponent = () => {
  const [selectedMember, setSelectedMember] = useState(0);

  const teamMembers = [
    {
      id: 0,
      name: "Beatriz García",
      role: "Exploradora de Talentos",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "As your guide in this course, Pablo Stanley combines his entrepreneurial spirit and design expertise from co-founding Carbon Health and Blush Design, to his roles at Udemy, Lyft, and Invision. Celebrated for his Open Source Doodles and Robotos NFTs, Pablo's real passion lies in empowering emerging designers through practical insights and fostering a creative community.",
      socialIcons: ["😊", "💬", "💼", "🎯", "💻"]
    },
    {
      id: 2,
      name: "Sandra Guarnizo",
      role: "Forjadora de Sueños",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Carlos is a senior frontend developer with expertise in React, Vue.js, and modern web technologies. He has built scalable applications for tech companies and is passionate about bridging design and development.",
      socialIcons: ["💻", "💼", "📚", "✏️"]
    },
    {
      id: 3,
      name: "Gloria Valero",
      role: "Estratega de Propósitos",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Ana is a strategic product manager with a background in business development and user research. She has launched multiple successful digital products and excels at translating business requirements.",
      socialIcons: ["💼", "📝", "🐦"]
    }
  ];

  const currentMember = teamMembers[selectedMember];

  return (
    <div className="max-w-6xl mt-[5rem] mb-8 sm:mb-16 lg:mb-32 mt-4 sm:mt-8 lg:mt-20 mx-auto p-2 sm:p-4 font-sans">
      {/* Main Container */}
      <div className="border border-black rounded-2xl sm:rounded-3xl overflow-hidden relative">
        
        {/* Mobile Layout - Stacked */}
        <div className="block lg:hidden">
          {/* Mobile Header with Image */}
          <div className="relative">
            <img 
              src={currentMember.image}
              alt={currentMember.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          {/* Mobile Content */}
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-[#9CE840] font-bold text-xs sm:text-sm mb-2 tracking-wide">
                Nuestro equipo
              </h3>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4 sm:mb-6">
                {currentMember.name}
              </h1>
            </div>

            {/* Bio Text */}
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium line-clamp-4">
                {currentMember.bio}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
              {currentMember.socialIcons.map((icon, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-lg sm:text-xl">{icon}</span>
                </div>
              ))}
            </div>

            {/* Team Selector */}
            <div className="rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {teamMembers.map((member, index) => (
                  <div 
                    key={member.id}
                    onClick={() => setSelectedMember(index)}
                    className="cursor-pointer transition-all duration-300 flex-shrink-0"
                  >
                    <img 
                      src={member.image}
                      alt={member.name}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 transition-all ${
                        selectedMember === index 
                          ? 'border-purple-500 shadow-lg' 
                          : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-3 text-center">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                  {currentMember.name}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  {currentMember.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex">
          {/* Left Side - Text Content */}
          <div className="flex-1 p-8 xl:p-12 pr-6 xl:pr-8">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-[#9CE840] font-bold text-sm mb-3 tracking-wide">
                Nuestro equipo
              </h3>
              <h1 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6 xl:mb-8">
                {currentMember.name.split(' ')[0]}<br/>
                {currentMember.name.split(' ')[1]}
              </h1>
            </div>

            {/* Bio Text */}
            <div className="mb-6 xl:mb-8 h-28 xl:h-32 overflow-hidden">
              <p className="text-gray-800 text-sm xl:text-base leading-relaxed font-medium">
                {currentMember.bio}
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex gap-3 mb-8 xl:mb-12">
              {currentMember.socialIcons.map((icon, index) => (
                <div 
                  key={index}
                  className="w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-lg xl:text-xl">{icon}</span>
                </div>
              ))}
            </div>

            {/* Team Selector */}
            <div className="rounded-2xl p-4 xl:p-6">
              <div className="flex items-center justify-center gap-3 xl:gap-4">
                {teamMembers.map((member, index) => (
                  <div 
                    key={member.id}
                    onClick={() => setSelectedMember(index)}
                    className="cursor-pointer transition-all duration-300 flex-shrink-0"
                  >
                    <img 
                      src={member.image}
                      alt={member.name}
                      className={`w-12 h-12 xl:w-16 xl:h-16 rounded-full object-cover border-3 transition-all ${
                        selectedMember === index 
                          ? 'border-purple-500 shadow-lg' 
                          : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <h4 className="font-bold text-gray-900 text-base xl:text-lg">
                  {currentMember.name}
                </h4>
                <p className="text-gray-600 text-sm font-medium">
                  {currentMember.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Large Photo */}
          <div className="w-80 xl:w-96 relative">
            <img 
              src={currentMember.image}
              alt={currentMember.name}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              style={{ minHeight: '500px' }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Optimizaciones para pantallas muy pequeñas */
        @media (max-height: 600px) {
          .mobile-image {
            height: 200px !important;
          }
          
          .mobile-content {
            padding: 1rem !important;
          }
          
          .mobile-bio {
            -webkit-line-clamp: 3 !important;
          }
        }

        @media (max-height: 500px) {
          .mobile-image {
            height: 150px !important;
          }
          
          .mobile-title {
            font-size: 1.25rem !important;
            margin-bottom: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamMembersComponent;