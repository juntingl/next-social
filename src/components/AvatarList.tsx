import React from 'react';
import Image from "next/image"

interface Avatar {
  id: number;
  name: string;
  imageUrl?: string;
}

interface AvatarListProps {
  avatars: Avatar[];
  maxVisible?: number;
  size?: number;
}

const AvatarList: React.FC<AvatarListProps> = ({ avatars, maxVisible = 5, size = 48 }) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = Math.max(avatars.length - maxVisible, 0);

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <div
          key={avatar.id}
          className="relative transition-transform hover:z-10 hover:scale-110"
          style={{
            zIndex: visibleAvatars.length - index,
            marginRight: `-${size / 4}px`,
            width: `${size}px`,
            height: `${size}px`
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
            {avatar.imageUrl ? (
              <Image
                src={avatar.imageUrl}
                alt={avatar.name}
                width={size}
                height={size}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <Image
                  src="/noAvatar.png"
                  alt="No avatar"
                  width={size / 2}
                  height={size / 2}
                  className="text-gray-600"
                />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full transition-opacity" />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 border-2 border-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            fontSize: `${size / 3}px`
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarList;