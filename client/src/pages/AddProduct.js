import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'vegetables',
    price: '',
    unit: 'kg',
    quantity: '',
    address: '',
    village: '',
    taluk: '',
    district: '',
    state: '',
    pincode: '',
    harvestDate: '',
    isOrganic: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await productAPI.uploadImage(formData);
      setUploadedImageUrl(response.data.imageUrl);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        ...formData,
        images: [{ url: uploadedImageUrl }],
        location: {
          address: formData.address,
          village: formData.village,
          taluk: formData.taluk,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode
        }
      };

      await productAPI.createProduct(productData);
      alert('Product created successfully!');
      navigate('/dashboard/farmer');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="add-product-card">
          <h1>Add New Product</h1>
          
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Upload Image</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Enter Details</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Publish</span>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {step === 1 && (
            <div className="step-content">
              <h2>Step 1: Upload Product Image</h2>
              <div className="image-upload-section">
                <label className="image-upload-label">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span className="upload-icon">📷</span>
                      <p>Click to select image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <button
                onClick={handleImageUpload}
                className="btn btn-primary"
                disabled={!imageFile || loading}
              >
                {loading ? 'Uploading...' : 'Upload & Continue'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Step 2: Enter Product Details</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="grains">Grains</option>
                      <option value="dairy">Dairy</option>
                      <option value="organic">Organic</option>
                      <option value="pulses">Pulses</option>
                      <option value="spices">Spices</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Unit *</label>
                    <select name="unit" value={formData.unit} onChange={handleChange} required>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="g">Gram (g)</option>
                      <option value="liter">Liter</option>
                      <option value="piece">Piece</option>
                      <option value="dozen">Dozen</option>
                      <option value="quintal">Quintal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Available Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Harvest Date</label>
                    <input
                      type="date"
                      name="harvestDate"
                      value={formData.harvestDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isOrganic"
                      checked={formData.isOrganic}
                      onChange={handleChange}
                    />
                    <span>This is an organic product</span>
                  </label>
                </div>

                <h3>Location Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Village</label>
                    <input type="text" name="village" value={formData.village} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Taluk</label>
                    <input type="text" name="taluk" value={formData.taluk} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>District</label>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Review & Publish
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>Step 3: Review & Publish</h2>
              <div className="review-section">
                <div className="review-image">
                  <img src={imagePreview} alt={formData.name} />
                </div>
                <div className="review-details">
                  <h3>{formData.name}</h3>
                  <p className="review-category">{formData.category}</p>
                  <div className="review-price">₹{formData.price}/{formData.unit}</div>
                  <p><strong>Quantity:</strong> {formData.quantity} {formData.unit}</p>
                  <p><strong>Description:</strong> {formData.description}</p>
                  {formData.isOrganic && <span className="organic-badge">Organic</span>}
                  <p><strong>Location:</strong> {formData.village}, {formData.district}</p>
                </div>
              </div>
              <div className="form-actions">
                <button onClick={() => setStep(2)} className="btn btn-outline">
                  Edit Details
                </button>
                <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
                  {loading ? 'Publishing...' : 'Publish Product'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
