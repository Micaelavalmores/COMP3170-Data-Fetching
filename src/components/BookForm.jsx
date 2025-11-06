import React, { useState, useEffect } from 'react';
import "./BookForm.css"

function BookForm({ onSubmit, initialValues, mode = 'add' }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: '',
    publisher: '',
    language: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        author: initialValues.author || '',
        url: initialValues.url || '',
        publisher: initialValues.publisher || '',
        language: initialValues.language || '',
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'edit' ? 'Edit Book' : 'Add New Book'}</h2>

      <label>
        Title<br />
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Author<br />
        <input
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Book Cover URL<br />
        <input
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Publisher<br />
        <input
          name="publisher"
          type="text"
          value={formData.publisher}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Language<br />
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '1.1em',
            border: '2px solid rgb(255, 160, 206)',
            borderRadius: '5px',
            backgroundColor: '#fafafa',
            color: '#222',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        >
          <option value="">Select a language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <div style={{ marginTop: '16px' }}>
        <button type="submit">{mode === 'edit' ? 'Update' : 'Submit'}</button>
      </div>
    </form>
  );
}

export default BookForm;
