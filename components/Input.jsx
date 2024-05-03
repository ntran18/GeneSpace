import React, { useState } from "react";

export default function UploadForm({ onDataChange }) {
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        try {
            const data = new FormData();
            data.set("file", selectedFile);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            // handle the error
            if (!res.ok) throw new Error(await res.text());

            // Parse the JSON response
            const responseData = await res.json();
            onDataChange(responseData.graph, []);
        } catch (e) {
            // Handle errors here
            alert("Error uploading file");
        }
    };

    return (
        <div className="upload-form">
            <label className="custom-file-upload">
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="file-input"
                />
                Select File
            </label>
        </div>
    );
}
