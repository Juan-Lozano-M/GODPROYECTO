import React from "react";

const UserAvatar = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xl">
      {initial}
    </div>
  );
};

export default UserAvatar;
