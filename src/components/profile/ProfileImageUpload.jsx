import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import axios from '../../config/axiosConfig';
import Toast from '../alertas/Toast';

const ProfileImageUpload = ({ onImageUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    title: '',
    message: ''
  });

  const handleShowToast = (title, message) => {
    setToastData({ title, message });
    setShowToast(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'profile_images');

      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError('User not authenticated');
        return;
      }

      const idToken = await currentUser.getIdToken(true);

      // Upload new image first
      const uploadResponse = await axios.post('/api/cloudinary/upload', 
        formData,
        { 
          headers: { 
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (uploadResponse.data.status === 'success') {
        // Update profile with new image (old image will be deleted by backend)
        const updateResponse = await axios.put('/api/user/profile',
          { 
            profile_image: uploadResponse.data.url,
            public_id: uploadResponse.data.public_id 
          },
          { 
            headers: { 'Authorization': `Bearer ${idToken}` }
          }
        );

        if (updateResponse.data.status === 'success') {
          onImageUpdate(uploadResponse.data.url);
          handleShowToast('¡Éxito!', 'Foto de perfil actualizada con éxito');
        } else {
          setError('Failed to update profile');
        }
      } else {
        setError('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 -translate-y-1/4">
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          id="profile-image-input"
        />
        <label 
          htmlFor="profile-image-input"
          className="cursor-pointer bg-[#9CE840] hover:bg-[#87C232] transition-colors w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
        >
          {uploading ? (
            <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          )}
        </label>
        {error && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs whitespace-nowrap">
            {error}
          </div>
        )}
      </div>
      <Toast 
        show={showToast}
        setShow={setShowToast}
        title={toastData.title}
        message={toastData.message}
      />
    </>
  );
};

export default ProfileImageUpload;