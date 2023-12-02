
// components/AddIconForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddIconForm = () => {
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [iconOptions, setIconOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchIconOptions = async () => {
      try {
        const response = await axios.get('https://api.react-icons.github.io');
        setIconOptions(response.data.icons);
      } catch (error) {
        console.error('Error fetching icon options:', error);
      }
    };
    fetchIconOptions();
  }, []);

  const saveIcon = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/icons', {
        link: link,
        image: image,
      });
      router.push('/icons'); // Redirect to the icons page after successfully adding an icon
    } catch (error) {
      console.error('Error adding icon:', error);
      // Add code to handle and display the error to the user
    }
  };

  return (
    <form onSubmit={saveIcon}>
      {/* Form fields for adding icon */}
      <div>
        <label>Link</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link"
        />
      </div>
      <div>
        <label>Image</label>
        <select
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image"
        >
          <option value="Choose option">Choose option</option>
          {iconOptions.map((icon, index) => (
            <option key={index} value={icon.name}>
              {icon.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddIconForm;
