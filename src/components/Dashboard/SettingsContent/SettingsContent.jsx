import React, { useState, useRef, useEffect } from 'react';
import styles from './SettingsContent.module.css';

const SettingsContent = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [saveMessage, setSaveMessage] = useState(null);
  const [profileImage, setProfileImage] = useState(userData.profileImage || '/assets/images/default-profile.png');
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [cropSettings, setCropSettings] = useState({ x: 0, y: 0, width: 80, height: 80 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef(null);
  const previewImageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch user data on mount to ensure latest profileImage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://backendportfolio-v4kd.onrender.com/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const updatedUser = await response.json();
        if (updatedUser.profileImage) {
          setProfileImage(updatedUser.profileImage);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run once on mount

  // Update profileImage if userData changes
  useEffect(() => {
    if (userData.profileImage) {
      setProfileImage(userData.profileImage);
    }
  }, [userData]);

  const handleImageLoad = (e) => {
    if (previewImage && e.target) {
      setImageSize({
        width: e.target.naturalWidth,
        height: e.target.naturalHeight,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (activeTab === 'account') {
      formData.append('fullName', e.target.fullName.value || '');
      formData.append('phone', e.target.phone.value || '');
      formData.append('location', e.target.location.value || '');
    }
    if (activeTab === 'profile' && selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch('https://backendportfolio-v4kd.onrender.com/api/auth/update', {
        method: 'PUT',
        headers: {
          'Authorization': token,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();

      if (activeTab === 'profile' && updatedUser.profileImage) {
        setProfileImage(updatedUser.profileImage);
        setPreviewImage(null);
        setSelectedFile(null);
        setShowCropOptions(false);
      }

      setSaveMessage('Changes saved successfully!');
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);

      // Re-fetch user data to ensure parent component is updated
      const userResponse = await fetch('https://backendportfolio-v4kd.onrender.com/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });
      if (userResponse.ok) {
        const latestUser = await userResponse.json();
        if (latestUser.profileImage) {
          setProfileImage(latestUser.profileImage);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      setCropSettings({ x: 0, y: 0, width: 80, height: 80 });

      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setTimeout(() => {
              setShowCropOptions(true);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateCropSetting = (property, value) => {
    if (property === 'width') {
      return Math.min(100, Math.max(10, value));
    } else if (property === 'height') {
      return Math.min(100, Math.max(10, value));
    } else if (property === 'x') {
      return Math.min(100 - cropSettings.width, Math.max(0, value));
    } else if (property === 'y') {
      return Math.min(100 - cropSettings.height, Math.max(0, value));
    }
    return value;
  };

  const handleCropChange = (e, property) => {
    const rawValue = parseInt(e.target.value, 10);
    const validatedValue = validateCropSetting(property, rawValue);

    setCropSettings((prev) => {
      const updated = { ...prev, [property]: validatedValue };
      if (property === 'width') {
        updated.x = Math.min(100 - validatedValue, updated.x);
      } else if (property === 'height') {
        updated.y = Math.min(100 - validatedValue, updated.y);
      }
      return updated;
    });
  };

  const handleCropSave = () => {
    setShowCropOptions(false);
  };

  const handleCropCancel = () => {
    setShowCropOptions(false);
    setPreviewImage(null);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className={styles.settingsContent}>
      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h1>Settings</h1>
          <p className={styles.welcomeText}>Manage your account preferences</p>
        </div>
        <div className={styles.profilePreview}>
          <div className={styles.profileImage} onClick={handleImageClick}>
            <img src={profileImage} alt="Profile" />
            <div className={styles.uploadOverlay}>
              <span>Change</span>
            </div>
          </div>
          <span className={styles.profileName}>{userData.fullName}</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className={styles.hiddenFileInput}
          />
        </div>
      </div>

      <div className={styles.settingsContainer}>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === 'account' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'security' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className={styles.settingsForm}>
          {saveMessage && (
            <div className={styles.saveNotification}>
              {saveMessage}
            </div>
          )}

          {activeTab === 'account' && (
            <form onSubmit={handleSave}>
              <h2>Account Settings</h2>
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    defaultValue={userData.fullName}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={userData.email}
                    className={styles.formInput}
                    disabled
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue={userData.phone}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={userData.location}
                    className={styles.formInput}
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  <span className={styles.buttonText}>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSave}>
              <h2>Profile Settings</h2>
              <div className={styles.profileImageSection}>
                <div className={styles.formField}>
                  <label>Profile Image</label>
                  <div className={styles.uploadContainer}>
                    <div className={styles.uploadPreview}>
                      <img src={previewImage || profileImage} alt="Profile preview" />
                    </div>

                    {!isUploading && !showCropOptions && (
                      <div className={styles.uploadControls}>
                        <button
                          type="button"
                          className={styles.uploadButton}
                          onClick={() => fileInputRef.current.click()}
                        >
                          Upload New Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isUploading && (
                  <div className={styles.uploadProgressContainer}>
                    <div className={styles.uploadProgressBar}>
                      <div
                        className={styles.uploadProgressFill}
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className={styles.uploadProgressText}>{uploadProgress}%</span>
                  </div>
                )}

                {showCropOptions && (
                  <div className={styles.cropOptionsContainer}>
                    <h3>Crop Your Image</h3>
                    <div className={styles.cropPreview}>
                      <div
                        className={styles.cropOverlay}
                        style={{
                          top: `${cropSettings.y}%`,
                          left: `${cropSettings.x}%`,
                          width: `${cropSettings.width}%`,
                          height: `${cropSettings.height}%`,
                        }}
                      ></div>
                      <img
                        ref={previewImageRef}
                        src={previewImage}
                        alt="Crop preview"
                        onLoad={handleImageLoad}
                      />
                    </div>

                    <div className={styles.cropControls}>
                      <div className={styles.cropSlider}>
                        <label>Width:</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={cropSettings.width}
                          onChange={(e) => handleCropChange(e, 'width')}
                        />
                        <span>{cropSettings.width}%</span>
                      </div>

                      <div className={styles.cropSlider}>
                        <label>Height:</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={cropSettings.height}
                          onChange={(e) => handleCropChange(e, 'height')}
                        />
                        <span>{cropSettings.height}%</span>
                      </div>

                      <div className={styles.cropSlider}>
                        <label>X Position:</label>
                        <input
                          type="range"
                          min="0"
                          max={100 - cropSettings.width}
                          value={cropSettings.x}
                          onChange={(e) => handleCropChange(e, 'x')}
                        />
                        <span>{cropSettings.x}%</span>
                      </div>

                      <div className={styles.cropSlider}>
                        <label>Y Position:</label>
                        <input
                          type="range"
                          min="0"
                          max={100 - cropSettings.height}
                          value={cropSettings.y}
                          onChange={(e) => handleCropChange(e, 'y')}
                        />
                        <span>{cropSettings.y}%</span>
                      </div>
                    </div>

                    <div className={styles.cropActions}>
                      <button
                        type="button"
                        className={styles.cropSaveButton}
                        onClick={handleCropSave}
                      >
                        Apply Crop
                      </button>
                      <button
                        type="button"
                        className={styles.cropCancelButton}
                        onClick={handleCropCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton} disabled={isUploading || showCropOptions}>
                  <span className={styles.buttonText}>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSave}>
              <h2>Security Settings</h2>
              <div className={styles.formField}>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>
                  <span className={styles.buttonText}>Update Password</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;