import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImageURL(fileReader.result);
    };
    fileReader.readAsDataURL(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Prediction Response:', response.data);

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error predicting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {prediction !== null && (
        <p>Prediction: {prediction}</p>
      )}
      {imageURL && <img src={imageURL} alt="Uploaded" style={{ maxWidth: '100%' }} />}



      
    </div>
    
      
    
  );
}

export default App;
