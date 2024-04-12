import React, { useState } from 'react';

export default function UploadForm({ onDataChange }) {
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());

      // Parse the JSON response
      const responseData = await res.json();
      onDataChange(responseData.graph)
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}