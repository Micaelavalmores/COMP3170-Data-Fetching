import React, { useState } from 'react';
import "./"

function BookForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publicationYear: '',
    language: '',
    pages: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>

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
        Publisher<br />
        <input
          name="publisher"
          type="text"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>

      <label>
        Publication Year<br />
        <input
          name="publicationYear"
          type="number"
          value={formData.publicationYear}
          onChange={handleChange}
          min="0"
        />
      </label>

      <label>
        Language<br />
        <input
          name="language"
          type="text"
          value={formData.language}
          onChange={handleChange}
        />
      </label>

      <label>
        Pages<br />
        <input
          name="pages"
          type="number"
          value={formData.pages}
          onChange={handleChange}
          min="1"
        />
      </label>

      <div style={{ marginTop: '16px' }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default BookForm;
