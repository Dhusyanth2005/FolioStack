import React, { useState, useRef, useEffect } from 'react';
import styles from './ContentForm.module.css';

const ContentForm = ({ onSave, initialData, userData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    fullName: initialData?.fullName || userData?.fullName || '',
    profession: initialData?.profession || '',
    profileImage: userData?.profileImage || initialData?.profileImage || '/assets/images/default-profile.png',
    bio: initialData?.bio || '',
    email: initialData?.email || userData?.email || '',
    phone: initialData?.phone || userData?.phone || '',
    location: initialData?.location || userData?.location || '',
    skills: initialData?.skills || [],
    achievements: initialData?.achievements?.length > 0
      ? initialData.achievements
      : [{ title: '', description: '', year: '' }],
    experiences: initialData?.experiences?.length > 0
      ? initialData.experiences
      : [{ title: '', company: '', period: '', description: '' }],
    projects: initialData?.projects?.length > 0
      ? initialData.projects
      : [{ title: '', description: '', image: '', link: '' }],
    education: initialData?.education?.length > 0
      ? initialData.education
      : [{ degree: '', institution: '', year: '', description: '' }],
    socialLinks: initialData?.socialLinks || { linkedin: '', github: '', twitter: '' },
  });

  const [activeSection, setActiveSection] = useState('basic');
  const [skillInput, setSkillInput] = useState('');
  const [imagePreview, setImagePreview] = useState(userData?.profileImage || formData.profileImage);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch latest user data on mount to sync profileImage
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
        setFormData((prev) => ({
          ...prev,
          profileImage: updatedUser.profileImage || prev.profileImage,
          fullName: updatedUser.fullName || prev.fullName,
          email: updatedUser.email || prev.email,
          phone: updatedUser.phone || prev.phone,
          location: updatedUser.location || prev.location,
        }));
        setImagePreview(updatedUser.profileImage || formData.profileImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to load user data');
        setTimeout(() => setErrorMessage(null), 3000);
      }
    };

    fetchUserData();
  }, []); // Run once on mount

  // Sync imagePreview with formData.profileImage
  useEffect(() => {
    setImagePreview(formData.profileImage);
  }, [formData.profileImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setErrorMessage(null);
      try {
        // Local preview for immediate feedback
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary via backend
        const imageFormData = new FormData();
        imageFormData.append('profileImage', file);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('https://backendportfolio-v4kd.onrender.com/api/auth/update', {
          method: 'PUT',
          headers: {
            'Authorization': token,
          },
          body: imageFormData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to upload image');
        }

        const updatedUser = await response.json();
        const newProfileImage = updatedUser.profileImage;

        // Update formData with Cloudinary URL
        setFormData((prev) => ({
          ...prev,
          profileImage: newProfileImage || prev.profileImage,
        }));
        setImagePreview(newProfileImage);
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorMessage(`Error: ${error.message}`);
        setImagePreview(formData.profileImage); // Revert to previous image
        setTimeout(() => setErrorMessage(null), 3000);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNestedChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const handleSocialChange = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: { ...formData.socialLinks, [platform]: value },
    });
  };

  const addItem = (section) => {
    const newItems = {
      experiences: { title: '', company: '', period: '', description: '' },
      projects: { title: '', description: '', image: '', link: '' },
      education: { degree: '', institution: '', year: '', description: '' },
      achievements: { title: '', description: '', year: '' },
    };

    setFormData({
      ...formData,
      [section]: [...formData[section], newItems[section]],
    });
  };

  const removeItem = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const sections = [
    { id: 'basic', label: 'Basic Information' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'experiences', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'social', label: 'Social Links' },
  ];

  return (
    <div className={styles.formContainer}>
      <h2>Portfolio Content</h2>
      <p className={styles.instruction}>
        Fill in the details for your portfolio. You can preview how your content looks in different templates.
      </p>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <div className={styles.formWrapper}>
        <div className={styles.formNav}>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`${styles.navButton} ${activeSection === section.id ? styles.active : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Information */}
          <div className={`${styles.section} ${activeSection === 'basic' ? styles.active : ''}`}>
            <h3>Basic Information</h3>

            {/* Profile Image Upload */}
            <div className={styles.profileImageUpload}>
              <div
                className={styles.imagePreviewContainer}
                onClick={handleImageClick}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className={styles.imagePreview}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
                      <path
                        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5.67 0-10.3 2.83-10.95 6.5C1 21.32 1.67 22 2.5 22h19c.83 0 1.5-.68 1.45-1.5-.65-3.67-5.28-6.5-10.95-6.5z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Upload Photo</span>
                  </div>
                )}
                {isUploading && (
                  <div className={styles.uploadingOverlay}>
                    <span>Uploading...</span>
                  </div>
                )}
                <div className={styles.overlayText}>
                  <span>Change Photo</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <span className={styles.uploadHint}>Click to upload your profile picture</span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="title">Portfolio Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="My Professional Portfolio"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profession">Profession</label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Full Stack Developer"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio about yourself..."
                rows="4"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 123 456 7890"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Skills */}
          <div className={`${styles.section} ${activeSection === 'skills' ? styles.active : ''}`}>
            <h3>Skills</h3>
            <div className={styles.skillInput}>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button type="button" onClick={addSkill} className={styles.addSkillBtn}>
                Add
              </button>
            </div>

            <div className={styles.skillsList}>
              {formData.skills.map((skill, index) => (
                <div key={index} className={styles.skillTag}>
                  <span>{skill}</span>
                  <button type="button" onClick={() => removeSkill(skill)}>×</button>
                </div>
              ))}

              {formData.skills.length === 0 && (
                <p className={styles.noItems}>No skills added yet. Add some skills to showcase your abilities.</p>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className={`${styles.section} ${activeSection === 'achievements' ? styles.active : ''}`}>
            <div className={styles.sectionHeader}>
              <h3>Achievements</h3>
              <button
                type="button"
                onClick={() => addItem('achievements')}
                className={styles.addItemBtn}
              >
                Add Achievement
              </button>
            </div>

            {formData.achievements.map((achievement, index) => (
              <div key={index} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Achievement {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeItem('achievements', index)}
                    className={styles.removeItemBtn}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label>Achievement Title</label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => handleNestedChange('achievements', index, 'title', e.target.value)}
                    placeholder="Employee of the Year"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Year</label>
                  <input
                    type="text"
                    value={achievement.year}
                    onChange={(e) => handleNestedChange('achievements', index, 'year', e.target.value)}
                    placeholder="2023"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => handleNestedChange('achievements', index, 'description', e.target.value)}
                    placeholder="Describe your achievement and its significance..."
                    rows="3"
                  />
                </div>
              </div>
            ))}

            {formData.achievements.length === 0 && (
              <p className={styles.noItems}>No achievements added yet. Highlight your accomplishments to stand out.</p>
            )}
          </div>

          {/* Experience */}
          <div className={`${styles.section} ${activeSection === 'experiences' ? styles.active : ''}`}>
            <div className={styles.sectionHeader}>
              <h3>Experience</h3>
              <button
                type="button"
                onClick={() => addItem('experiences')}
                className={styles.addItemBtn}
              >
                Add Experience
              </button>
            </div>

            {formData.experiences.map((exp, index) => (
              <div key={index} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Experience {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeItem('experiences', index)}
                    className={styles.removeItemBtn}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleNestedChange('experiences', index, 'title', e.target.value)}
                      placeholder="Senior Developer"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleNestedChange('experiences', index, 'company', e.target.value)}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Period</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleNestedChange('experiences', index, 'period', e.target.value)}
                    placeholder="Jan 2022 - Present"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleNestedChange('experiences', index, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows="3"
                  />
                </div>
              </div>
            ))}

            {formData.experiences.length === 0 && (
              <p className={styles.noItems}>No experiences added yet. Add your work history to showcase your career.</p>
            )}
          </div>

          {/* Projects */}
          <div className={`${styles.section} ${activeSection === 'projects' ? styles.active : ''}`}>
            <div className={styles.sectionHeader}>
              <h3>Projects</h3>
              <button
                type="button"
                onClick={() => addItem('projects')}
                className={styles.addItemBtn}
              >
                Add Project
              </button>
            </div>

            {formData.projects.map((project, index) => (
              <div key={index} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Project {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeItem('projects', index)}
                    className={styles.removeItemBtn}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleNestedChange('projects', index, 'title', e.target.value)}
                    placeholder="E-commerce Website"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleNestedChange('projects', index, 'description', e.target.value)}
                    placeholder="Describe what the project is about..."
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={project.image}
                    onChange={(e) => handleNestedChange('projects', index, 'image', e.target.value)}
                    placeholder="https://example.com/project-image.jpg"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Project Link</label>
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => handleNestedChange('projects', index, 'link', e.target.value)}
                    placeholder="https://example.com/project"
                  />
                </div>
              </div>
            ))}

            {formData.projects.length === 0 && (
              <p className={styles.noItems}>No projects added yet. Show off your work by adding projects.</p>
            )}
          </div>

          {/* Education */}
          <div className={`${styles.section} ${activeSection === 'education' ? styles.active : ''}`}>
            <div className={styles.sectionHeader}>
              <h3>Education</h3>
              <button
                type="button"
                onClick={() => addItem('education')}
                className={styles.addItemBtn}
              >
                Add Education
              </button>
            </div>

            {formData.education.map((edu, index) => (
              <div key={index} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <h4>Education {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeItem('education', index)}
                    className={styles.removeItemBtn}
                  >
                    Remove
                  </button>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleNestedChange('education', index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleNestedChange('education', index, 'institution', e.target.value)}
                      placeholder="University of Technology"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleNestedChange('education', index, 'year', e.target.value)}
                    placeholder="2018 - 2022"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => handleNestedChange('education', index, 'description', e.target.value)}
                    placeholder="Any notable achievements or specializations..."
                    rows="3"
                  />
                </div>
              </div>
            ))}

            {formData.education.length === 0 && (
              <p className={styles.noItems}>No education added yet. Add your educational background.</p>
            )}
          </div>

          {/* Social Links */}
          <div className={`${styles.section} ${activeSection === 'social' ? styles.active : ''}`}>
            <h3>Social Links</h3>

            <div className={styles.formGroup}>
              <label>LinkedIn</label>
              <input
                type="text"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className={styles.formGroup}>
              <label>GitHub</label>
              <input
                type="text"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Twitter</label>
              <input
                type="text"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.saveBtn} onClick={handleSubmit}>
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentForm;